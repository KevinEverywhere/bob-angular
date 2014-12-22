'use strict'; 
// Vaci Ut, Budapest, Hungary
angular.module('bobApp.leaflet', ["bobApp", "threeModule", "ngRoute", "ui.router"])
	.service('leafletService', ['$rootScope', "$http", "$q", "$state", "$stateParams", "$window", "$location",
	 function($rootScope, $http, $q, $state, $stateParams, $window, $location) {
		var service={
			numTries:0,
			maxTries:5,
			leafletMap:null,
			leafletDiv:null,
			currentData:null,
			osmPrefix:"http://nominatim.openstreetmap.org/search?format=json&q=",
			buildMap:function(_content){
				try{
					var me=service, map, ajaxRequest, plotlist, plotlayers=[];
					var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
					var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
					if(_content){me.leafletDiv=_content}
					switch($state.$current.name){
						case "mapfeed.geolocation":
							var _url=service.osmPrefix + $stateParams.geoLocation,_maxZoom=18;
							$http({method: 'GET', url: _url})
								.success(function(data, status, headers, config) {
									if(data.length>0){
										map = new $window.L.map(me.leafletDiv);
										var osm = new $window.L.TileLayer(osmUrl, {minZoom:1, maxZoom: _maxZoom, attribution: data[0].licence});
										map.setView(new $window.L.LatLng(
											data[0].lat,
											data[0].lon),_maxZoom);
										map.fitBounds([
										    [data[0].boundingbox[0], data[0].boundingbox[2]],
										    [data[0].boundingbox[1], data[0].boundingbox[3]]]);
										map.addLayer(osm);
										if(map.getZoom()>_maxZoom){map.setZoom(map.getMaxZoom());};
									}
								})
							.error(function(data, status, headers, config) {
								console.log('error=' + data);
							});
							break;
						case "mapfeed.latlong":
							map = new $window.L.map(me.leafletDiv);
							var osm = new $window.L.TileLayer(osmUrl, {minZoom:4, maxZoom: 18, attribution: osmAttrib}),
							_view=me.processLL($stateParams.latlong);
							map.setView(new $window.L.LatLng(_view.lat,_view.lon),5);
							map.addLayer(osm);
							break;
						case "map":
							map = new $window.L.map(me.leafletDiv);
							var osm = new $window.L.TileLayer(osmUrl, {minZoom:4, maxZoom: 18, attribution: osmAttrib});
							map.setView(new $window.L.LatLng(45.438, 12.33),5);
							map.addLayer(osm);
							break;
						
					}
				}catch(oops){
					if(me.numTries<me.maxTries){
						setTimeout(me.buildMap,1000);
						me.numTries++;
						console.log("failed from service=" + me.numTries);
					}else{
						console.log("failed maxTries=" + me.maxTries);
					}
				}
			},
			processLL:function(stringLatLong){
				var ll={lat:0,lon:0}, mult=[1,1];
				if(stringLatLong.split(",").length==2){
					var _lat, lat=stringLatLong.split(",")[0];
					var _lon, lon=stringLatLong.split(",")[1];
					if(lat.toLowerCase().indexOf("s")!=-1){mult[0]=-1;}
					if(lon.toLowerCase().indexOf("w")!=-1){mult[1]=-1;}
					_lat=(lat.replace(/[^0-9,°]+/g, ''))*mult[0];
					_lon=(lon.replace(/[^0-9,°]+/g, ''))*mult[1]; 
					ll.lat=_lat;
					ll.lon=_lon;
				}
				return ll;
			}

		}
		return service;
	}])

	.controller('ThreeLeafletController', ["$window", "$http", "$scope", "$rootScope", "$state", "$stateParams", "threeCSSService", "leafletService", 
		function ThreeLeafletController($window, $http, $scope, $rootScope, $state, $stateParams, threeCSSService, leafletService) {
			$scope.name='ThreeLeafletController';
			$scope.activeAnimations=["animate"];
			$scope._dir=-1;
			$scope.incr=.01;
			$scope.currentRotate=180;
			$scope.maxRotate=200;
			$scope.minRotate=160;
			$scope._position={
				z:-10
			};
			$scope._rotation={
				x:threeCSSService.radianCalculator(1)
			};
			$scope.init=function(elem, _content, map, _context){
				var me=$scope;
				if(!me.isInited){
					threeCSSService.init(elem, me, _content, _context);
					me.isInited=true;
					try{
						render();
					}catch(oops){
						console.log("leaflet.js rendering bypassed for unit tests.")
					}
				}
				leafletService.buildMap(map);
			}
			$scope.animate=function(){
				$scope.currentRotate+=($scope._dir * $scope.incr);
				if($scope.currentRotate<$scope.maxRotate){
					if($scope.currentRotate<$scope.minRotate){
						$scope._dir=-$scope._dir;
						$scope.currentRotate+=$scope._dir;
					}
				}else{
					$scope._dir=-$scope._dir;
					$scope.currentRotate+=$scope._dir;
				}
				$scope.css3DObject.rotation.y=threeCSSService.radianCalculator($scope.currentRotate)
				$scope.css3DObject.position.z=$scope.css3DObject.position.z + ($scope._dir * $scope.incr * 10);
				$scope.renderer.render($scope.scene, $scope.camera);
			}
			var render=function() {
				$scope.renderer.render($scope.scene, $scope.camera);
				threeCSSService.render($scope);
			}
		}
	]);	
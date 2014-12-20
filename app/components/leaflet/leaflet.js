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
			buildMapCallback:function(_content){
				console.log('me.leafletDiv=' + me.leafletDiv);
				if(_content){me.leafletDiv=_content}
				console.log("me.leafletDiv=" + me.leafletDiv);
				// set up the map
				map = new $window.L.map(me.leafletDiv);
				// create the tile layer with correct attribution
				var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
				var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
				var osm = new $window.L.TileLayer(osmUrl, {minZoom:4, maxZoom: 15, attribution: osmAttrib});
				// start the map in South-East England
				map.setView(new $window.L.LatLng(45.438, 12.33),5);
				map.addLayer(osm);
				// me.leafletMap = , {center: [51.505, -0.09], zoom: 13});
			},
			buildMap:function(_content){
				console.log("$state.$current=" + $state.$current.name + " and " + $stateParams.geoLocation) ;
				try{
					$window._state=$state;
					var me=service, map, ajaxRequest, plotlist, plotlayers=[];
					var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
					var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
					if(_content){me.leafletDiv=_content}
					switch($state.$current.name){
						case "mapfeed.geolocation":
							var _url=service.osmPrefix + $stateParams.geoLocation;
							$http({method: 'GET', url: _url})
								.success(function(data, status, headers, config) {
									if(data.length>0){
										map = new $window.L.map(me.leafletDiv);
										var osm = new $window.L.TileLayer(osmUrl, {minZoom:4, maxZoom: 15, attribution: data[0].licence});
										map.setView(new $window.L.LatLng(
											data[0].lat,
											data[0].lon),2);
										map.fitBounds([
										    [data[0].boundingbox[0], data[0].boundingbox[2]],
										    [data[0].boundingbox[1], data[0].boundingbox[3]]]);
										map.addLayer(osm);
									}else{
										console.log('no data');
									}
									$window._data=data;
									console.log("SUCCESS DATA=" + data);
									
									//	$scope.articles=data.articles;
									//	threeCSSService.init(elem, me, _content);
									//	render();
									/*
									data[0].boundingBox[0] // bottom   S
									data[0].boundingBox[1] // top      N
									data[0].boundingBox[2] // left     W
									data[0].boundingBox[3] // right    E
									*/
								})
							.error(function(data, status, headers, config) {
								console.log('error=' + data);
							});
/*
x*/
							break;
						case "mapfeed.latlong":
							map = new $window.L.map(me.leafletDiv);
							var osm = new $window.L.TileLayer(osmUrl, {minZoom:4, maxZoom: 15, attribution: osmAttrib});
							map.setView(new $window.L.LatLng($rootScope.lat, $rootScope.lon),5);
							map.addLayer(osm);
							break;
						case "map":
							map = new $window.L.map(me.leafletDiv);
							var osm = new $window.L.TileLayer(osmUrl, {minZoom:4, maxZoom: 15, attribution: osmAttrib});
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
						console.log("failed maxTries=");
					}
				}
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
			$scope.change=function(){
				console.log("$scope.change!!!!!!!")
			};
			$scope.test=function(val, div){
				console.log("functionDSVOPR.forms.leafletForm[val]" + val); // +" "+ document.forms.leafletForm[val])
				if(val.value.length==0){
				console.log("HIDEME")
					$(div).parent().addClass("isHidden");
				}else{
				console.log("SHOWME")
					$(div).parent().removeClass("isHidden");
				}
			}

			$scope.init=function(elem, _content, map, _context){
			//	$rootScope._context=$("#"+ _context).html();
				console.log("init-" + elem + " and " + _content);
				var me=$scope;
				if(!me.isInited){
					threeCSSService.init(elem, me, _content, _context);
					me.isInited=true;
					$scope.postinit(elem, _content);
					render();
				}
				leafletService.buildMap(map);
				// insert JSON call to get scope navs.
			}
			$scope.postinit=function(elem, _content){
				// insert JSON call to get scope navs.
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
	])

	.directive('threeLeaflet', function () {
		var leafletObj = {
			restrict: 'EA',
			replace:false,
			scope: true,
			controller: "ThreeLeafletController",
			template: "<div class='leaflet'></div>"
		};
		return leafletObj;
	});	
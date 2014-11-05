'use strict';

angular.module('bobApp.leaflet', ["bobApp", "threeModule", "ngRoute", "ui.router"])
	.service('leafletService', ['$rootScope', "$http", "$q", "$state", "$window",
	 function($rootScope, $http, $q, $state, $window) {
		var service={
			numTries:0,
			maxTries:5,
			leafletMap:null,
			leafletDiv:null,
			buildMap:function(_content){
				var me=service;
				console.log('me.leafletDiv=' + me.leafletDiv);
				try{
					if(_content){me.leafletDiv=_content}
					console.log("me.leafletDiv=" + me.leafletDiv);
					var map;
					var ajaxRequest;
					var plotlist;
					var plotlayers=[];
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
			$scope.init=function(elem, _content, map, _context){
				$rootScope._context=$("#"+ _context).html();
				console.log("init-" + elem + " and " + _content);
				var me=$scope;
				if(!me.isInited){
					threeCSSService.init(elem, me, _content);
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


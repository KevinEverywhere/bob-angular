'use strict';

angular.module('bobApp.navigation', ["bobApp", "threeModule", "ngRoute", "ui.router"])

	.controller('ThreeNavController', ["$window", "$http", "$scope", "$rootScope", "$state", "$stateParams", "threeCSSService", 
		function ThreeNavController($window, $http, $scope, $rootScope, $state, $stateParams, threeCSSService) {
			$scope.name='ThreeNavController';
			$scope.currentRotate=-2;
			$scope.maxRotate=2;
			$scope.minRotate=-2;
			$scope._position={
				z:2
			};
			$scope._rotation={
				x:threeCSSService.radianCalculator(-0.5)
			};
			$scope._dir=-1;
			$scope.incr=.01;
			$scope.navJSONURL="assets/js/navigation.json";
			$scope.activeAnimations=[];
			$scope.activeParams={};
			$scope.navs = {};
			$scope.init=function(elem, _content){
				var me=$scope;
				$http({method: 'GET', url: $scope.navJSONURL})
				.success(function(data, status, headers, config) {
					for(var d in data){
						me.navs[data[d].name]=data[d];
					}
					$window.navs = me.navs;
					if(!me.isInited){
						threeCSSService.init(elem, me, _content);
						me.isInited=true;
						$('.nav').on('click', 'li', function() {
							me.setNavByText( $(this).text() );
						});
						render();
					}
				})
				.error(function(data, status, headers, config) {
					console.log('error=' + data);
				});
				// insert JSON call to get scope navs.
			}
			$scope.setNavByText=function(whatText){
				$rootScope.$broadcast("navigatingToSection", $scope.navs[whatText].action);
			}
			$scope.action=function(what){
				console.log('what=' + what);
			}
			$scope.animate=function(){
				console.log("this.css3DObject.rotation.z=" + this.css3DObject.rotation.z);;
				$scope.renderer.render($scope.scene, $scope.camera);
			}
			var render=function() {
				$scope.renderer.render($scope.scene, $scope.camera);
				threeCSSService.render($scope);
			}
		}
	])

	.directive('threeNav', function () {
		var threeObj = {
			restrict: 'EA',
			replace:false,
			scope: true,
			controller: "ThreeNavController",
			_scope: {
				"id":"@",
				"eventHandler": '&ngClick'
			},
			template: "<div class='threeNav'></div>"
		};
		return threeObj;
	});
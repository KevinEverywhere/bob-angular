'use strict';

angular.module('bobApp.footer', ["bobApp", "threeModule", "ngRoute", "ui.router"])
	.controller('ThreeFooterController', ["$window", "$scope", "$rootScope", "$state", "$stateParams", "threeCSSService", "$http", 
		function ThreeFooterController($window, $scope, $rootScope, $state, $stateParams, threeCSSService, $http) {
			$scope.name='ThreeFooterController';
			$scope.navJSONURL="assets/js/navigation.json";
			$scope.activeAnimations=[];
			$scope.activeParams={};
			$scope.navs = {};
			$scope._dir=-1;
			$scope.incr=.1;
			$scope.currentRotate=180;
			$scope.maxRotate=189;
			$scope.minRotate=171;
			$scope._position={
				z:2
			};
			$scope._rotation={
				x:threeCSSService.radianCalculator(1.3),
				y:threeCSSService.radianCalculator(180),
				z:threeCSSService.radianCalculator(180)
			};
			/*
			$scope.init=function(elem, _content){
				console.log("elem=" + elem)
				if(!this.isInited){
					threeCSSService.init(elem, $scope, _content);
					this.isInited=true;
					render();
				}
			}
			*/
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
			$scope.animate=function(){
				console.log("footeranimate");
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
				$scope.css3DObject.rotation.x=threeCSSService.radianCalculator($scope.currentRotate);
				$scope.css3DObject.position.z=$scope.css3DObject.position.z + ($scope._dir * $scope.incr);
				$scope.renderer.render($scope.scene, $scope.camera);
			}
			var render=function() {
				console.log("THREECSSfooter.render function");
			//	$window.requestAnimationFrame(render);
				$scope.renderer.render($scope.scene, $scope.camera);
				threeCSSService.render($scope);
			}
		}
	])

	.directive('threeFooter', function () {
		var threeObj = {
			restrict: 'EA',
			replace:false,
	        transclude: true,
			scope: true,
			controller: "ThreeFooterController",
			_scope: {
				"id":"@",
				"eventHandler": '&ngClick'
			},
			template: "<div class='threeFooter'></div>"
		};
		return threeObj;
	});
'use strict';

angular.module('bobApp.main',  ["bobApp", "threeModule", "ngRoute", "ui.router"])
	.controller('ThreeCSSController', ["$window", "$scope", "$rootScope", "$state", "$stateParams", "threeCSSService", 
		function ThreeCSSController($window, $scope, $rootScope, $state, $stateParams, threeCSSService) {
			$scope.name='ThreeCSSController';
			$scope.activeAnimations=["animate"];
			$scope.activeParams={};
			$scope._dir=-1;
			$scope.incr=.01;
			$scope.currentRotate=199;
			$scope.maxRotate=200;
			$scope.minRotate=160;
			$scope._position={
				x:($scope._width/2)+20,
				y:0,
				z:-120
			};
			$scope._rotation={
				x:threeCSSService.radianCalculator(350),
				y:threeCSSService.radianCalculator(165),
				z:threeCSSService.radianCalculator(180)
			};
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
			$scope.init=function(elem, _content){
				if(!this.isInited){
					threeCSSService.init(elem, $scope, _content);
					this.isInited=true;
					try{
						render();
					}catch(oops){
						console.log("rendering bypassed for unit tests.")
					}
				}
			}
			var render=function() {
				$scope.renderer.render($scope.scene, $scope.camera);
				threeCSSService.render($scope);
			}
		}
	])

	.directive('three', function () {
		var threeObj = {
			restrict: 'EA',
			replace:false,
			transclude:true,
			scope: true,
			controller: "ThreeCSSController",
			_scope: {
				"id":"@",
				"eventHandler": '&ngClick'
			},
			template: "<div class='three'></div>"
		};
		return threeObj;
	});
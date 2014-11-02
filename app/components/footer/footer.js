'use strict';

angular.module('bobApp.footer', ["bobApp", "threeModule", "ngRoute", "ui.router"])
	.controller('ThreeFooterController', ["$window", "$scope", "$rootScope", "$state", "$stateParams", "threeCSSService", 
		function ThreeFooterController($window, $scope, $rootScope, $state, $stateParams, threeCSSService) {
			$scope.name='ThreeFooterController';
			$scope.activeAnimations=[];
			$scope.activeParams={};
			$scope._dir=-1;
			$scope.incr=.1;
			$scope.currentRotate=180;
			$scope.maxRotate=189;
			$scope.minRotate=171;
			$scope._position={
				z:-2
			};
			$scope._rotation={
				x:threeCSSService.radianCalculator(1.3),
				y:threeCSSService.radianCalculator(180),
				z:threeCSSService.radianCalculator(180)
			};

			$scope.init=function(elem, _content){
				console.log("elem=" + elem)
				if(!this.isInited){
					threeCSSService.init(elem, $scope, _content);
					this.isInited=true;
					render();
				}
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
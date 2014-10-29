'use strict';

angular.module('bobApp.footer', ["bobApp", "threeModule", "ngRoute", "ui.router"])
	.controller('ThreeFooterController', ["$window", "$scope", "$rootScope", "$state", "$stateParams", "threeCSSService", 
		function ThreeFooterController($window, $scope, $rootScope, $state, $stateParams, threeCSSService) {
			$scope.name='ThreeFooterController';
			$scope.toObject=null;
			$scope.activeFunction=null;
			$scope.activeAnimations=[];
			$scope.activeParams=null;
			$scope.count=0;
			$scope.maxCount=100;
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
				$scope.count++
				if($scope.count<$scope.maxCount){
					if($scope.css3DObject.rotation.y<4.7){
						console.log("object.rotation=" + $scope.css3DObject.rotation.y);
			//			$scope.rotate({
			//				y:0.001
			//			});
			//			this.move({x:-8});
						$scope.renderer.render($scope.scene, $scope.camera);
					}
				}
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
'use strict';

angular.module('bobApp.context', ["bobApp", "threeModule", "ngRoute", "ui.router"])
	.controller('ThreeContextController', ["$window", "$scope", "$rootScope", "$state", "$stateParams", "threeCSSService", "$timeout",
		function ThreeContextController($window, $scope, $rootScope, $state, $stateParams, threeCSSService, $timeout) {
			$scope.name='ThreeContextController';
			$scope.sectionTitle="ThreeContextController";
			$scope.activeAnimations=["animate"];
			$scope.activeParams={};
			$scope._dir=-1;
			$scope.incr=.001;
			$scope.currentPosition=0;
			$scope.maxPosition=5;
			$scope.minPosition=-10;
			$scope.init=function(elem, _content){
				console.log("ThreeContextController.init=" + $rootScope.sectionTitle);
				$scope.sectionTitle=$rootScope.sectionTitle;
				if(!this.isInited){
					threeCSSService.init(elem, $scope, _content);
					this.isInited=true;
					render();
				}
			}
			$scope.animate=function(){
				$scope.currentPosition+=($scope._dir * $scope.incr);
				if($scope.currentPosition<$scope.maxPosition){
					if($scope.currentPosition<$scope.minPosition){
						$scope._dir=-$scope._dir;
						$scope.currentPosition+=$scope._dir;
					}
				}else{
					$scope._dir=-$scope._dir;
					$scope.currentPosition+=$scope._dir;
				}
				$scope.css3DObject.position.z=$scope.css3DObject.position.z + ($scope._dir * $scope.incr);
				$scope.renderer.render($scope.scene, $scope.camera);
			}
			var render=function() {
				$scope.renderer.render($scope.scene, $scope.camera);
				threeCSSService.render($scope);
			}
		}
	])


	.directive('threeLeafletElement', ["$window", function threeLeafletElement($window){
			var leafletObj = {
				restrict: 'EAC',
				replace:true,
				scope: {
					"type":"=",
					"label":"=",
					"title":"=",
					"name":"=",
					"dependency":"=",
					doLeaflet:function(which){
			//			$window.alert(which);
						console.log("doLeaflet=function(" + which);
					}
				},
				controller: "ThreeLeafletController",
				link:function (scope, elem, attrs) {
				    this.scope = scope;
				    this.elem = elem;
				    this.attrs = attrs;
				}
			};
			return leafletObj;
		}]);





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
				switch($state.current.name){
					case "video":
						$("#sectionTitle").html("You Tube");
						$("#sectionBody").html($rootScope._context);
						break;
					case "map":
						$("#sectionTitle").html("Leaflet Map");
						$("#sectionBody").html($rootScope._context);
						break;
					case "home":
						$("#sectionTitle").html("About this App");
						break;
					case "svg":
						$("#sectionTitle").html("SVG Example");
						$("#sectionBody").html($rootScope._context);
						break;
				}
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
				$scope.css3DObject.position.z=$scope.css3DObject.position.z + ($scope._dir * $scope.incr * 10);
				$scope.renderer.render($scope.scene, $scope.camera);
			}
			var render=function() {
				$scope.renderer.render($scope.scene, $scope.camera);
				threeCSSService.render($scope);
			}
		}
	])
	.directive('threeContext', function () {
		var threeObj = {
			restrict: 'EA',
			replace:false,
			scope: {},
			controller: "ThreeContextController",
			_scope: {
				"id":"@",
				"eventHandler": '&ngClick'
			},
			template: "<div class='threeContext'></div>"
		};
		return threeObj;
	});

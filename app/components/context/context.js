'use strict';

angular.module('bobApp.context', ["bobApp", "threeModule", "ngRoute", "ui.router"])

	.controller('ThreeContextController', ["$window", "$http", "$scope", "$rootScope", "$state", "$stateParams", "threeCSSService", 
		function ThreeContextController($window, $http, $scope, $rootScope, $state, $stateParams, threeCSSService) {
			$scope.name='ThreeContextController';
			$scope.timer=null;
			$scope.toObject=null;
			$scope.activeFunction=null;
			$scope.activeAnimations=["animate"];
			$scope.activeParams={};
			$scope.navs = {};
			$scope.init=function(elem, _content){
				var me=$scope;
				threeCSSService.init(elem, me, _content);
				me.isInited=true;
				render();
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

	.directive('threeContext', function () {
		var threeObj = {
			restrict: 'EA',
			replace:false,
			scope: true,
			controller: "ThreeContextController",
			_scope: {
				"id":"@",
				"eventHandler": '&ngClick'
			},
			template: "<div class='threeContext'></div>"
		};
		return threeObj;
	});
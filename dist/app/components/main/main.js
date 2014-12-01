'use strict';

angular.module('bobApp.main',  ["bobApp", "threeModule", "ngRoute", "ui.router"])
	.controller('ThreeCSSController', ["$window", "$scope", "$rootScope", "$state", "$stateParams", "threeCSSService", 
		function ThreeCSSController($window, $scope, $rootScope, $state, $stateParams, threeCSSService) {
			$scope.name='ThreeCSSController';
			$scope.init=function(elem, _content){
				if(!this.isInited){
					threeCSSService.init(elem, $scope, _content);
					this.isInited=true;
					render();
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
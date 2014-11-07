'use strict';

angular.module('bobApp.footer', ["bobApp", "threeModule", "ngRoute", "ui.router"])
	.controller('ThreeFooterController', ["$window", "$scope", "$rootScope", "$state", "$stateParams", "threeCSSService", "$http", 
		function ThreeFooterController($window, $scope, $rootScope, $state, $stateParams, threeCSSService, $http) {
			$scope.name='ThreeFooterController';
			$scope.newsFeedURL="http://api.feedzilla.com/v1/categories/19/articles.json";
			$scope.feedItems=[];
			$scope.activeAnimations=['animate'];
			$scope.activeParams={};
			$scope.navs = {};
			$scope._dir=-1;
			$scope.incr=.5;
			$scope.currentMove=0;
			$scope.maxMove=0;
			$scope.minMove=-5000;
			$scope._position={
				z:2,
				y:50
			};
			$scope._rotation={
				x:threeCSSService.radianCalculator(1.3),
				y:threeCSSService.radianCalculator(180),
				z:threeCSSService.radianCalculator(180)
			};
			$scope.init=function(elem, _content){
				var me=$scope;
				$http({method: 'GET', url: $scope.newsFeedURL})
				.success(function(data, status, headers, config) {
					if(!me.isInited){
						$scope.articles=data.articles;
						threeCSSService.init(elem, me, _content);
						me.isInited=true;
						render();
					}
				})
				.error(function(data, status, headers, config) {
					console.log('error=' + data);
				});
			}
			$scope.setNavByText=function(whatText){
				$rootScope.$broadcast("navigatingToSection", $scope.navs[whatText].action);
			}
			$scope.animate=function(){
				$scope.currentMove+=($scope._dir * $scope.incr);
				if($scope.currentMove<$scope.maxMove){
					if($scope.currentMove<$scope.minMove){
						$scope._dir=-$scope._dir;
						$scope.currentMove+=$scope._dir;
					}
				}else{
					$scope._dir=-$scope._dir;
					$scope.currentMove+=$scope._dir;
				}
				$scope.css3DObject.position.x=$scope.currentMove;
				$scope.renderer.render($scope.scene, $scope.camera);
			}
			var render=function() {
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
'use strict';

angular.module('bobApp.footer', ["bobApp", "threeModule", "ngRoute", "ui.router"])
	.controller('ThreeFooterController', ["$window", "$scope", "$rootScope", "$state", "$stateParams", "threeCSSService", "$http", "$httpBackend", 
		function ThreeFooterController($window, $scope, $rootScope, $state, $stateParams, threeCSSService, $http, $httpBackend) {
			$scope.name='ThreeFooterController';
			$scope.newsFeedURL="http://api.feedzilla.com/v1/categories/19/articles.json";
			$scope.feedItems=[];
			$scope.activeAnimations=['animate'];
			$scope.activeParams={};
			$scope.navs = {};
			$scope._dir=-1;
			$scope.incr=.5;
			$scope.feedItemWidth=320;
			$scope.currentMove=null;
			$scope.maxMove=0;
			$scope.minMove=-3800;
			$scope._position={
				z:2,
				y:30
			};
			$scope._rotation={
				x:threeCSSService.radianCalculator(1.3),
				y:threeCSSService.radianCalculator(180),
				z:threeCSSService.radianCalculator(180)
			};
			$scope.makeScrollFit=function(howMany){
				$scope.maxMove=$scope._width;
				$scope.minMove=$scope._width-($scope.feedItemWidth * howMany);
			};
			$scope.init=function(elem, _content, toTest){
				var me=$scope;
				if(!toTest){
					$http({method: 'GET', url: $scope.newsFeedURL})
					.success(function(data, status, headers, config) {
						if(!me.isInited){
							$scope.articles=data.articles;
							threeCSSService.init(elem, me, _content);
							me.isInited=true;
							me.makeScrollFit(data.articles.length);
							render();
						}
					})
					.error(function(data, status, headers, config) {
						console.log('error=' + data);
					});
				}else{
					console.log('scopdde.$scope.newsFeedURL' + $scope.newsFeedURL);
					$httpBackend.expectGET($scope.newsFeedURL).respond({
						data:true
					});
					/*
					$httpBackend.expectGET($scope.newsFeedURL).respond(function(method, url, data, headers){
						console.log("data from expectGET=" + data);
					});
					$http({method: 'GET', url: $scope.newsFeedURL})
					.success(function(data, status, headers, config) {
						if(!me.isInited){
							$scope.articles=data.articles;
							threeCSSService.init(elem, me, _content);
							me.isInited=true;
							me.makeScrollFit(data.articles.length);
							render();
						}
					})
					.error(function(data, status, headers, config) {
						console.log('error=' + data);
					});					
					*/

				}
			}
			$scope.setNavByText=function(whatText){
				$rootScope.$broadcast("navigatingToSection", $scope.navs[whatText].action);
			}
			$scope.animate=function(){
				$scope.currentMove= ($scope.currentMove==null) ? $scope.maxMove : $scope.currentMove+($scope._dir * $scope.incr);
				if($scope.currentMove<$scope.minMove){
					$scope.currentMove=$scope.maxMove;
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
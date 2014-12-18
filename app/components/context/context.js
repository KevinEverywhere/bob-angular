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
				switch($state.current.name.substring(0,3)){
					case "vid":
						$("#sectionTitle").html("You Tube");
						break;
					case "map":
						$("#sectionTitle").html("Leaflet Map");
						$window.scope=$scope;
						console.log("$scope.name=" + $scope.name);
						break;
					case "hom":
						$("#sectionTitle").html("About this App");
						break;
					case "svg":
						$("#sectionTitle").html("SVG Example");
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


	.directive('threeLeafletElement', function threeLeafletElement(){
		var leafletObj = {
			restrict: 'EAC',
			replace:true,
			scope: {
				"type":"=",
				"label":"=",
				"title":"=",
				"name":"=",
				"dependency":"="
			},
			controller: "ThreeLeafletController",
			link:function (scope, elem, attrs) {
			    this.scope = scope;
			    this.elem = elem;
			    this.attrs = attrs;
			},
			template: buildDiv(),
			buildDiv:function(){
				var mystring="dsfasfsd";
				/*
				switch($scope.type){
					case "submit":
						mystring='<div><input type="submit" value="'+$scope.title+'" /></div>';
						break;
					case "text":
						mystring="<div><label>"+$scope.label+"</label><input class='form-control field em1 auto-hint' title='"+
						$scope.title+ "' change='test(this,\'cityDiv\')' type='"+ $scope.type+"' ng-model='"+
						$scope.name+"' name='"+$scope.name+"' id='"+$scope.name+"'></input><br/></div>";
						break;
				}
						*/
				return mystring;
			}
		};
		return leafletObj;
	});





'use strict';

angular.module('bobApp.svg', ["bobApp", "threeModule", "ngRoute", "ui.router"])
	.controller('ThreeSVGController', ["$window", "$scope", "$rootScope", "$state", "$stateParams", "D3Service", "LocalCRUDService", "threeCSSService", 
		function ThreeSVGController($window, $scope, $rootScope, $state, $stateParams, D3Service, LocalCRUDService, threeCSSService) {
			var d3World=D3Service, countryURL="assets/js/world.json";
			if(LocalCRUDService.manageLocalCRUD('retrieve', 'd3Data')){
				d3World.d3Data=LocalCRUDService.manageLocalCRUD('retrieve', 'd3Data');
				d3World.init(d3World.defaultSVGWidth,d3World.defaultSVGHeight,"#worldDiv", "assets/media/groupedWorld.svg");
			}else{
				var _LocalCRUDService=LocalCRUDService;
				d3World.d3Data=null; 
				d3.json(countryURL,function(err, d){
					if(!err){
						d3World.d3Data=d;
						_LocalCRUDService.manageLocalCRUD("create",{"key":"d3Data","value":d});
						d3World.init(d3World.defaultSVGWidth,d3World.defaultSVGHeight,"#worldDiv", "assets/media/groupedWorld.svg");
					}
				});
			}
			$scope.name='ThreeSVGController';
			$scope.activeAnimations=[];
			$scope.activeParams=[];
			$scope.count=0;
			$scope.maxCount=100;
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

	.directive('threeSVG', function () {
		var threeObj = {
			restrict: 'AE',
			replace:false,
			scope:true,
			_scope: {
				"id":"@",
				"eventHandler": '&ngClick'
			},
			template: "<div id='worldDiv' class='threeSVG' data-ng-click='mapClick(this)'></div>"
		};
		return threeObj;
	});



'use strict';

angular.module('bobApp.svg', ["bobApp", "threeModule", "ngRoute", "ui.router"])
	.controller('ThreeSVGController', ["$window", "$scope", "$rootScope", "$state", "$stateParams", "LocalCRUDService", "threeCSSService", 
		function ThreeSVGController($window, $scope, $rootScope, $state, $stateParams, LocalCRUDService, threeCSSService) {
			$scope.name='ThreeSVGController';
			$scope._position={
				z:-70
			};
			$scope._rotation={
				x:0,
				y:threeCSSService.radianCalculator(200),
				z:threeCSSService.radianCalculator(180)
			};
			$scope.threeCSSService=threeCSSService;
			$scope.currentItem=null;
			$scope.activeAnimations=["animate"];
			$scope.activeParams={};
			$scope.d3World={};
			$scope._dir=-1;
			$scope.incr=.008;
			$scope.initialScale=0.4;
			$scope.currentRotate=180;
			$scope.maxRotate=190;
			$scope.minRotate=170;
			$scope.svgDiv=function(){
				return document.getElementById($scope._svgDiv)
			}
			$scope.initWorld=function(init){
				var me=this;
				$scope.svgDiv().addEventListener("touchend", function(evt){
					me.svgCall(evt);
				}, false);
				$scope.svgDiv().addEventListener("click",  function(evt){
					me.svgCall(evt);
				}, false);
			};
			$scope.svgCall=function(evt){
				if($scope.currentItem!=null){
					d3.select("#" + $scope.currentItem).attr('opacity',1)
				}
				$scope.currentItem=evt.target.parentNode.id;
				d3.select("#" + evt.target.parentNode.id).attr('opacity',0.);
			};
			$scope.loadSVG=function(xml){
        		try{
					$scope.importedNode = document.importNode(xml.documentElement, true);
					$window.d3.select("#" + $scope._svgDiv).node().appendChild($scope.importedNode);
					$scope.threeCSSService.init($scope.elem, $scope, $scope.__content);
					render();
				}catch(oops){}
            };
			$scope.init=function(elem, _content, _svgDiv, svgURL){
				var me=$scope;
				$scope.elem=elem;
				$scope.__content=_content;
				$scope._svgDiv=_svgDiv;
				$scope.svgURL=svgURL;
				$scope.d3World=d3.xml($scope.svgURL, "image/svg+xml",function(xml) {
					console.log("xml=" + xml);
					$window._xml=xml;
					me.loadSVG(xml);
					me.initWorld();
				});
			}
			$scope.animate=function(){
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
				$scope.css3DObject.rotation.y=threeCSSService.radianCalculator($scope.currentRotate)
				$scope.css3DObject.position.z=$scope.css3DObject.position.z + ($scope._dir * $scope.incr * 10);
				$scope.renderer.render($scope.scene, $scope.camera);
			}
			var render=function() {
				$scope.renderer.render($scope.scene, $scope.camera);
				threeCSSService.render($scope);
			}
			var setVendor=function(element, property, value) {
			  element.style["webkit" + property] = value;
			  element.style["moz" + property] = value;
			  element.style["ms" + property] = value;
			  element.style["o" + property] = value;
			}

		}
	])

	.directive('threeSVG', function () {
		var threeObj = {
			restrict: 'AE',
			replace:false,
			scope:{
				"id":"@",
				"eventHandler": '&ngClick'
			},
			template: "<div id='svgDiv' data-ng-click='mapClick(this)'></div>"
		};
		return threeObj;
	});

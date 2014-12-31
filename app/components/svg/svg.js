'use strict';

angular.module('bobApp.svg', ["bobApp", "threeModule", "ngRoute", "ui.router", "ng"])
	.service("svgD3Data",['$rootScope', "$http", "$q", "$state", "$window", "countryService",
		 function($rootScope, $http, $q, $state, $window, countryService) {
		 	var service={
		 		d3Data:null,
		 		wrapURL:function(str){
		 			var _str="assets/media/" + str + ".json";
		 			return _str;
		 		},
		 		mapWBStats:function(whichStat){
		 			var me=service;
					d3.json(service.wrapURL(whichStat),function(err, d){
						if(!err){
							me.d3Data=d[1].sort(function(a,b){return (b.value*1) > (a.value*1)  });
							$window.d3Data=me.d3Data;
							angular.forEach(d3Data, function(value, key){
								var countryLength=210;
								try{
									var key1=(key/countryLength), key2=(255 * key1);
									var _color="rgba("+key2/5+", "+key2/4+", "+key2+", "+key1+")",
									country=value.country.id.toLowerCase();
									d3.select("#" + country).attr(
										'opacity', key1
										);
									d3.select("#" + country).attr(
										'fill',_color
										);
									d3.select("#" + country).selectAll('g').attr(
										'fill',_color
										);
									d3.select("#" + country).selectAll('g').selectAll('path').attr(
										'fill',_color
										);
								}catch(oops){
								}
							});
						}
					});
		 		}
		 	}
		 	return service;
		}
	])
	.controller('ThreeSVGController', ["$window", "$scope", "$rootScope", "$state", "$stateParams", "LocalCRUDService", "threeCSSService", 
		"countryService", "svgD3Data", 
		function ThreeSVGController($window, $scope, $rootScope, $state, $stateParams, LocalCRUDService, threeCSSService, countryService, svgD3Data) {
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
					d3.select("#" + $scope.currentItem).attr('opacity',1);
				}
				$scope.currentItem=evt.target.parentNode.id;
				console.log("$scope.currentItem=" + $scope.currentItem + "; " + countryService.getNameFrom2($scope.currentItem));
				d3.select("#" + evt.target.parentNode.id).attr('opacity',0.);
				$window.location.href = "#/mapfeed/geo-location/" + countryService.getNameFrom2($scope.currentItem);
			};
			$scope.loadSVG=function(xml){
        		try{
					$scope.importedNode = document.importNode(xml.documentElement, true);
					$window.d3.select("#" + $scope._svgDiv).node().appendChild($scope.importedNode);
					$scope.threeCSSService.init($scope.elem, $scope, $scope.__content, $scope._context);
					render();
				}catch(oops){}
			};
			$scope.loadWBData=function(indicator){
				var _startURL="http://api.worldbank.org/countries/all/indicators/",
				_endURL="?date=2010:2010&per_page=248&format=json",
				fullURL=_startURL + indicator + _endURL;
            };
			$scope.init=function(elem, _content, _svgDiv, _context, svgURL){
				$rootScope._context=$("#"+ _context).html();
				var me=$scope;
				$scope.elem=elem;
				$scope.__content=_content;
				$scope._context=_context;
				$scope._svgDiv=_svgDiv;
				$scope.svgURL=svgURL;
				$scope.d3World=d3.xml($scope.svgURL, "image/svg+xml",function(xml) {
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

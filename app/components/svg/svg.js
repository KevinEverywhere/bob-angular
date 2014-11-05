'use strict';

angular.module('bobApp.svg', ["bobApp", "threeModule", "ngRoute", "ui.router"])
	.controller('ThreeSVGController', ["$window", "$scope", "$rootScope", "$state", "$stateParams", "LocalCRUDService", "threeCSSService", "countryService",  
		function ThreeSVGController($window, $scope, $rootScope, $state, $stateParams, LocalCRUDService, threeCSSService, countryService) {
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
			$scope.csvCall=function(csvURL){
				// Original URL: "https://raw.githubusercontent.com/datasets/cpi/master/data/cpi.csv";
				var _csv="assets/js/cpi.csv";
				var rtn=d3.csv(_csv)
				    .row(function(d) { 
				    	var theYear=+d.Year;
							if(theYear==2010){
								return{
									name:d["Country Name"],
									year:theYear,
									code:d["Country Code"],
									cpi:Math.floor(d.CPI)
								};
							};
				     })
				    .get(function(error, rows) { 
				    	return rows;
				    	console.log(rows); 
				    });

				/*

				var parsed=[], _parsed=d3.csv(_csv,
					function(error, data) {
						data.forEach(function(d) { 
							var theYear=+d.Year;
							if(theYear==2010){
								parsed.push({
									name:d["Country Name"],
									year:theYear,
									code:d["Country Code"],
									cpi:Math.floor(d.CPI)
								});
							};
						}
					)
			    });
			    $window.parsed= parsed;
				console.log("_parsed=" + parsed);

				*/
				return rtn;
            };
			$scope.init=function(elem, _content, _svgDiv, _context, svgURL){
				$rootScope._context=$("#"+ _context).html();
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
					countryService.init();
					me.paintOrder(me.csvCall());
		//			me.paintOrder(countryService.countries);
		//			$window.parsed=me.csvCall();
					console.log('countryService.get3From2("CAn")=' + countryService.get2From3("CAn"));
				});
			}
			$scope.paintOrder=function(arr, _colorArray){
				var colorArray= (_colorArray) ? _colorArray : ["000","2b2b2b","555","777","999","BBB","DDD","FFF"];
				var counter=0;
				for(var a=0;a<arr.length;a++){
					try{
						console.log("arr.length=" + arr.length);
		//				console.log(arr[a].name + "=" + Math.min(0.5+Math.floor((a * 10)/arr.length)/10, 1));
						d3.select("#"  + countryService.get2From3(arr[a].code).toLowerCase())
			//			d3.select("#"  + arr[a].iso2.toLowerCase()).attr('opacity',0); 
					//	.attr('opacity', Math.min(0.5+Math.floor((a * 10)/arr.length)/10, 1));
						  				// 'fill', "#" + colorArray[Math.floor((a *  colorArray.length) / arr.length)])
						counter++;
						console.log(counter + " ok " + colorArray[Math.floor((a *  colorArray.length) / arr.length)]);
					}catch(oops){
						console.log(counter + " FAILED  " + arr[a]);
					}
				}
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

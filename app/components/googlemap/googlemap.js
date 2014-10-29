'use strict';

angular.module('bobApp.googlemap', ["bobApp", "threeModule", "ngRoute", "ui.router"])
	.service('MapService', ['$rootScope', "$http", "$q", "$state", "$window",
	 function($rootScope, $http, $q, $state, $window) {
		var service={
			countries:[],
			currentCountry:-1,
			userActivated:false,
			locationDetermined:false,
			isInited:false,
			countriesURL:"assets/world.json",
			getCountryFromName:function(which, prop){
				var _which=null;
				if ($rootScope.countries.length>1){
					for(var z=0;z<$rootScope.countries.length;z++){
						if($rootScope.countries[z].CountryName==which){
							if(prop){
								_which= $rootScope.countries[z][prop]-1;
							}else{
								_which= z-1;
							}
						}
					}
					return _which;
				}else{
					var me=this, _which=which, _prop=prop;
					setTimeout(function(){me.getCountryFromName(_which, _prop);},600)
				};
			},
			determineLocation:function(){
				if(!this.locationDetermined){
					var me=this;
					$.ajax( { 
						url: '//freegeoip.net/json/', 
						type: 'POST', 
						dataType: 'jsonp',
						success: function(location) {
							var mapOptions= new google.maps.LatLng(location.latitude, location.longitude);
							me.getCountryData(me.getCountryFromName(location.country_name, "CountryID"), mapOptions);
						},
						error: function() {
							var mapOptions= new google.maps.LatLng(37.7699985,-122.4469347);
							$rootScope.map=new google.maps.Map(document.getElementById("countryMap"), mapOptions);
						}
					})
					this.locationDetermined=true;
				}
			},
			centerCurrentCountry:function(_mapOptions){
				var mapOptions, _area, theZoomFactor, theTweak, theCenter;
				if(!_mapOptions){
					 _area=(parseFloat(this.getCurrentCountry().Landarea) + parseFloat(this.getCurrentCountry().Waterarea)),
					 theTweak= Math.round(Math.pow(_area,.18)-Math.pow(_area,.16));
					if(theTweak<5){
						theTweak+=10;
					}else{
						theTweak+=9; 
					}
					theCenter=new google.maps.LatLng(parseFloat(this.getCurrentCountry().Latitude),-1 * (parseFloat(this.getCurrentCountry().Longitude)));
					theZoomFactor=17-theTweak;
				}else{
					theCenter=_mapOptions;
					theZoomFactor=13;
				}
				mapOptions={
					draggable:true,
					zoom: theZoomFactor,
					type:"ROADMAP",
					mapTypeControl:true,
					scaleControl:true,
					center: theCenter
				}
				try{
					$rootScope.map.setOptions(mapOptions);
				}catch(oops){
					try{
						$rootScope.map=new google.maps.Map(document.getElementById("countryMap"), mapOptions);
					}catch(oops){}
				}
			},
			setCurrentLocation:function(position){
				if(this.currentLocation!=true){
					var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
					var mapOptions = {
						zoom: 15,
						center: latlng,
						mapTypeControl: false,
						navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
						mapTypeId: google.maps.MapTypeId.ROADMAP
					};
					try{
						$rootScope.map.setOptions(mapOptions);
					}catch(oops){
						try{
							$rootScope.map=new google.maps.Map(document.getElementById("countryMap"), mapOptions);
						}catch(oops){}
					}
				}
			},
			setCurrentCountry:function(toWhich){
				this.currentCountry=toWhich;
				//$rootScope.swapHighlights(this.getCurrentCountry().GeoObject);
			},
			getCurrentCountry:function(){
				return(this.currentCountry > -1 ? $rootScope.countries[this.currentCountry] : null)
			},
			getCountryData:function(whichCountry, mapOptions){
				var me=this, _whichCountry=whichCountry, _mapOptions=mapOptions;
				if ($rootScope.countries.length>1){
					if(this.currentCountry!=whichCountry){
						this.setCurrentCountry(whichCountry);
						whichCountry++;
					}
					if(this.getCurrentCountry()){
						var _mapOptions=mapOptions;
						$http({method: 'GET', url: this.countriesURL  + "?CountryID="+ whichCountry})
						.success(function(data, status, headers, config) {
						 	me.getCurrentCountry().extended=true;
						 	$state.go('country.detail',{CountryID:whichCountry});
						 	me.centerCurrentCountry(_mapOptions);
						})
						.error(function(data, status, headers, config) {
						});
					}else{
						if (navigator.geolocation) {
						  navigator.geolocation.getCurrentPosition(function(position){
						  	me.setCurrentLocation(position);
						  }, function(error){});
						}
					}
				}else{
					setTimeout(function(){me.getCountryData(_whichCountry, _mapOptions);},600)
				}
			},
			init:function(){
				var _this=this;
				$http({method: 'GET', url: this.countriesURL})
					.success(function(data, status, headers, config) {
						if(runOnce<1){
							runOnce++;
							$rootScope.countries=data.world.countries;
							$rootScope.continents=data.world.continents;
							$rootScope.$broadcast( 'MapService.init' );
						}
					})
					.error(function(data, status, headers, config) {});
			},
			_create:function(what){
				
			}
		}
		return service;
	}])

	.controller('ThreeMapController', ["$window", "$http", "$scope", "$rootScope", "$state", "$stateParams", "threeCSSService", "MapService", 
		function ThreeMapController($window, $http, $scope, $rootScope, $state, $stateParams, threeCSSService, MapService) {
			$scope.post_init=function(){
				if(!MapService.isInited){
					if(MapService.currentCountry<0) {
						MapService.determineLocation();
					}else{
						MapService.getCountryData(MapService.currentCountry);
					}
					MapService.isInited=true;
				}
			}
			$scope.init=function(elem, _content){
				var me=$scope;
				if(!me.isInited){
					me.post_init();
					threeCSSService.init(elem, me, _content);
					me.isInited=true;
					render();
				}
				// insert JSON call to get scope navs.
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

	.directive('threeMap', function () {
		var gMapObj = {
			restrict: 'EA',
			replace:false,
			scope: true,
			controller: "ThreeMapController",
			_scope: {
				"id":"@",
				"draggable":"@",
				"data-zoom":"@" ,
				"data-type":"@",
				"eventHandler": '&ngClick',
				"data-map-type-control":"@",
				"data-scale-control":"@"
			},
			template: "<div class=\"{{$rootScope.svgToggle==true ? 'countryMap' : 'tempClassFull'}}\"></div>"
		};
		return gMapObj;
	});


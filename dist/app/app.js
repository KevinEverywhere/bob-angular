'use strict';

var bobApp=angular.module("bobApp",  [
	'threeModule',
	'd3Module',
	'countryModule',
	'bobApp.svg',
	'bobApp.context',
	'bobApp.navigation',
	'bobApp.main',
	'bobApp.footer',
	'bobApp.leaflet',
	'bobApp.youtube',
	'bobApp.youtube.search',
	'ngRoute', 
	'localCRUD',
	'ui.router'
])
	.run(function ($rootScope, $state, $stateParams, $window, threeCSSService) {
		$rootScope.googleReady=false;
		$rootScope.sectionTitle="Testing";
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
		$rootScope.hasOpened=true;
		$rootScope.interstitialized={done:false};
		var redraw=function () {
			console.log('redraw');
			resize();
		};
		var resize=function (evt) {
			$window.changeSize(evt);
			try{
				$state.reload();
				console.log("$state.reload()");
			}catch(oops){}
		};
		$window.googleApiClientReady = function($rootScope) {
			$rootScope.googleReady=true;
			console.log("ggole googleReady");
		}
		$window.addEventListener('orientationchange', redraw, false);
		$window.addEventListener('resize', resize, false);
		$window.addEventListener('online', function(e) {
			$rootScope.$broadcast("onlineStatusUpdate");
		}, false);
		$window.addEventListener('offline',function(e) {
			$rootScope.$broadcast("onlineStatusUpdate");
		}, false);

 		$rootScope.$on('navigatingToSection',function(toWhat, toWhich){
			$state.go(toWhich);
 		});
		$rootScope.$on('$stateChangeStart', 
		function(event, toState, toParams, fromState, fromParams){ 
			switch(toState){
				case "video":
					break;
				case "map":
					break;
				case "home":
					break;
				case "svg":
					break;
			}
			$window['stated']=toState;
			console.log("toState=" + toState);
		})
		$rootScope.$on('$stateChangeSuccess', 
		function(event, toState, toParams, fromState, fromParams){ 
			switch(toState){
				case "video":
				//	$("#sectionTitle").html("You Tube");
					break;
				case "map":
				//	$("#sectionTitle").html("Leaflet Map");
					break;
				case "home":
				//	$("#sectionTitle").html("About this App");
					break;
				case "svg":
				//	$("#sectionTitle").html("SVG Example");
					break;
			}
			$window['stated']=toState;
			console.log("stateChangeSuccess=" + toState);
		});
		resize();
	})
	.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');
		$stateProvider
		  .state('home', {
			url: '/',
			views:{
				"axis2":{
					templateUrl: 'components/main/main.html',
					controller: 'ThreeCSSController'
				},
				"axis3":{
					templateUrl: 'components/context/context.html',
					controller: 'ThreeContextController'
				},
				"pageBottom":{
					templateUrl: 'components/footer/footer.html',
					controller: 'ThreeFooterController'
				}
			}
		  })
		  .state('video', {
			url: '/video',
			views:{
				"axis2":{
					templateUrl: 'components/youtube/youtube.html',
					controller: 'ThreeYouTubeController'
				},
				"axis3":{
 					templateUrl: 'components/context/context.html',
					controller: 'ThreeContextController'
				},
				"pageBottom":{
					templateUrl: 'components/footer/footer.html',
					controller: 'ThreeFooterController'
				}
			}
		  })
		  .state('svg', {
			url: '/svg',
			views:{
				"axis2":{
					templateUrl: 'components/svg/svg.html',
					controller: 'ThreeSVGController'
				},
				"axis3":{
 					templateUrl: 'components/context/context.html',
					controller: 'ThreeContextController'
				},
				"pageBottom":{
					templateUrl: 'components/footer/footer.html',
					controller: 'ThreeFooterController'
				}
			}
		  })
		  .state('map', {
			url: '/map',
			views:{
				"axis2":{
					templateUrl: 'components/leaflet/leaflet.html',
					controller: 'ThreeLeafletController'
				},
				"axis3":{
 					templateUrl: 'components/context/context.html',
					controller: 'ThreeContextController'
				},
				"pageBottom":{
					templateUrl: 'components/footer/footer.html',
					controller: 'ThreeFooterController'
				}
			}
		  });
      return $stateProvider;
    });

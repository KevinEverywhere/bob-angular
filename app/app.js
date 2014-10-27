'use strict';

var bobApp=angular.module("bobApp",  [
	'threeModule',
	'bobAngular',
	'bobApp.navigation',
	'bobApp.main',
	'bobApp.footer',
	'bobApp.media',
	'bobApp.googlemap',
	'bobApp.youtube',
	'ngRoute', 
	'localCRUD',
	'ui.router'
])
	.run(function ($rootScope, $state, $stateParams, $window) {
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
		$rootScope.hasOpened=true;
		$rootScope.interstitialized={done:false};
		var redraw=function () {
			console.log('redraw')
		};
		$window.addEventListener('orientationchange', redraw, false);
		$window.addEventListener('resize', redraw, false);
		$window.addEventListener('online', function(e) {
			console.log("masterMapApp.updateOnlineStatus");
			$rootScope.$broadcast("onlineStatusUpdate");
		}, false);
		$window.addEventListener('offline',function(e) {
			console.log("masterMapApp.updateOnFFlineStatus");
			$rootScope.$broadcast("onlineStatusUpdate");
		}, false);

 		$rootScope.$on('navigatingToSection',function(toWhat, toWhich){
 			console.log('navigatingToSection=' + toWhich);
			$state.go(toWhich);
 		});
	})
	.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');
		$stateProvider
		  .state('main', {
			url: '/',
			views:{
				"axis1":{
					templateUrl: 'components/navigation/navigation.html',
					controller: 'ThreeNavController'
				},
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
		  .state('story', {
			url: '/story',
			views:{
				"axis1":{
					templateUrl: 'components/navigation/navigation.html',
					controller: 'ThreeNavController'
				},
				"axis2":{
					templateUrl: 'components/media/media.html',
					controller: 'ThreeMediaController'
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
				"axis1":{
					templateUrl: 'components/navigation/navigation.html',
					controller: 'ThreeNavController'
				},
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
				"axis1":{
					templateUrl: 'components/navigation/navigation.html',
					controller: 'ThreeNavController'
				},
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
				"axis1":{
					templateUrl: 'components/navigation/navigation.html',
					controller: 'ThreeNavController'
				},
				"axis2":{
					templateUrl: 'components/googlemap/googlemap.html',
					controller: 'ThreeMapController'
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

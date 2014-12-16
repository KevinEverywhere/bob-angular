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
	.run(function ($rootScope, $state, $stateParams, $window, threeCSSService, YouTubeSearchService, $location) {
		$rootScope.googleReady=false;
		$rootScope.sectionTitle="Testing";
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
		$rootScope.hasOpened=true;
		$rootScope.currentData=null;
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

 		$rootScope.$on('navigatingToSection',function(event, toWhich){
			$state.go(toWhich);
 		});
 		$rootScope.$on("youtube_search_update",function(event, data, scope){
 			console.log("youtube_search_update" + event + ":" + data)
			YouTubeSearchService.search_update(data, scope);
 		});
		$rootScope.$on('$stateChangeStart', 
		function(event, toState, toParams, fromState, fromParams){ 
			switch(toState.name){
				case "video":
					var q=$location.absUrl().indexOf("?");
					if(q!=-1){
						var cutString=$location.absUrl().substr(q),
						_start=cutString.indexOf("=")+1,_end=cutString.indexOf("#");
						console.log("going to cutString.substring(_start,_end)=" + cutString.substring(_start,_end));
					//	$state.go("videofeed",{videofeed:cutString.substring(_start,_end)})
						$window.location.href = $location.absUrl().substring(0,q) + "#/videofeed/" + cutString.substring(_start,_end);
					}
					break;
				case "map":
					console.log("statechange.mapy=");
					var q=$location.absUrl().indexOf("?");
					if(q!=-1){
						var searchString="", searchObj=$window.location.search.substring(1).split("&");
						for(var s=0;s<searchObj.length;s++){
							if(
								searchObj[s].split("=")[1] &&
								searchObj[s].split("=")[1].length>0
								) {
								searchString+="&"+searchObj[s];
							}
						}
						$window.searchObj=searchObj;
						console.log("searchObj,=" + searchObj);
					//	$state.go("videofeed",{videofeed:cutString.substring(_start,_end)})
						$window.location.href = $location.absUrl().substring(0,q) + "#/mapfeed/" + searchString.substring(1);
					}
					break;
				case "mapfeed":
					var prefix="http://nominatim.openstreetmap.org/search?format=json&limit=5";//  + $stateParams.details;
					console.log("mapfeed == " + prefix);
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
			switch(toState.name){
				case "video":
					break;
				case "mapfeed":

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
			console.log("stateChangeS000uccess=" + toState);
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
		  .state('videofeed', {
			url: '/videofeed',
			views:{
				"axis2":{
					templateUrl: 'components/youtube/youtube_search.html'
					, controller: 'YouTubeSearchController'
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

		  .state('mapfeed', {
			url: '/mapfeed',
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

		  })

		  .state('mapfeed.details', {
			url: '/:details',
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

		  })
		  .state('videofeed.videofeed', {
			url: '/:videofeed',
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
		  .state('video', {
			url: '/video',
			views:{
				"axis2":{
				//	templateUrl: 'components/youtube/youtube_search.html'
				//	, controller: 'YouTubeSearchController'
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

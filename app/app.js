'use strict';

var bobApp=angular.module("bobApp",  [
	'threeModule',
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
	.run(function ($rootScope, $state, $stateParams, $window, threeCSSService, YouTubeService, YouTubeSearchService, $location, svgD3Data) {
		$rootScope.googleReady=false;
		$rootScope.sectionTitle="Testing";
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
		$rootScope.hasOpened=true;
		$rootScope.currentData=null;
		$rootScope.interstitialized={done:false};
		var redraw=function () {
			resize();
		};
		var resize=function (evt) {
			$window.changeSize(evt);
			try{
				$state.reload();
			}catch(oops){}
		};
		$window.googleApiClientReady = function($rootScope) {
			$rootScope.googleReady=true;
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
 		$rootScope.$on('incrementCurrentVideo',function(event){
			YouTubeSearchService.incrementCurrentVideo();
 		});
		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 
			switch(toState.name){
				case "video":
					var q=$location.absUrl().indexOf("?");
					if(q!=-1){
						var cutString=$location.absUrl().substr(q),
						_start=cutString.indexOf("=")+1,_end=cutString.indexOf("#");
					//	$state.go("videofeed.videofeed",{videofeed:cutString.substring(_start,_end)})
						$window.location.href = $location.absUrl().substring(0,q) + "#/videofeed/" + cutString.substring(_start,_end) + "/0";
					}
					break;
				case "video.videofeed.index":
					break;
				case "map":
					var q=$location.absUrl().indexOf("?");
					if(q!=-1){
						var searchString="", searchObj=$window.location.search.substring(1).split("&");
						for(var s=0;s<searchObj.length;s++){
							if(
								searchObj[s].split("=")[1] &&
								searchObj[s].split("=")[1].length>0
								) {
								searchString+= 
									(searchObj[s].split("=")[0] == "geo-location" || searchObj[s].split("=")[0] == "latlong") ?
										"/"+ searchObj[s].split("=")[0] + "/" + searchObj[s].split("=")[1] : 
										"/" + searchObj[s].split("=")[1];
							}
						}
						//	$state.go("videofeed.geolocation",{ geolocation:searchString.substring(1) });
						$window.location.href = $location.absUrl().substring(0,q) + "#/mapfeed/" + searchString.substring(1);
					}
					break;
				case "mapfeed.geolocation":
					var q=$location.absUrl().indexOf("?");
					if(q!=-1){
						var searchString="", searchObj=$window.location.search.substring(1).split("&");
						for(var s=0;s<searchObj.length;s++){
							if(
								searchObj[s].split("=")[1] &&
								searchObj[s].split("=")[1].length>0
								) {
								searchString+= 
									(searchObj[s].split("=")[0] == "geo-location" || searchObj[s].split("=")[0] == "latlong") ?
										"/"+ searchObj[s].split("=")[0] + "/" + searchObj[s].split("=")[1] : 
										"/" + searchObj[s].split("=")[1];
							}
						}
						$window.location.href = $location.absUrl().substring(0,q) + "#/mapfeed/" + searchString.substring(1);
					}
					break;
				case "mapfeed.latlong":
					var q=$location.absUrl().indexOf("?");
					if(q!=-1){
						var searchString="", searchObj=$window.location.search.substring(1).split("&");
						for(var s=0;s<searchObj.length;s++){
							if(searchObj[s].split("=")[0]=="latlong") {
								var ll=leafletService.processLL(searchObj[s].split("=")[1])
								searchString="/latlong/"+ ll.lat +"," + ll.lon;
							}
						}
						$window.location.href = $location.absUrl().substring(0,q) + "#/mapfeed" + searchString;
					}
					break;
				case "svg":
					console.log("state is svg inside switch ");
					break;
			}
		});
		$rootScope.$on('$stateChangeSuccess', 
		function(event, toState, toParams, fromState, fromParams){
			console.log("CURRENT STATE IS " + toState.name);
			switch(toState.name){
				case "video":
					break;
				case "videofeed.videofeed.index":
				console.log("everything is right");
					var q=$location.absUrl().indexOf("?");
					if(q!=-1){
						var cutString=$location.absUrl().substr(q),
						_start=cutString.indexOf("=")+1,_end=cutString.indexOf("#");
						$window.location.href = $location.absUrl().substring(0,q) + "#/videofeed/" + cutString.substring(_start,_end) + "/0";
					}else{
						YouTubeSearchService.currentVideo=toParams.idx;
						YouTubeService.startMedia(YouTubeSearchService.videos[YouTubeSearchService.currentVideo].id,YouTubeService);
					}

					break;
				case "mapfeed":
					break;
				case "home":
					break;
				case "svg":
					break;
				case "svg.detail":
					console.log("svg.detail  inside switch ");
					svgD3Data.mapWBStats($stateParams.detail)
					// 
					break;
			}
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
					templateUrl: 'components/main/main.html',				controller: 'ThreeCSSController'
				},
				"axis3":{
					templateUrl: 'components/context/context.html',			controller: 'ThreeContextController'
				},
				"pageBottom":{
					templateUrl: 'components/footer/footer.html',			controller: 'ThreeFooterController'
				}
			}
		  })
		  .state('video', {
			url: '/video',
			views:{
				"axis2":{
					templateUrl: 'components/youtube/youtube.html',			controller: 'ThreeYouTubeController'
				},
				"axis3":{
 					templateUrl: 'components/context/context.html',			controller: 'ThreeContextController'
				},
				"pageBottom":{
					templateUrl: 'components/footer/footer.html',			controller: 'ThreeFooterController'
				}
			}
		  })
		  .state('videofeed', {
			url: '/videofeed',
			views:{
				"axis2":{
					templateUrl: 'components/youtube/youtube_search.html',	controller: 'YouTubeSearchController'
				},
				"axis3":{
					templateUrl: 'components/context/context.html',			controller: 'ThreeContextController'
				},
				"pageBottom":{
					templateUrl: 'components/footer/footer.html',			controller: 'ThreeFooterController'
				}
			}
		  })
		  .state('videofeed.videofeed', {
			url: '/:videofeed',
			views:{
				"axis2":{
					templateUrl: 'components/youtube/youtube.html',			controller: 'ThreeYouTubeController'
				},
				"axis3":{
					templateUrl: 'components/context/context.html',			controller: 'ThreeContextController'
				},
				"pageBottom":{
					templateUrl: 'components/footer/footer.html',			controller: 'ThreeFooterController'
				}
			}
		  })
		  .state('videofeed.videofeed.index', {
			url: '/:idx',
			views:{
				"axis2":{
					templateUrl: 'components/youtube/youtube.html',			controller: 'ThreeYouTubeController'
				},
				"axis3":{
					templateUrl: 'components/context/context.html',			controller: 'ThreeContextController'
				},
				"pageBottom":{
					templateUrl: 'components/footer/footer.html',			controller: 'ThreeFooterController'
				}
			}
		  })
		  .state('video.youtubeid', {
			url: '/:youtubeid',
			views:{
				"axis2":{
					templateUrl: 'components/youtube/youtube.html',			controller: 'ThreeYouTubeController'
				},
				"axis3":{
 					templateUrl: 'components/context/context.html',			controller: 'ThreeContextController'
				},
				"pageBottom":{
					templateUrl: 'components/footer/footer.html',			controller: 'ThreeFooterController'
				}
			}
		  })
		  .state('map', {
			url: '/map',
			views:{
				"axis2":{
					templateUrl: 'components/leaflet/leaflet.html',			controller: 'ThreeLeafletController'
				},
				"axis3":{
 					templateUrl: 'components/context/context.html',			controller: 'ThreeContextController'
				},
				"pageBottom":{
					templateUrl: 'components/footer/footer.html',			controller: 'ThreeFooterController'
				}
			}
		  })
		  .state('mapfeed', {
			url: '/mapfeed',
			views:{
				"axis2":{
					templateUrl: 'components/leaflet/leaflet.html',			controller: 'ThreeLeafletController'
				},
				"axis3":{
					templateUrl: 'components/context/context.html',			controller: 'ThreeContextController'
				},
				"pageBottom":{
					templateUrl: 'components/footer/footer.html',			controller: 'ThreeFooterController'
				}
			}
		  })
		  .state('mapfeed.latlong', {
			url: '/latlong/:latlong',
			views:{
				"axis2":{
					templateUrl: 'components/leaflet/leaflet.html',			controller: 'ThreeLeafletController'
				},
				"axis3":{
					templateUrl: 'components/context/context.html',			controller: 'ThreeContextController'
				},
				"pageBottom":{
					templateUrl: 'components/footer/footer.html',			controller: 'ThreeFooterController'
				}
			}
		  })
		  .state('mapfeed.geolocation', {
			url: '/geo-location/:geoLocation',
			views:{
				"axis2":{
					templateUrl: 'components/leaflet/leaflet.html',			controller: 'ThreeLeafletController'
				},
				"axis3":{
					templateUrl: 'components/context/context.html',			controller: 'ThreeContextController'
				},
				"pageBottom":{
					templateUrl: 'components/footer/footer.html',			controller: 'ThreeFooterController'
				}
			}
		  })
		  .state('svg', {
			url: '/svg',
			views:{
				"axis2":{
					templateUrl: 'components/svg/svg.html',					controller: 'ThreeSVGController'
				},
				"axis3":{
 					templateUrl: 'components/context/context.html',			controller: 'ThreeContextController'
				},
				"pageBottom":{
					templateUrl: 'components/footer/footer.html',			controller: 'ThreeFooterController'
				}
			}
		  })
		  .state('svg.detail', {
			url: '/:detail',
			views:{
				"axis2":{
					templateUrl: 'components/svg/svg.html',					controller: 'ThreeSVGController'
				},
				"axis3":{
 					templateUrl: 'components/context/context.html',			controller: 'ThreeContextController'
				},
				"pageBottom":{
					templateUrl: 'components/footer/footer.html',			controller: 'ThreeFooterController'
				}
			}
		  });
      return $stateProvider;
    });

'use strict';

angular.module('bobApp.youtube', ["bobApp"])

	.service("YouTubeService",['$rootScope', "$http", "$q", "$state", "$window",
		 function($rootScope, $http, $q, $state, $window) {
			var _service={
				feedStart:"https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20youtube.search%20where%20query%3D%22",
				feedEnd:"%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=JSON_CALLBACK",
				query:["query","results","video"],
				returnObj:null,
				searchVideos:function(searchTerm){
					fields
				}
			}
			return _service;
		}
	])

	.controller('YouTubeCtrl', ["$rootScope", "$scope", 
		function YouTubeCtrl($rootScope, $scope) {
		// footer
		}
	]);
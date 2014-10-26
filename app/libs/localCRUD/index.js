(function(window, angular, undefined) {'use strict';
	var localCRUD = 
		angular.module('localCRUD', [])
			.service('LocalCRUDService', ['$rootScope', function( $rootScope ) {
			/*
			This simple CRUD service is used for browsers that support the JavaScript
			localStorage object. No attempt is made to support browsers that do not
			provide this built-in functionality. The code can be modified as needed,
			no attribution necessary. There are plenty of places for hooks, such as 
			broadcast events, where UI and other commands may be included. The _canStore
			property and the initStore() and _testLocalStorage() functions determine
			if the CRUD functions are available. The create and update methods can be
			modified to ensure that it is possible to create a localStorage entry before
			it is written. In other words, update is operationally like create here, but
			the business logic provides alternative application paths if needed.
			
			manageLocalCRUD(whatAction, whatObj) is used to access localStorage:
			
			whatAction can be "create", "retrieve", "update" or "delete"
			whatObj can be a String or JavaScript object, depending on whatAction value
			
			For Create and Update, whatObj is an object with a key and value property.
			The key is a string, and the value is any valid JavaScript Object type
			
			create:
				manageLocalCRUD('create', {
					key:"StringName", value:"String Value"})
				OR
				manageLocalCRUD('create', {
					key:"ObjectName", value:{"Property":"Value"}})
			update:
				manageLocalCRUD('update', {
					key:"StringName", value:"String Value"})
				OR
				manageLocalCRUD('update', {
					key:"ObjectName", value:{"Property":"Value"}})
			
			For retrieve and delete, the whatObj value is a string which refers to the 
			String and Object key names from the create and update methods.
			
			retrieve:
				manageLocalCRUD('retrieve', 'StringKeyName')
			delete:
				manageLocalCRUD('delete', 'StringKeyName')
			*/
				var service={
					stringToXML:function(text){
		                if (window.ActiveXObject){
		                  var doc=new ActiveXObject('Microsoft.XMLDOM');
		                  doc.async='false';
		                  doc.loadXML(text);
		                } else {
		                  var parser=new DOMParser();
		                  var doc=parser.parseFromString(text,'text/xml');
		                }
		                return doc;
		            },
					xmlToString:function(xml){
						try{
							var oSerializer = new XMLSerializer();
							var sXML = oSerializer.serializeToString(xml);
							return sXML;
						}catch(oops){
							return xml;
						}
					},
					_canStore:0,
					_testLocalStorage:function(){
						try {
							return 'localStorage' in window && window['localStorage'] !== null;
						} catch (e) {
							return false;
						}
					},
					initStore:function(){
						this._canStore = this._testLocalStorage() ? 1 : -1;
					},
					manageLocalCRUD:function(whatAction, whatObj, hasFunc){
						if(this._canStore<0){
							// Non HTML5 Solutions can be handled here.
						}else{
							var _whatObj={};
							if(hasFunc){
								_whatObj.key=whatObj.key;
								_whatObj.value=this[hasFunc](whatObj.value);
							}else{
								_whatObj=whatObj;								
							}
							switch(whatAction){
								case "create":
									if(localStorage[_whatObj.key]){
										this._update(_whatObj);
									}else{
										this._create(_whatObj);
									}
									break;
								case "retrieve":
									if(localStorage[whatObj]){
										if(hasFunc){
											return(this[hasFunc](this._retrieve(whatObj)));
										}else{
											return(this._retrieve(whatObj));
										}
									}else{
										return null;
									}
									break;
								case "update":
									if(localStorage[_whatObj.key]){
										this._update(_whatObj);
									}else{
										this._create(_whatObj);
									}
									break;
								case "delete":
									if(localStorage[whatObj]){
										this._delete(whatObj);
									}
									break;
							}
						}
					},
					_create:function(what){
						localStorage[what.key]=what.value;
						$rootScope.$broadcast( 'localCRUD.create' );
					},
					_retrieve:function(what){
						var retrieved;
						$rootScope.$broadcast( 'localCRUD.retrieve' );
						try{retrieved=JSON.parse(localStorage[what]);}catch(oops){retrieved=localStorage[what];}
						return(retrieved);
					},
					_update:function(what){
						localStorage[what.key]=what.value; // typeof(what.value)=="string" ? what.value : JSON.stringify(what.value);
						$rootScope.$broadcast( 'localCRUD.update' );
					},
					_delete:function(what){
						localStorage.removeItem(what);
						$rootScope.$broadcast( 'localCRUD.delete' );
					}
				}
				service.initStore();
				return service;
			}])
			.controller("LocalCRUDCtrl",
				['$scope','LocalCRUDService',
					function LocalCRUDCtrl($scope, LocalCRUDService){
						var _isNull=!(LocalCRUDService.manageLocalCRUD("retrieve", "crudStub"));
						$rootScope.$on('localCRUD.create', function(event){
							console.log('localCRUD.created');
						});
						$rootScope.$on('localCRUD.retrieve', function(event){
							console.log('localCRUD.retrieved');
						});
						$rootScope.$on('localCRUD.update', function(event){
							console.log('localCRUD.updated');
						});
						$rootScope.$on('localCRUD.delete', function(event){
							console.log('localCRUD.deleted');
						});
						if(_isNull){
							LocalCRUDService.manageLocalCRUD('create', {
								key:"crudStub",
								value:{"toString":"Base CRUD Object"}
							})
						}
						$scope.crudStub=LocalCRUDService.manageLocalCRUD("retrieve", "crudStub");
					}
				]
			);
		
})(window, window.angular);
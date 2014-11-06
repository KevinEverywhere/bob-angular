'use strict';

var threeModule = angular.module('threeModule', [])
	.service('threeCSSService', ["$window", "$rootScope", "$http", "$state",
		function threeCSSService($window, $rootScope, $http, $state) {
			var service={
				isInitted:false,
				childObjects:[],
				"globalPositioning":{
					"position":{
						x:0,
						y:0,
						z:0
					},
					"rotation":{
						x:0,
						y:0,
						z:0
					}
				},
				setGPS:function(toWhat){
					if (toWhat.position) {
						for(var o in toWhat.position){
							this.globalPositioning.position[o]=toWhat.position[o];
						}
					};
					if(toWhat.rotation) {
						for(var o in toWhat.rotation){
							this.globalPositioning.rotation[o]=toWhat.rotation[o];
						}
					};
				},
				getGPS:function(){
					var obj={position:{},rotation:{}};
					for(var o in this.globalPositioning.position){
						obj.position[o]=this.globalPositioning.position[o];
					}
					for(var o in this.globalPositioning.rotation){
						obj.rotation[o]=this.globalPositioning.rotation[o];
					}
					return obj;
				},
				updateAllSizes:function(){
					for(var z in this.childObjects){
						console.log("updateAllSizes." + z);
					//	this.childObjects[z].updateSize();
					}
				},
				init:function(_elem, scope, _content){
					scope.elem = document.getElementById(_elem);
                    scope._name="#" + _elem + " > ." + _content;
                    service.childObjects[scope._name]=scope;
					scope.updateSize=function(){
	                    scope._width=parseInt(window.getComputedStyle(scope.elem).width);
	                    scope._height=parseInt(window.getComputedStyle(scope.elem).height);
						scope.renderer.setSize( scope._width, scope._height);
					}
					scope.scene = new THREE.Scene();
					scope.camera = new THREE.PerspectiveCamera( 75, scope._width/scope._height, 0.1, 2000 );
					scope.renderer = new THREE.CSS3DRenderer();
					scope.updateSize();
					scope.renderer.domElement.className="boundInterior";
					scope.elem.appendChild( scope.renderer.domElement );
					scope.contentElement = $(scope._name)[0];
					scope.css3DObject = new THREE.CSS3DObject( scope.contentElement );
					scope.targetPosRot=null;
					scope.currentPosRot=null;
					scope.animation=null;
					scope.addActiveAnimation=function(animName, animParams){
						scope.activeAnimations[animName]=animName;
						if(animParams) {scope.activeParams[animName]=animParams;}
					}
					scope.removeActiveAnimation=function(which){
						scope.activeAnimations[which]=null;
					}
					scope.doActiveAnimations=function(){
						if(scope.activeAnimations &&  scope.activeAnimations.length>0){
							for(var anim=0;anim< scope.activeAnimations.length;anim++){
								try{
									scope[scope.activeAnimations[anim]](scope.activeParams[activeAnimations[anim]]);
								}catch(oops){
									scope[scope.activeAnimations[anim]]();
								}
							}
						}
					}

					scope.startAnimation=function(obj){
						scope.doActiveAnimations();
						scope.animation=requestAnimationFrame(scope.startAnimation);
					}
					scope.stopAnimation=function(obj){
						$window.cancelAnimationFrame(scope.animation);
						scope.activeFunction=null;
					}
					scope.rotateTo=function(obj){
						for(var zz in obj){
							scope.css3DObject.rotation[zz]=obj[zz];
						}
					}
					scope.move=function(obj){
						for(var zz in obj){
							scope.css3DObject.position[zz]=scope.css3DObject.orig.position[zz]+obj[zz];
						}
					}
					scope.rotate=function(obj){
						for(var zz in obj){
							scope.css3DObject.rotation[zz]=scope.css3DObject.orig.rotation[zz]+obj[zz];
						}
					}
					scope.reset=function(which, override){
						if(!scope.css3DObject.orig){scope.css3DObject.orig={}};
						if(!scope.css3DObject.orig[which]){
							scope.css3DObject.orig[which]={x:0,y:0,z:0}
						}else{
							if(override){
								scope.css3DObject.rotation=scope.css3DObject.orig.rotation;
								scope.css3DObject.position=scope.css3DObject.orig.position;
							}
						}
					}
					scope.setTargetPosRot=function(toWhat){
						for(var _var in toWhat) {
							scope.targetPosRot[_var]=toWhat[_var];
						}
					}
					scope.radianCalculator=function(degrees){
						return(degrees * Math.PI/180);
					}
					scope.setCurrentPosRot=function(toWhat){
						scope.move(toWhat.position);
						scope.rotateTo(toWhat.rotation);
					}
					scope.getCurrentPosRot=function(){
						return {
							position:scope.css3DObject.position,
							rotation:scope.css3DObject.rotation
						}
					}
					scope.startTimer=function(actionToTake, timeToTake, interval){
						var me=this;
						this.toObject=setTimeout(function(){
							me.testTimer(actionToTake, timeToTake, interval)
							}, interval)
						this.timer=new Date();
					}
					this.mapScopeObject(scope);
				},
				mapScopeObject:function(whichScope){
					whichScope.css3DObject.orig={position:{},rotation:{}}
					if(whichScope._position){
						for(var o in whichScope._position){
							whichScope.css3DObject.orig.position[o]=whichScope._position[o];
						}
					}
					if(whichScope._rotation){
						for(var o in whichScope._rotation){
							whichScope.css3DObject.orig.rotation[o]=whichScope._rotation[o];
						}
					}
					whichScope.css3DObject.position.x = 
						whichScope.css3DObject.orig.position.x ?
						whichScope.css3DObject.orig.position.x : (whichScope._width/2);
					whichScope.css3DObject.position.y = 
						whichScope.css3DObject.orig.position.y ?
						whichScope.css3DObject.orig.position.y : (whichScope._height/2);
					whichScope.css3DObject.position.z = 
						whichScope.css3DObject.orig.position.z ?
						whichScope.css3DObject.orig.position.z : 0;
					whichScope.css3DObject.rotation.x = 
						whichScope.css3DObject.orig.rotation.x ?
						whichScope.css3DObject.orig.rotation.x : 0;
					whichScope.css3DObject.rotation.y = 
						whichScope.css3DObject.orig.rotation.y ?
						whichScope.css3DObject.orig.rotation.y : this.radianCalculator(180);
					whichScope.css3DObject.rotation.z = 
						whichScope.css3DObject.orig.rotation.z ?
						whichScope.css3DObject.orig.rotation.z : this.radianCalculator(180);
					whichScope.scene.add( whichScope.css3DObject );
					whichScope.camera.lookAt(whichScope.css3DObject);
				},
				resetCamAndObjects:function(){
					scope.camera.lookAt(object);
				},
				radianCalculator:function(degrees){
					return(degrees * Math.PI/180);
				},
				render:function(scope){
					scope.startAnimation();
				}
			}
			if(!service.isInitted){
		        $window.hardcoded=function(){
		        	console.log("window.hardcoded=window.hardcoded=window.hardcoded=window.hardcoded")
		        	service.updateAllSizes();
		        };
		        service.isInitted=true;
			}
			return service;
		}
	]);
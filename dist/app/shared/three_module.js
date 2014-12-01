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
						y:Math.PI,
						z:Math.PI
					}
				},
				radianCalculator:function(degrees){
					return(degrees * Math.PI/180);
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
					console.log("updateAllSizes CALLED.");
					for(var z in this.childObjects){
						this.childObjects[z].rerender();
					}
				},
				init:function(_elem, scope, _content){
					scope._service=this;
					scope.elem = document.getElementById(_elem);
					scope._content=_content;
                    scope._name="#" + _elem + " > ." + _content;
                    service.childObjects[scope._name]=scope;
					scope.addActiveAnimation=function(animName, animParams){
						this.activeAnimations[animName]=animName;
						if(animParams) {this.activeParams[animName]=animParams;}
					}
					scope.removeActiveAnimation=function(which){
						this.activeAnimations[which]=null;
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
					scope.rerender=function(){
						scope.isInited=false;
						scope._service.postinit(scope);
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
					scope.updateSize=function(){
						this.renderer.setSize( this._width, this._height);
						console.log("updateSize=" + this._width + " and " + this._height);
					}
					scope.scene = new THREE.Scene();
					scope.renderer = new THREE.CSS3DRenderer();
					scope.renderer.domElement.className="boundInterior";
					scope.childElem=scope.renderer.domElement;
					scope.elem.appendChild(scope.childElem);
					scope.contentElement = $(scope._name)[0];
					scope.targetPosRot=null;
					scope.currentPosRot=null;
					scope.animation=null;
                    scope._width=parseInt($window.getComputedStyle(scope.elem).width);
                    scope._height=parseInt($window.getComputedStyle(scope.elem).height);
					scope.updateSize();
					scope.css3DObject = new THREE.CSS3DObject( scope.contentElement );
					scope.scene.add( scope.css3DObject );
                    service.postinit(scope, true);
					service.mapScopeObject(scope, true);
				},
				postinit:function(scope, init){
					if(!init){
	                    scope._width=parseInt($window.getComputedStyle(scope.elem).width);
	                    scope._height=parseInt($window.getComputedStyle(scope.elem).height);
					}
				},
				initObjectPosition:function(whichScope){
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
				},
				mapScopeObject:function(whichScope, init){
					if(init){
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
						whichScope.camera = new THREE.PerspectiveCamera( 75, whichScope._width/whichScope._height, 0.1, 2000 );
					}
					service.initObjectPosition(whichScope);
					whichScope.updateSize();
					whichScope.camera.updateProjectionMatrix();
					whichScope.camera.lookAt(whichScope.css3DObject);
				},
				resetCamAndObjects:function(){
					scope.camera.lookAt(object);
				},
				render:function(scope){
					scope.startAnimation();
				}
			}
			if(!service.isInitted){
		        $window.hardcoded=function(){
		        //	service.updateAllSizes();
		        };
		        service.isInitted=true;
			}
			return service;
		}
	]);
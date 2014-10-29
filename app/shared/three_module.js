'use strict';

var threeModule = angular.module('threeModule', [])
	.service('threeSphereService', ["$window", "$rootScope", "$http", "$state",
		function threeSphereService($window, $rootScope, $http, $state) {
			var service={
				init:function(_elem, scope, _content){
					console.log(_elem+ "  and " + scope + " and finally " + _content)
					var elem = document.getElementById(_elem), _name="#" + _elem + " > ." + _content;
                    scope._width=parseInt(window.getComputedStyle(elem).width);
                    scope._height=parseInt(window.getComputedStyle(elem).height);
					scope.scene = new THREE.Scene();
					scope.camera = new THREE.PerspectiveCamera( 75, scope._width/scope._height, 0.1, 2000 );
					scope.renderer = new THREE.WebGLRenderer();
					scope.renderer.setSize( scope._width, scope._height);
					scope.renderer.domElement.className="boundInterior";
					elem.appendChild( scope.renderer.domElement );
					scope.contentElement = $(_name)[0];
					console.log("scope.w+h=" + scope._width + " and " + scope._height);
					scope.sphere3DObject = new THREE.Mesh(
					  new THREE.SphereGeometry(0.503, 32, 32),
					  new THREE.MeshPhongMaterial({
//					    map: THREE.ImageUtils.loadTexture('images/fair_clouds_4k.png'),
					    map: THREE.ImageUtils.loadTexture('assets/media/groupedWorld.svg'),
					    transparent: true
					  })
					);
					// new THREE.CSS3DObject( scope.contentElement );
					scope.targetPosRot=null;
					scope.currentPosRot=null;
					scope.animation=null;

					scope.doActiveAnimations=function(){
						console.log("doActiveAnimations=" + scope.activeAnimations);
						if(scope.activeAnimations &&  scope.activeAnimations.length>0){
						console.log("doActiveAnimations=" + scope.name);
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
					}
					scope.stopAnimation=function(obj){
			//			$window.cancelAnimationFrame(scope.animation);
						scope.activeFunction=null;
					}
					scope.rotateTo=function(obj){
						for(var zz in obj){
							scope.sphere3DObject.rotation[zz]=obj[zz];
						}
					}
					scope.move=function(obj){
						for(var zz in obj){
							scope.sphere3DObject.position[zz]=scope.css3DObject.orig.position[zz]+obj[zz];
						}
					}
					scope.rotate=function(obj){
						for(var zz in obj){
							scope.css3DObject.rotation[zz]=scope.css3DObject.orig.rotation[zz]+obj[zz];
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
							position:scope.sphere3DObject.position,
							rotation:scope.sphere3DObject.rotation
						}
					}
					scope.startTimer=function(actionToTake, timeToTake, interval){
						var me=this;
						this.toObject=setTimeout(function(){
							me.testTimer(actionToTake, timeToTake, interval)
							}, interval)
						this.timer=new Date();
					}
					/*
					*/
					console.log("FAR SIDE OF _name=" + _name);
					this.mapScopeObject(scope);
				},
				mapScopeObject:function(whichScope){
					whichScope.sphere3DObject.orig={position:{},rotation:{}}
					if(whichScope._position){
						for(var o in whichScope._position){
							whichScope.sphere3DObject.orig.position[o]=whichScope._position[o];
						}
					}
					if(whichScope._rotation){
						for(var o in whichScope._rotation){
							whichScope.sphere3DObject.orig.rotation[o]=whichScope._rotation[o];
						}
					}
					whichScope.sphere3DObject.position.x = 
						whichScope.sphere3DObject.orig.position.x ?
						whichScope.sphere3DObject.orig.position.x : (whichScope._width/2);
					whichScope.sphere3DObject.position.y = 
						whichScope.sphere3DObject.orig.position.y ?
						whichScope.sphere3DObject.orig.position.y : (whichScope._height/2);
					whichScope.sphere3DObject.position.z = 
						whichScope.sphere3DObject.orig.position.z ?
						whichScope.sphere3DObject.orig.position.z : 0;
					whichScope.sphere3DObject.rotation.x = 
						whichScope.sphere3DObject.orig.rotation.x ?
						whichScope.sphere3DObject.orig.rotation.x : 0;
					whichScope.sphere3DObject.rotation.y = 
						whichScope.sphere3DObject.orig.rotation.y ?
						whichScope.sphere3DObject.orig.rotation.y : this.radianCalculator(180);
					whichScope.sphere3DObject.rotation.z = 
						whichScope.sphere3DObject.orig.rotation.z ?
						whichScope.sphere3DObject.orig.rotation.z : this.radianCalculator(180);
					whichScope.scene.add( whichScope.sphere3DObject );
					whichScope.camera.lookAt(whichScope.sphere3DObject);
				},
				resetCamAndObjects:function(){
					scope.camera.lookAt(object);
				},
				radianCalculator:function(degrees){
					return(degrees * Math.PI/180);
				},
				render:function(scope){
					scope.doActiveAnimations(scope.activeParams);
				}
			}
			return service;
		}
	])

	.service('threeCSSService', ["$window", "$rootScope", "$http", "$state",
		function threeCSSService($window, $rootScope, $http, $state) {
			var service={
				init:function(_elem, scope, _content){
					var elem = document.getElementById(_elem), _name="#" + _elem + " > ." + _content;
                    scope._width=parseInt(window.getComputedStyle(elem).width);
                    scope._height=parseInt(window.getComputedStyle(elem).height);
					scope.scene = new THREE.Scene();
					scope.camera = new THREE.PerspectiveCamera( 75, scope._width/scope._height, 0.1, 2000 );
					scope.renderer = new THREE.CSS3DRenderer();
					scope.renderer.setSize( scope._width, scope._height);
					scope.renderer.domElement.className="boundInterior";
					elem.appendChild( scope.renderer.domElement );
					scope.contentElement = $(_name)[0];
					console.log("threeCSSService.init=" + _elem+ "  and " + scope + " and " + _content + " and w+h=" + scope._width + " and " + scope._height);
					scope.css3DObject = new THREE.CSS3DObject( scope.contentElement );
					scope.targetPosRot=null;
					scope.currentPosRot=null;
					scope.animation=null;

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
					/*
					*/
					console.log("FAR SIDE OF _name=" + _name);
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
			return service;
		}
	]);
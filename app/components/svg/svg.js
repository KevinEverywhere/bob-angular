'use strict';

angular.module('bobApp.svg', ["bobApp", "threeModule", "ngRoute", "ui.router"])
	.controller('ThreeSVGController', ["$window", "$scope", "$rootScope", "$state", "$stateParams", "LocalCRUDService", "threeCSSService", "threeSphereService", 
		function ThreeSVGController($window, $scope, $rootScope, $state, $stateParams, LocalCRUDService, threeCSSService, threeSphereService) {
			/*
				var d3World=D3Service, countryURL="assets/js/world.json";
				if(LocalCRUDService.manageLocalCRUD('retrieve', 'd3Data')){
					d3World.d3Data=LocalCRUDService.manageLocalCRUD('retrieve', 'd3Data');
					d3World.init(d3World.defaultSVGWidth,d3World.defaultSVGHeight,"#worldDiv", "assets/media/groupedWorld.svg");
				}else{
					var _LocalCRUDService=LocalCRUDService;
					d3World.d3Data=null; 
					d3.json(countryURL,function(err, d){
						if(!err){
							d3World.d3Data=d;
							_LocalCRUDService.manageLocalCRUD("create",{"key":"d3Data","value":d});
							d3World.init(d3World.defaultSVGWidth,d3World.defaultSVGHeight,"#worldDiv", "assets/media/groupedWorld.svg");
						}
					});
				}

				var width  = window.innerWidth,
					height = window.innerHeight;

				// Earth params
				var radius   = 0.5,
					segments = 32,
					rotation = 6;  

				var scene = new THREE.Scene();

				var camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 1000);
				camera.position.z = 1.5;

				var renderer = new THREE.WebGLRenderer();
				renderer.setSize(width, height);

				scene.add(new THREE.AmbientLight(0x999999));

				var light = new THREE.DirectionalLight(0xffffff, 1);
				light.position.set(5,1123,5);
				scene.add(light);
				
			    var sphere = createSphere(radius, segments);
				sphere.rotation.y = rotation; 
				//	scene.add(sphere)

					var svgSphere=createSVGSphere(radius, segments);
					svgSphere.rotation.y = rotation; 
					scene.add(svgSphere)

				//    var clouds = createClouds(radius, segments);
				//	clouds.rotation.y = rotation;
				//	scene.add(clouds)

					var strongLight = new THREE.DirectionalLight(0xffffff, 1);
					strongLight.position.set(-543,5,5);
					scene.add(strongLight);

					var stars = createStars(90, 64);
					scene.add(stars);

					var controls = new THREE.OrbitControls(camera);

					webglEl.appendChild(renderer.domElement);

					render();

					function render() {
						controls.update();
					//	sphere.rotation.y += 0.0005;
					//	clouds.rotation.y += 0.0005;
						svgSphere.rotation.y += 0.0005;
						requestAnimationFrame(render);
						renderer.render(scene, camera);
					}

					

					function createSVGSphere(radius, segments) {
						return new THREE.Mesh(
							new THREE.SphereGeometry(radius, segments, segments),
							new THREE.MeshPhongMaterial({
							map:         THREE.ImageUtils.loadTexture('../app/assets/media/groupedWorld.svg')
							})
						);
					}


					function createSphere(radius, segments) {
						return new THREE.Mesh(
							new THREE.SphereGeometry(radius, segments, segments),
							new THREE.MeshPhongMaterial({
							map:         THREE.ImageUtils.loadTexture('../app/assets/media/groupedWorld.svg')
							})
						);
					}

					function createClouds(radius, segments) {
						return new THREE.Mesh(
							new THREE.SphereGeometry(radius + 0.003, segments, segments),			
							new THREE.MeshPhongMaterial({
								map:         THREE.ImageUtils.loadTexture('images/fair_clouds_4k.png'),
								transparent: true
							})
						);		
					}

					function createStars(radius, segments) {
						return new THREE.Mesh(
							new THREE.SphereGeometry(radius, segments, segments), 
							new THREE.MeshBasicMaterial({
								map:  THREE.ImageUtils.loadTexture('images/galaxy_starfield.png'), 
								side: THREE.BackSide
							})
						);
					}

			*/

		$scope.name='ThreeSVGController';
	
			$scope._position={
				z:100
			};
			$scope._rotation={
				x:0,
				y:threeCSSService.radianCalculator(200),
				z:threeCSSService.radianCalculator(180)
			};
			$scope.activeAnimations=["animate"];
			$scope.activeParams={};
			$scope._dir=-1;
			$scope.incr=.01;
			$scope.currentRotate=199;
			$scope.maxRotate=200;
			$scope.minRotate=160;

			$scope.init=function(elem, _content){
				threeCSSService.init(elem, $scope, _content);
				render();
			}
			$scope.animate=function(){
				$scope.currentRotate+=($scope._dir * $scope.incr);
				if($scope.currentRotate<$scope.maxRotate){
					if($scope.currentRotate<$scope.minRotate){
						$scope._dir=-$scope._dir;
						$scope.currentRotate+=$scope._dir;
					}
				}else{
					$scope._dir=-$scope._dir;
					$scope.currentRotate+=$scope._dir;
				}
				$scope.css3DObject.rotation.y=threeCSSService.radianCalculator($scope.currentRotate)
				$scope.css3DObject.position.z=$scope.css3DObject.position.z + ($scope._dir * $scope.incr * 10);
				$scope.renderer.render($scope.scene, $scope.camera);
			}
			var render=function() {
				$scope.renderer.render($scope.scene, $scope.camera);
				threeCSSService.render($scope);
			}



		}
	])

	.directive('threeSVG', function () {
		var threeObj = {
			restrict: 'AE',
			replace:false,
			scope:true,
			_scope: {
				"id":"@",
				"eventHandler": '&ngClick'
			},
			template: "<div id='worldDiv' data-ng-click='mapClick(this)'></div>"
		};
		return threeObj;
	});


/*


			$scope.name='ThreeSVGController';
			$scope.activeAnimations=["animate"];
			$scope.activeParams=[];
			$scope.count=0;
			$scope.maxCount=100;
			$scope.init=function(elem, _content){
				console.log("elem=" + elem)
				if(!this.isInited){
					threeSphereService.init(elem, $scope, _content);
					this.isInited=true;
					render();
				}
			}
			$scope.animate=function(){
		//		$scope.controls.update();
				$scope.sphere.rotation.y += 0.0005;
				$scope.svgSphere.rotation.y += 0.0005;
			}
			var render=function() {
				console.log("THREECSSfooter.render function");
			//	$window.requestAnimationFrame(render);
				$scope.renderer.render($scope.scene, $scope.camera);
				threeCSSService.render($scope);
			}

*/
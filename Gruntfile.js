"use strict";

module.exports=function(grunt){
	grunt.initConfig({
		pkg:grunt.file.readJSON("package.json"),
		uglify: {
			options: {
				mangle: false
			},
			my_target: {
				files: [{
					expand: true,
					src: [
					'app/assets/js/startup.js',
					'app/libs/css-3d-renderer/index.js', 
					'app/libs/d3/d3.min.js', 
					'app/libs/leaflet/dist/leaflet.js',  
					'app/libs/less/dist/less-1.7.0.min.js', 
					'app/libs/localCRUD/index.js', 
					'app/libs/three.js/index.js',
					'app/libs/ui-router/release/angular-ui-router.min.js', 
					'app/libs/html5-boilerplate/js/vendor/modernizr-2.6.2.min.js',
					'app/libs/TrackballControls/index.js',
					'app/components/footer/footer.js',
					'app/components/main/main.js',
					'app/components/context/context.js',
					'app/components/leaflet/leaflet.js',
					'app/components/youtube/youtube.js',
					'app/components/youtube/youtube_search.js',
					'app/components/svg/svg.js',
					'app/components/navigation/navigation.js',
					'app/shared/d3_module.js',
					'app/shared/three_module.js',
					'app/shared/country_module.js'
					],
					dest: 'dist/'
				}]
			}
		},
		copy: {
		  main: {
		    files: [
		      // flattens results to a single level
		      {expand: true,  src: [ 
					'app/index.html',
					'app/**/*.map',
					'app/libs/jquery/dist/jquery.min.js',
					'app/libs/angular/angular.min.js', 
					'app/libs/angular-route/angular-route.min.js', 
					'app/libs/bootstrap/dist/js/bootstrap.min.js', 
					'app/components/**/*.html',
					'app/libs/leaflet/dist/leaflet.css',
					'app/libs/html5-boilerplate/css/main.css',
					'app/libs/html5-boilerplate/css/normalize.css',
					'app/libs/bootstrap/dist/css/bootstrap.min.css',
					'app/assets/css/main.less',
					'app/libs/3l/3L/3L.less',
					'app/assets/media/*.*',
					'app/app.js' 
		      	], dest: 'dist/'}

		    ],
		  },
		}
	});


	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.registerTask("default", ["uglify", "copy"]);
};


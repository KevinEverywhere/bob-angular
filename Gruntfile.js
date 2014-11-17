module.exports = function(grunt) {
	"use strict";

	grunt.initConfig({
		protractor_webdriver: {
	        options: {
	            keepAlive : true   // True to keep the webdriver alive
	        }
	    },
		watch: {
			files: [
				'app/app.js',
				'app/assets/css/main.less'
			],
			tasks: ['build']
		}
	});
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('build');
	grunt.event.on('watch', function(action, filepath) {
	  grunt.log.writeln(filepath + ' has ' + action);
	});
}
module.exports = function(grunt) {
	"use strict";

	grunt.initConfig({
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
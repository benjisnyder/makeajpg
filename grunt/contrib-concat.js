module.exports = function(grunt) {
	grunt.config('concat', {
		dist: {
			src : ['<%= vars.source %>/lib/kinetic/kinetic.js', '<%= vars.source %>/lib/dropzone/dropzone.js', '<%= vars.source %>/js/app.js', '<%= vars.source %>/js/services.js', '<%= vars.source %>/js/controllers.js', '<%= vars.source %>/js/filters.js', '<%= vars.source %>/js/directives.js'],
			dest: '<%= vars.release %>/js/main.js'
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
};
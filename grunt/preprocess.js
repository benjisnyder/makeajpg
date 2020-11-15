module.exports = function(grunt) {
	grunt.config('preprocess', {
		release : {
			src: '<%= vars.source %>/index.php',
			dest: '<%= vars.release %>/index.php'
		}
	});

	grunt.loadNpmTasks('grunt-preprocess');
};
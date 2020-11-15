module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        vars: {
			source: 'source',
			release: 'release',
			title: 'Dev'
        }
    });

    grunt.loadTasks('grunt');

    grunt.registerTask('default', ['mkdir', 'env:dev', 'sass:dev', 'concat', 'copy']);
    // TODO: uglify all files on release
    grunt.registerTask('release', ['mkdir', 'env:release', 'sass:release', 'concat', 'uglify', 'copy']);
	grunt.registerTask('combine', ['concat']);
    grunt.registerTask('min', ['uglify']);
};
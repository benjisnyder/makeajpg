module.exports = function(grunt) {
	grunt.config('watch', {
		css : {
			files: ['<%= vars.source %>/css/main.scss','<%= vars.source %>/css/light.scss', '<%= vars.source %>/css/partials/*.scss'],
			tasks: ['sass'],
			options: {
				spawn: false
			}
		},
		scripts : {
			files: ['<%= vars.source %>/js/*.js'],
			tasks: ['concat'],
			options: {
				spawn: false,
			},
		},
		html : {
			files: ['<%= vars.source %>/partials/*.html'],
			tasks: ['copy:partials'],
			options: {
				spawn: false,
			},
		},
		index : {
			files: ['<%= vars.source %>/index.php'],
			tasks: ['preprocess'],
			options: {
				spawn: false,
			},
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
};
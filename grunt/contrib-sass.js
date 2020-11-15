module.exports = function(grunt) {
	grunt.config('sass', {
		dev : {
			files : {
				'<%= vars.release %>/css/main.css' : '<%= vars.source %>/css/main.scss',
				'<%= vars.release %>/css/light.css' : '<%= vars.source %>/css/light.scss'
			}
		},
		release : {
			options: {
				style: 'compressed'
			},
			files: {
				'<%= vars.release %>/css/main.css' : '<%= vars.source %>/css/main.scss',
				'<%= vars.release %>/css/light.css' : '<%= vars.source %>/css/light.scss'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
};
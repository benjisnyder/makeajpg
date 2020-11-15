module.exports = function(grunt) {
	grunt.config('copy', {
		release : {
			files : [
				{
					expand : true,
					flatten : true,
					src : ['<%= vars.source %>/images/*'],
					dest : '<%= vars.release %>/images/'
				},
				{
					expand : true,
					cwd : '<%= vars.source %>/lib/',
					src : '**',
					dest : '<%= vars.release %>/lib/'
				},
				{
					cwd : '<%= vars.source %>/',
					src : 'favicon.ico',
					dest : '<%= vars.release %>/',
					expand : true
				},
				{
					cwd : '<%= vars.source %>/',
					src : '.htaccess',
					dest : '<%= vars.release %>/',
					expand : true
				}
				// {
				// 	expand : true,
				// 	cwd : '<%= vars.source %>/vendor/',
				// 	src : '**',
				// 	dest : '<%= vars.release %>/vendor/'
				// }
			]
		},
		partials : {
			files : [
				{
					expand : true,
					flatten : true,
					src: ['<%= vars.source %>/partials/*'],
					dest: '<%= vars.release %>/partials/'
				},
				{
					expand : true,
					flatten : true,
					src: ['<%= vars.source %>/css/fonts/*'],
					dest: '<%= vars.release %>/css/fonts/'
				}
			]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
};
// 包装函数
module.exports = function(grunt) {
	// 任务配置，所有插件的配置信息
	grunt.initConfig({
		// 获取package.json的信息
		pkg: grunt.file.readJSON('package.json'),
		// concat插件的配置信息
		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: 'utils/log.js',
				dest: 'utils/log.cat.js'

			}
		},
		// jshint插件的配置信息
		jshint: {
			files: ['Gruntfile.js', 'routes/*.js', 'models/*.js', 'controllers/*js', 'utils/*.js'],
											 options: {
											 globels: {
											 exports: true
											 }
											 }
		},
		// qunit插件的配置信息
		qunit: {
		    files: ['tests/*.html']
		},
		// uglify插件的配置信息
		uglify: {
			option: {
				stripBanners: true,
				banner: '/*! <%=pkg.name%>-<%-pkg.version%>.js <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'utils/log.js',
				dest: 'utils/log.min.js'
			}
		},
		// watch插件的配置信息
		watch: {
			files: ['<%= jshint.files %>'],
			tasks: ['jshint', 'qunit']
		}
	});
	// 告诉grunt我们将使用插件
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	// 告诉grunt当我们在终端输入grunt时需要做些什么（注意先后顺序）
	grunt.registerTask('default', []);
};

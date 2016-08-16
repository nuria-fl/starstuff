module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				options: {
					compass: true,
					style: 'compressed',
				},
				files: { 
					'public/stylesheets/style.css': 'app/sass/style.scss',
				}
			}
		},
		postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')({
                        browsers: ['last 2 versions']
                    })
                ]
            },
            dist: {
                src: 'public/stylesheets/*.css'
            }
        },
		watch: {
			options: {
				livereload: true
			},
			css: {
				files: '**/*.scss',
				tasks: ['sass', 'postcss:dist']
			}
		},
		uglify: {
			my_target: {
				files: {
					// 'js/master.min.js': ['js/base/base.min.js', 'js/master.js']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['watch']);
};
module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            dist: {
                options: {
                    compass: true,
                    style: 'compressed'
                },
                files: {
                    'css/style.css': 'scss/style.scss'
                }
            }
        },

        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer-core')({ browsers: 'last 2 versions' })
                ]
            },
            dist: {
                src: 'css/style.css'
            }
        },

        watch: {
            css: {
                files: ['scss/*.scss', 'css/style.css'],
                tasks: ['sass', 'postcss'],
                options: {
                    spawn: false
                }
            }
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['sass', 'postcss', 'watch']);

};

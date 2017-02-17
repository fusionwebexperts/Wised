'use strict';
module.exports = function(grunt) {

  grunt.initConfig({

    dirs: {
      js: 'js',
      css: 'css',
      assets: 'assets/',
    },

    watch: {
      options: {
        livereload: 1234,
      },
      js: {
        files: [
          'Gruntfile.js',
          'assets/js/vendor/**/*.js',
          'assets/js/app/**/*.js'
        ],
        tasks: [ 'uglify' ]
      },
      css: {
        files: [
          'assets/sass/**/*.scss',
          'assets/sass/*.scss'
        ],
        tasks: [ 'sass', 'concat', 'cssmin' ]
      }
    },

    // uglify to concat, minify, and make source maps
    uglify: {
      dist: {
        files: {
          'assets/js/scripts.min.js': [
            'assets/js/vendor/**/*.js',
            'assets/js/app/*.js'
          ],
        }
      }
    },

    sass: {
      dist: {
        files: {
          'assets/css/style.css' : 'assets/sass/style.scss'
        }
      }
    },

    concat: {
      dist: {
        files: {
          'assets/css/style.css': [ 
    				'assets/css/_styles.css', // theme header
    				'assets/css/vendor/**/*.css', // js libs
    				'assets/css/style.css' // base
    			]
        }
      }
    },

    cssmin: {
      dist: {
        files: {
          'assets/css/style.min.css': [ 'assets/css/style.css' ]
        }
      }
    },

    cssjanus: {
      theme: {
        options: {
          swapLtrRtlInUrl: false
        },
        files: [
          {
            src: 'style.css',
            dest: 'assets/css/style.min-rtl.css'
          }
        ]
      }
    },

  });

  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );
  grunt.loadNpmTasks( 'grunt-contrib-coffee' );
  grunt.loadNpmTasks( 'grunt-contrib-concat' );
  grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
  grunt.loadNpmTasks( 'grunt-contrib-sass' );
  grunt.loadNpmTasks( 'grunt-cssjanus' );
  grunt.loadNpmTasks( 'grunt-exec' );

  // register task
  grunt.registerTask('default', ['watch']);

  grunt.registerTask( 'build', [
    'uglify', // JS
    'sass', 'concat', 'cssmin', // CSS
    'cssjanus', // RTL
  ]);
};

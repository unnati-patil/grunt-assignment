module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/**/*.js'],
        dest: 'dist/combine.js'
      }
    },
    cssmin: {
      combine: {
        files: {
          'build/combine.min.css': ['src/**/*.css']
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'dist/combine.js',
        dest: 'build/combine.min.js'
      }
    },
    imagemin: {                          // Task
      dynamic: {                         // Another target
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'src/',                   // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: '.'                  // Destination path prefix
        }]
      }
    },
    smoosher: {
      all: {
        options: {
          jsDir: "build/combine.min.js",
          cssDir: "build/combine.min.css"
        },
        files: {
          'build/final.html': 'src/index.html',
        },
      },
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-html-smoosher');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'cssmin', 'uglify', 'imagemin', 'smoosher']);

};
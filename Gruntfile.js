module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      angular: {
        src: ['app/js/**/*.js'],
        dest: 'built.js'
      }
    },
    ngmin: {
      angular: {
        src: 'built.js',
        dest: 'minifiable.js'
      }
    },
    uglify: {
      angular: {
        src: 'minifiable.js',
        dest: 'app/js/app.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-ngmin');
  grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('build', ['concat', 'ngmin', 'uglify']);
};
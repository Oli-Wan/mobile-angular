module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      task: {
        src: ['app/js/**/*.js'],
        dest: 'temp/built.js'
      }
    },
    ngmin: {
      task: {
        src: 'temp/built.js',
        dest: 'temp/minifiable.js'
      }
    },
    uglify: {
      task: {
        src: 'temp/minifiable.js',
        dest: 'app/app.min.js'
      }
    },
    clean: ['temp/']
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-ngmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('build', ['concat', 'ngmin', 'uglify', 'clean']);
};
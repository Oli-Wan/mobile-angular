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
    clean: ['temp/'],
    manifest: {
      generate: {
        options: {
          basePath: 'app/',
          network: ['*'],          
          verbose: true,
          timestamp: true
        },
        src: ['**/*.min.js', '**/*.css', '**/*.png', '**/*.gif', '**/*.html', '**/*.json'],
        dest: 'app/manifest.appcache'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-ngmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-manifest');

  grunt.registerTask('build', ['concat', 'ngmin', 'uglify', 'clean', 'manifest']);
};
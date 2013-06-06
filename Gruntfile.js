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
    },
    wxi_shell: {
      bootstrap: {
        options: {
          cwd: 'app/lib/bootstrap',
          returnOutput: true,
          chained: true,
          exitSuccess: [0, 2]
        },
        commands: ["make", "make bootstrap"]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-ngmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-manifest');
  grunt.loadNpmTasks('grunt-wxi-shell');

  grunt.registerTask('build', ['concat', 'ngmin', 'uglify', 'manifest', 'clean', 'wxi_shell:bootstrap']);
};
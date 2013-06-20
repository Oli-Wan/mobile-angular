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
          cache: [
          "lib/jquery/jquery.min.js",
          "lib/angular-unstable/angular.min.js",
          "lib/angular-resource-unstable/angular-resource.min.js",
          "lib/bootstrap-dist/js/bootstrap.min.js",
          "lib/idbwrapper/idbstore.min.js",
          "lib/angular-strap/dist/angular-strap.min.js",
          "lib/screenfull/dist/screenfull.min.js",
          "lib/socket.io-client/dist/socket.io.min.js",
          "lib/hammerjs/dist/hammer.min.js",
          "lib/angular-gestures/gestures.min.js",
          "lib/bootstrap-dist/css/bootstrap.css",
          "lib/bootstrap-dist/css/bootstrap-responsive.css",
          "lib/bootstrap-dist/img/glyphicons-halflings-white.png",
          "lib/bootstrap-dist/img/glyphicons-halflings.png"
          ],
          network: ['*'],
          verbose: true,
          timestamp: true
        },
        src: ['**/*.min.js', '**/*.png', '**/*.gif', '**/*.html', '**/*.json', '!**/lib/**'],
        dest: 'app/manifest.appcache'
      }
    }
  });

grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-ngmin');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-manifest');

grunt.registerTask('build', ['concat', 'ngmin', 'uglify', 'manifest', 'clean']);
};
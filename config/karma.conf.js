basePath = '../';

files = [
    JASMINE,
    JASMINE_ADAPTER,
    'app/lib/angular/angular.js',
    'app/lib/angular/angular-*.js',
    'test/lib/angular-mocks.js',
    'test/lib/utils.js',
    "app/lib/jquery/jquery.min.js",
    "app/lib/angular-unstable/angular.min.js",
    "app/lib/angular-resource-unstable/angular-resource.min.js",
    "app/lib/bootstrap-dist/js/bootstrap.min.js",
    "app/lib/idbwrapper/idbstore.min.js",
    "app/lib/angular-strap/dist/angular-strap.min.js",
    "app/lib/screenfull/dist/screenfull.min.js",
    "app/lib/socket.io-client/dist/socket.io.min.js",
    "app/lib/hammerjs/dist/hammer.min.js",
    "app/lib/angular-gestures/gestures.min.js",
    'app/js/**/*.js',
    'test/unit/**/*.js'
];

autoWatch = true;

browsers = ['Firefox'];

junitReporter = {
    outputFile: 'test_out/unit.xml',
    suite: 'unit'
};

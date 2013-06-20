angular.module('mobileAngular').run(function ($rootScope, $location, DeviceType) {

    if (DeviceType == "desktop" || !screenfull.enabled)
        $rootScope.fullscreen = true;
    else {
        screenfull.onchange = function () {
            $rootScope.fullscreen = screenfull.isFullscreen;
            $rootScope.$apply('fullscreen');
        };
    }

    $rootScope.$on('$routeChangeStart', function (event, next) {
        console.log("route change");
        var nextTemplate = next.templateUrl;
        var launcherUrl = '/partials/launch.html';
        if (!$rootScope.fullscreen && nextTemplate != launcherUrl) {
            $location.path("/launch")
        } else if ($rootScope.fullscreen && (nextTemplate == launcherUrl)) {
            $location.path("/");
        }
    });
});
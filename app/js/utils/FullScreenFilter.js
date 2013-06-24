angular.module('mobileAngular').run(function ($rootScope, $location, DeviceType, FullscreenSetting) {
    var fullscreenDisabled = FullscreenSetting.get() == "false";

    if (DeviceType == "desktop" || !screenfull.enabled || fullscreenDisabled) {
        console.log('Disabled');
        $rootScope.fullscreen = true;
    }
    else {
        screenfull.onchange = function () {
            $rootScope.fullscreen = screenfull.isFullscreen;
            $rootScope.$apply('fullscreen');
        };
    }

    $rootScope.$on('$routeChangeStart', function (event, next) {
        var nextTemplate = next.templateUrl;
        var launcherUrl = 'partials/launch.html';
        if (!$rootScope.fullscreen && nextTemplate != launcherUrl) {
            $location.path("/launch")
        } else if ($rootScope.fullscreen && (nextTemplate == launcherUrl)) {
            $location.path("/");
        }
    });
});
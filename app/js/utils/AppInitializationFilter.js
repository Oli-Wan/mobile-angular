angular.module('mobileAngular').run(function ($rootScope, $location) {
    var initTemplate = "partials/init.html";
    $rootScope.boostraped = localStorage.getItem("SMUR_BOOSTRAPED");

    $rootScope.$on('$routeChangeStart', function (event, next) {
        console.log(next.templateUrl);
        if (!$rootScope.boostraped) {
            $location.path("/init")
        } else if (next.templateUrl == initTemplate) {
            $location.path("/");
        }
    });
});

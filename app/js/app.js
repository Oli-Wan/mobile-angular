'use strict';


// Declare app level module which depends on filters, and services
var smurAngular = angular.module('smurAngular', ['ngResource', '$strap.directives']);

smurAngular.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', 
    {
      templateUrl: 'partials/missions.html', 
      controller: 'MissionsController'
  });
    $routeProvider.when('/mission/new', 
    {
        templateUrl: 'partials/missions/new.html', 
        controller: 'NewMissionController'
    });
    $routeProvider.when('/mission/:missionId', 
    {
      templateUrl: 'partials/mission-container.html', 
      controller: 'MissionContainerController',
      reloadOnSearch: false
    });
        $routeProvider.when('/mission/:missionId/events/new', 
    {
      templateUrl: 'partials/mission/events/new.html', 
      controller: 'NewEventController'
    });

    $routeProvider.otherwise({redirectTo: '/'});
}]);

//default for datepicker
smurAngular.value('$strap.config', {
    datepicker: {
        format: 'dd/mm/yyyy'
    }
});

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
    templateUrl: 'partials/mission/events/form.html', 
    controller: 'EditEventController'
  });
  $routeProvider.when('/mission/:missionId/event/:eventId/edit', 
  {
    templateUrl: 'partials/mission/events/form.html', 
    controller: 'EditEventController'
  });

  $routeProvider.when('/mission/:missionId/staff/new', 
  {
    templateUrl: 'partials/mission/staff/new.html', 
    controller: 'NewStaffController'
  });
  $routeProvider.when('/mission/:missionId/vehicle/new', 
  {
    templateUrl: 'partials/mission/vehicles/new.html', 
    controller: 'NewVehicleController'
  });
  $routeProvider.when('/idbmanagement', 
  {
    templateUrl: 'partials/misc/dbManagement.html', 
    controller: 'IDBManagementController'
  });
  $routeProvider.otherwise({redirectTo: '/'});
}]);

//default for datepicker
smurAngular.value('$strap.config', {
  datepicker: {
    format: 'dd/mm/yyyy'
  }
});

smurAngular.run(function($rootScope, $window){
  $rootScope.scrollX = $window.scrollX;
  angular.element($window).bind('scroll',function(){
    $rootScope.scrollX = $window.scrollX;
    $rootScope.$apply('scrollX');
  });
});
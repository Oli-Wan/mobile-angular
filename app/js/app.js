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
  $routeProvider.when('/storagemanagement', 
  {
    templateUrl: 'partials/misc/storage-management.html', 
    controller: 'StorageManagementController'
  });
  $routeProvider.when('/accelerometer', 
  {
    templateUrl: 'partials/misc/accelerometer.html', 
    controller: 'AccelerometerController'
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

smurAngular.run(function($rootScope, $window){
  angular.element($window).bind('deviceorientation', function(data){
    $rootScope.orientationData = data;
    $rootScope.$apply('orientationData');
  });
});
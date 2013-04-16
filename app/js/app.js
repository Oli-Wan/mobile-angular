'use strict';


// Declare app level module which depends on filters, and services
var smurAngular = angular.module('smurAngular', ['ngResource', '$strap.directives']);

smurAngular.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', 
    	{
    		templateUrl: 'partials/missions.html', 
    		controller: 'MissionsController'
    	});
    $routeProvider.when('/mission/:missionId', 
    	{
    		templateUrl: 'partials/mission-container.html', 
			controller: 'MissionController'
    	});
    $routeProvider.otherwise({redirectTo: '/'});
  }]);

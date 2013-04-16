
smurAngular.controller("MissionController", 
		function MissionController($scope, $routeParams, Mission){
			$scope.mission = Mission.get($routeParams.missionId);
		});
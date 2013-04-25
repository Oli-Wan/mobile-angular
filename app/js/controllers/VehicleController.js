
smurAngular.controller("VehicleController", 
	function VehicleController($scope, $routeParams, $location, Mission) {
		$scope.mission = Mission.get($routeParams.missionId);
	});
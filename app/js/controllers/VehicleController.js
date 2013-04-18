
smurAngular.controller("VehicleController", 
	function VehicleController($scope, $routeParams, $location, Mission) {
		$scope.mission = Mission.get($routeParams.missionId);
		
		$scope.goToNewVehicle = function() {
			$location.url("/mission/"+$scope.mission.id+"/vehicles/new");
		}

	});

smurAngular.controller("VehicleController", 
	function VehicleController($scope, $routeParams, $location, Mission) {		
		Mission.store.get(parseInt($routeParams.missionId), function(data) {
			$scope.mission = data;
			$scope.$apply();
		});

		$scope.goToNewVehicle = function() {
			$location.url("/mission/"+$scope.mission.id+"/vehicles/new");
		}

	});
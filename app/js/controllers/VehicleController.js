
smurAngular.controller("VehicleController", 
	function VehicleController($scope, $routeParams, $location, Mission, Vehicle) {		
		Mission.getStore().then(function(store){
			store.get(parseInt($routeParams.missionId), function(data) {
				$scope.mission = data;
				$scope.$apply();
			});
		});

		$scope.goToNewVehicle = function() {
			$location.url("/mission/"+$scope.mission.id+"/vehicles/new");
		};

		$scope.refreshVehicles = function() {
			if($scope.mission.vehicles === undefined)
				return;
			
			$scope.vehicles = [];
			$scope.mission.vehicles.forEach(function(element, index, array) {
				Vehicle.getStore().then(function(store){
					store.get(parseInt(element.id), function(data){
						data.time = element.time;
						$scope.vehicles.push(data);
						$scope.$apply();
					});
				});
			});
		};
	});
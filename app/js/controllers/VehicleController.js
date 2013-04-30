
smurAngular.controller("VehicleController", 
	function VehicleController($scope, $routeParams, $window, $location, Mission, Vehicle) {		
		Mission.get(parseInt($routeParams.missionId)).then(function(data) {
			$scope.mission = data;
			$scope.refreshVehicles();
		});

		$scope.goToNewVehicle = function() {
			$location.url("/mission/"+$scope.mission.id+"/vehicle/new");
		};

		$scope.deleteModal = function(element) {
			var confirm = $window.confirm("Êtes vous sûr de vouloir supprimer le véhicule #"+element.name);
			if(confirm) {
				var newVehicles = [];
				$scope.mission.vehicles.forEach(function(element, index, array){
					if(element.id != elementToDelete.id || 
						element.time.date != elementToDelete.time.date ||
						element.time.time != elementToDelete.time.time )
						newVehicles.push(element);
				});
				$scope.mission.vehicles = newVehicles;
				Mission.save($scope.mission).then(function(){
					$scope.refreshVehicles();
				});
			}
		};

		$scope.refreshVehicles = function() {
			if($scope.mission.vehicles === undefined)
				return;

			$scope.vehicles = [];
			$scope.mission.vehicles.forEach(function(element, index, array) {
				Vehicle.get(parseInt(element.id)).then(function(data){
					data.time = element.time;
					$scope.vehicles.push(data);
				});
			});
		};
	});

smurAngular.controller("VehicleController", 
	function VehicleController($scope, $routeParams, $location, $modal, Mission, Vehicle) {		
		Mission.get(parseInt($routeParams.missionId)).then(function(data) {
			$scope.mission = data;
			$scope.refreshVehicles();
		});

		$scope.goToNewVehicle = function() {
			$location.url("/mission/"+$scope.mission.id+"/vehicles/new");
		};

		$scope.delete = function(elementToDelete) {
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
			$scope.dismiss();
		};

		$scope.deleteModal = function(element) {
			$scope.element = element;
			return $modal({
				scope: $scope,
				template: '/partials/misc/deleteConfirmation.html', 
				show: true, 
				backdrop: 'static'
			});
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
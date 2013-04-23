
smurAngular.controller("VehicleController", 
	function VehicleController($scope, $routeParams, $location, $modal, Mission, Vehicle) {		
		Mission.getStore().then(function(store){
			store.get(parseInt($routeParams.missionId), function(data) {
				$scope.mission = data;
				$scope.refreshVehicles();
			});
		});

		$scope.goToNewVehicle = function() {
			$location.url("/mission/"+$scope.mission.id+"/vehicles/new");
		};

		$scope.delete = function(elementToDelete) {
			var newVehicles = [];
			console.log(elementToDelete);
			$scope.mission.vehicles.forEach(function(element, index, array){
				console.log(element)
				if(element.id != elementToDelete.id || 
					element.time.date != elementToDelete.time.date ||
					element.time.time != elementToDelete.time.time )
					newVehicles.push(element);
			});
			$scope.mission.vehicles = newVehicles;
			Mission.getStore().then(function(store){
				store.put($scope.mission, function(){
					$scope.refreshVehicles();
					$scope.$apply();
				});
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
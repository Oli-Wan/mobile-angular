
smurAngular.controller("VehicleController", 
	function VehicleController($scope, $routeParams, $location, $modal, Mission, Vehicle) {		
		Mission.getStore().then(function(store){
			store.get(parseInt($routeParams.missionId), function(data) {
				$scope.mission = data;
				$scope.refreshVehicles();
				$scope.$apply();
			});
		});

		$scope.goToNewVehicle = function() {
			$location.url("/mission/"+$scope.mission.id+"/vehicles/new");
		};

		$scope.delete = function(id) {
			var newVehicles = [];
			$scope.mission.vehicles.forEach(function(element, index, array){
				if(element.id != id)
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

		$scope.deleteModal = function(id) {
			$scope.id = id;
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
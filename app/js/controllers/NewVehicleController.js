
smurAngular.controller("NewVehicleController", 
	function NewVehicleController($scope, $http, $location, $routeParams, Mission, Vehicle, Utils) {
		Mission.getStore().then(function(store){
			store.get(parseInt($routeParams.missionId), function(data) {
				$scope.mission = data;
				$scope.$apply();
			});
		});

		Vehicle.getStore().then(function(store) {
			store.getAll(function(data) {
				$scope.vehicles = data;
				$scope.$apply();
			});
		});
		
		$http.get('/resources/vehicle-types.json').success(function(data){
			$scope.types = data;
			$scope.typeNames = [];
			$scope.types.forEach(function(element, index, array) {
				$scope.typeNames.push(element.name);
			});
		});

		$scope.back = function() {
			$location.url("/mission/"+$scope.mission.id).search({page: "vehicle"});
		};

		$scope.add = function() {
			$scope.vehicle.store = "vehicle";
			$scope.vehicle.time = Utils.getCurrentDateAndTime();

			if($scope.mission.vehicles === undefined)
				$scope.mission.vehicles = [];
			
			$scope.mission.vehicles.push($scope.vehicle);

			Mission.getStore().then(function(store){
				store.put($scope.mission);
			});
			$scope.back();
		};
	});
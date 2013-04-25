
smurAngular.controller("NewVehicleController", 
	function NewVehicleController($scope, $http, $location, $routeParams, Mission, Vehicle, Utils) {
		Mission.get(parseInt($routeParams.missionId)).then(function(data) {
			$scope.mission = data;
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
			Mission.save($scope.mission);
			$scope.back();
		};
	});
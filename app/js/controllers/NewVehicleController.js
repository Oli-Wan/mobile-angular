
smurAngular.controller("NewVehicleController", 
	function NewVehicleController($scope, $http, $location, $routeParams, Mission) {
		Mission.store.get(parseInt($routeParams.missionId), function(data) {
			$scope.mission = data;
			$scope.$apply();
		});
	

		$http.get('/resources/vehicle-types.json').success(function(data){
			$scope.types = data;
			$scope.typeNames = [];
			$scope.types.forEach(function(element, index, array) {
				$scope.typeNames.push(element.name);
			});
		});

		$http.get('/resources/vehicles.json').success(function(data){
			$scope.vehicles = data;
		});


		$scope.back = function() {
			$location.url("/mission/"+$scope.mission.id).search({page: "vehicle"});
		};

		$scope.add = function() {
			$scope.back();
		};
	});
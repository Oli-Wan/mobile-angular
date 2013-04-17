
smurAngular.controller("VehicleController", 
	function VehicleController($scope, $http) {
		$http.get('/resources/vehicle-types.json').success(function(data){
			$scope.types = data;
		});

		$http.get('/resources/vehicles.json').success(function(data){
			$scope.vehicles = data;
		});

		var currentTime = new Date();

		$scope.date = currentTime.getDate()+"/"+currentTime.getMonth()+"/"+currentTime.getFullYear();
		$scope.time = currentTime.getHours()+":"+currentTime.getMinutes();
	});

smurAngular.controller("PersonalController", 
	function PersonalController($scope, $http) {
		$http.get('/resources/functions.json').success(function(data){
			$scope.functions = data;
		});

		$http.get('/resources/persons.json').success(function(data){
			$scope.persons = data;
		});

		var currentTime = new Date();

		$scope.date = currentTime.getDate()+"/"+currentTime.getMonth()+"/"+currentTime.getFullYear();
		$scope.time = currentTime.getHours()+":"+currentTime.getMinutes();
	});
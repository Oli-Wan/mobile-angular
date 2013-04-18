
smurAngular.controller("NewStaffController", 
	function NewStaffController($scope, $http, $location, $routeParams, Mission) {
		$scope.mission = Mission.get($routeParams.missionId);

		$http.get('/resources/functions.json').success(function(data){
			$scope.functions = data;
		});

		$http.get('/resources/persons.json').success(function(data){
			$scope.persons = data;
		});

		var currentTime = new Date();

		$scope.date = currentTime.getDate()+"/"+currentTime.getMonth()+"/"+currentTime.getFullYear();
		$scope.time = currentTime.getHours()+":"+currentTime.getMinutes();

		$scope.back = function() {
			$location.url("/mission/"+$scope.mission.id).search({page: "staff"});
		};

		$scope.add = function() {
			$scope.back();
		};
	});
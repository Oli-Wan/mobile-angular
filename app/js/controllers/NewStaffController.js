
smurAngular.controller("NewStaffController", 
	function NewStaffController($scope, $http, $location, $routeParams, Mission) {
		Mission.store.get(parseInt($routeParams.missionId), function(data) {
			$scope.mission = data;
			$scope.$apply();
		});
	

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
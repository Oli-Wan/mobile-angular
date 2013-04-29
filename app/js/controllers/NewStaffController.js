
smurAngular.controller("NewStaffController", 
	function NewStaffController($scope, $http, $location, $routeParams, Mission, Utils, mobile) {
		$scope.mission = Mission.get($routeParams.missionId);
		$scope.mobile = mobile;
		$scope.date = Utils.getCurrentDateAndTime();

		$http.get('/resources/functions.json').success(function(data){
			$scope.functions = data;
		});

		$http.get('/resources/persons.json').success(function(data){
			$scope.persons = data;
		});
		
		$scope.add = function() {
			$scope.staff.store="staff";
			$scope.mission.staff.push($scope.staff);
		};
	});

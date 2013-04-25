
smurAngular.controller("StaffController", 
	function StaffController($scope, $routeParams, $location, Mission){
		$scope.mission = Mission.get($routeParams.missionId);
	});
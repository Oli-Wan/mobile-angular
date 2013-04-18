
smurAngular.controller("StaffController", 
	function StaffController($scope, $routeParams, $location, Mission){
		$scope.mission = Mission.get($routeParams.missionId);
		
		$scope.goToNewStaff = function() {
			$location.url("/mission/"+$scope.mission.id+"/staff/new");
		}
	});
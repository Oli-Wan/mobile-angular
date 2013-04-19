
smurAngular.controller("StaffController", 
	function StaffController($scope, $routeParams, $location, Mission){
		Mission.store.get(parseInt($routeParams.missionId), function(data) {
			$scope.mission = data;
			$scope.$apply();
		});


		$scope.goToNewStaff = function() {
			$location.url("/mission/"+$scope.mission.id+"/staff/new");
		}
	});
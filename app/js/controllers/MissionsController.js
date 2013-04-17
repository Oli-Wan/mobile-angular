
smurAngular.controller('MissionsController', 
	function MissionsController($scope, Mission, $location){
		$scope.missions = Mission.getAll();

		$scope.delete = function(id) {
			Mission.delete(id);
			$scope.missions = Mission.getAll();
		};

		$scope.navigateTo = function(mission) {
			$location.url("/mission/"+mission.id).search({page: "mission"});
		};

		$scope.goToNewMission = function(){
			$location.url("/mission/new");
		};
	});
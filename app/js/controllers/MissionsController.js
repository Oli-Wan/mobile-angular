
smurAngular.controller('MissionsController', 
	function MissionsController($scope, Mission){
		$scope.missions = Mission.getAll();

		$scope.delete = function(id) {
			Mission.delete(id);
			$scope.missions = Mission.getAll();
		};
	});
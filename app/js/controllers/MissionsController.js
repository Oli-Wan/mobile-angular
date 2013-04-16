
smurAngular.controller('MissionsController', 
	function MissionsController($scope, Mission){
		$scope.missions = Mission.getAll();
	});
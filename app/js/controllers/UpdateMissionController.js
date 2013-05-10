smurAngular.controller("UpdateMissionController", function UpdateMissionController($scope, $window, $routeParams, Mission) {
	if($scope.mission === undefined) {
		console.log("loading");
		Mission.get(parseInt($routeParams.missionId)).then(function(data){
			$scope.mission = data;
		});
	}

	$scope.save = function() {
		Mission.save($scope.mission).then(function() {
			$scope.alerts = [];
			$scope.alerts.push({
				type: "success",
				title: "Succès",
				content: "Mission mise à jour avec succès"
			});
			$window.scrollTo(0,0);
		});
	};
});

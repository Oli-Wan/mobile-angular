smurAngular.controller("UpdateMissionController", function UpdateMissionController($scope, $window, $routeParams, Mission) {
	Mission.get(parseInt($routeParams.missionId), function(data) {
		$scope.mission = data;
	});

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
smurAngular.controller("UpdateMissionController", function UpdateMissionController($scope, $window, $routeParams, Mission) {
	Mission.getStore().then(function(store){
		store.get(parseInt($routeParams.missionId), function(data) {
			$scope.mission = data;
			$scope.$apply();
		});
	});

	$scope.save = function() {
		Mission.getStore().then(function(store){
			store.put($scope.mission, function() {
				$scope.alerts = [];
				$scope.alerts.push({
					type: "success",
					title: "Succès",
					content: "Mission mise à jour avec succès"
				});
				$scope.$apply();
				$window.scrollTo(0,0);
			});
		});
	};
});
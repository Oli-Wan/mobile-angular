
smurAngular.controller('MissionsController', 
	function MissionsController($scope, Mission, $location, $modal, $http){
		$scope.missions = Mission.getAll();

		if($scope.missions.length == 0) {	
			$http.get("/resources/missions.json").success(function(data){
				Mission.setList(data);
				$scope.missions = Mission.getAll();
			});
		}

		$scope.delete = function(id) {
			Mission.delete(id);
			$scope.missions = Mission.getAll();
		};

		$scope.navigateTo = function(mission) {
			$location.url("/mission/"+mission.id).search({page: "mission"});
			/*
			$scope.password = 1234;
			if($scope.password == "1234") {
				$scope.dismiss();
				$location.url("/mission/"+mission.id).search({page: "mission"});
			} else {
				$scope.alerts.push({
					"type": "error",
					"title": "Mauvais mot de passe",
					"content": "Essayez 1234"
				});
			}*/
		};

		$scope.passwordModal = function(mission) {
			$scope.selectedMission = mission
			$scope.alerts = [];
			return $modal({
				scope: $scope,
				template: '/partials/missions/password.html', 
				show: true, 
				backdrop: 'static'
			});
		};
	});

smurAngular.controller('MissionsController', 
	function MissionsController($scope, Mission, $location, $modal, $rootScope, $timeout){
		Mission.getAll().then(function(data){
			$scope.missions = data;
		});

		$scope.delete = function(id) {
			Mission.remove(id).then(function(){
				Mission.getAll().then(function(data){
					$scope.missions = data;
				});
			});
			$scope.dismiss();
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

		$scope.deleteModal = function(id) {
			$scope.element = id;
			return $modal({
				scope: $scope,
				template: '/partials/misc/deleteConfirmation.html', 
				show: true, 
				backdrop: 'static'
			});
		};
	});
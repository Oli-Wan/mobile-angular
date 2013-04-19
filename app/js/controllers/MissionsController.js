
smurAngular.controller('MissionsController', 
	function MissionsController($scope, Mission, $location, $modal, $rootScope, $timeout){
		
		// polling needed due to IDB async behavior
		$timeout(function pollDB() {
			console.log("Checking");
			if(Mission.ready) {
				console.log("Ready!")
				Mission.store.getAll(function(data) {
					console.log(data);
					$scope.missions = data;
					$scope.$apply();	
				}, function(error) {
					console.log("An error occured : "+error);
				});
			} else {
				$timeout(pollDB, 100);
			}
		}, 100);

		$scope.delete = function(id) {
			Mission.store.remove(id, function() {
				Mission.store.getAll(function(data) {
					$scope.missions = data;
					$scope.$apply();
				}, function(error) {
					console.log("An error occured : "+error);
				});
				$scope.dismiss();
			});
		};

		$scope.navigateTo = function(mission) {
			if($scope.password == "1234") {
				$scope.dismiss();
				$location.url("/mission/"+mission.id).search({page: "mission"});
			} else {
				$scope.alerts.push({
					"type": "error",
					"title": "Mauvais mot de passe",
					"content": "Essayez 1234"
				});
			}
		};

		$scope.goToNewMission = function(){
			$location.url("/mission/new");
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
			$scope.id = id;
			return $modal({
				scope: $scope,
				template: '/partials/misc/deleteConfirmation.html', 
				show: true, 
				backdrop: 'static'
			});
		};
	});

smurAngular.controller("EventController", 
	function EventController($scope, $http, $modal, $routeParams, $location, Mission, Event){		
		Mission.getStore().then(function(store){
			store.get(parseInt($routeParams.missionId), function(data) {
				$scope.mission = data;
				$scope.$apply();
			});
		});

		Event.getStore().then(function(store){
			var keyRange = store.makeKeyRange({
				lower: $scope.mission.id,
				upper: $scope.mission.id
			});
			store.query(function(data) {
				console.log(data);
			}, {
				"index":"missionId",
				"keyRange":keyRange
			});
		});

		$scope.goToNewEvent = function() {
			$location.url("/mission/"+$scope.mission.id+"/events/new");
		}
	});
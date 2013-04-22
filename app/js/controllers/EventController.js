
smurAngular.controller("EventController", 
	function EventController($scope, $http, $modal, $routeParams, $location, Mission, Event){		
		Mission.getStore().then(function(store){
			store.get(parseInt($routeParams.missionId), function(data) {
				$scope.mission = data;
				$scope.$apply();
			});
		});

		

		$scope.goToNewEvent = function() {
			$location.url("/mission/"+$scope.mission.id+"/events/new");
		}
	});
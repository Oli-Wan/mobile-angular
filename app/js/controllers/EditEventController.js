smurAngular.controller('EditEventController', 
	function EditEventController($scope, $http, $location, $routeParams, Mission, Event, Vehicle, Utils) {
		Mission.get(parseInt($routeParams.missionId)).then(function(data) {
			$scope.mission = data;
			if($routeParams.eventId) {
				Event.getStore().then(function(eventStore){
					eventStore.get(parseInt($routeParams.eventId), function(data){
						$scope.event = data;
						$scope.$apply();
					});
				});
			} else {
				$scope.event = {};
				$scope.event.start = Utils.getCurrentDateAndTime();
				$scope.event.end  = Utils.getCurrentDateAndTime();
				$scope.event.missionId = $scope.mission.id;
			}
			$scope.$apply();
		});
		
		Vehicle.getStore().then(function(store) {
			store.getAll(function(data) {
				$scope.vehicles = data;
				$scope.$apply();
			});
		});

		$http.get("/resources/event-types.json").success(function(data){
			$scope.types = data;
		});

		$scope.back = function() {
			$location.url("/mission/"+$scope.mission.id).search({page: "event"});
		};

		$scope.save = function() {
			Event.getStore().then(function(store) {
				store.put($scope.event);
			});
			$scope.back();
		};
	});
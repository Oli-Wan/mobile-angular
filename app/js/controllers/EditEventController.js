smurAngular.controller('EditEventController', 
	function EditEventController($scope, $http, $location, $routeParams, Mission, Event, Utils) {
		Mission.getStore().then(function(store){
			store.get(parseInt($routeParams.missionId), function(data) {
				$scope.mission = data;
				if($routeParams.eventId) {
					Event.getStore().then(function(store){
						store.get(parseInt($routeParams.missionId), function(data){
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
		});
		

		
		$http.get("/resources/event-types.json").success(function(data){
			$scope.types = data;
		});

		$http.get("/resources/vehicles.json").success(function(data){
			$scope.vehicles = data;
		});

		$scope.back = function() {
			$location.url("/mission/"+$scope.mission.id).search({page: "event"});
		};

		$scope.save = function() {
			console.log($scope.event);
			Event.getStore().then(function(store) {
				store.put($scope.event);
			});
			$scope.back();
		};
	});
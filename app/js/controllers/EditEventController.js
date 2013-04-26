smurAngular.controller('EditEventController', 
	function EditEventController($scope, $http, $location, $routeParams, Mission, Event, Vehicle, Utils) {
		Mission.get(parseInt($routeParams.missionId)).then(function(data) {
			$scope.mission = data;
			if($routeParams.eventId) {
				Event.get(parseInt($routeParams.eventId)).then(function(data){
					$scope.event = data;
				});
			} else {
				$scope.event = {};
				$scope.event.start = Utils.getCurrentDateAndTime();
				$scope.event.end  = Utils.getCurrentDateAndTime();
				$scope.event.missionId = $scope.mission.id;
			}
		});

		Vehicle.getAll().then(function(data) {
			$scope.vehicles = data;
		});

		$http.get("/resources/event-types.json").success(function(data){
			$scope.types = data;
		});

		$scope.back = function() {
			$location.url("/mission/"+$scope.mission.id).search({page: "event"});
		};

		$scope.save = function() {
			Event.save($scope.event);
			$scope.back();
		};
	});
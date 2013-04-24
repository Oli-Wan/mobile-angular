smurAngular.controller('NewEventController', 
	function NewEventController($scope, $http, $location, $routeParams, Mission, Utils) {
		$scope.mission = Mission.get($routeParams.missionId);
		
		$http.get("/resources/event-types.json").success(function(data){
			$scope.types = data;
		});

		$http.get("/resources/vehicles.json").success(function(data){
			$scope.vehicles = data;
		});

		$scope.event = {};
		$scope.event.start = Utils.getCurrentDateAndTime();
		$scope.event.end  = Utils.getCurrentDateAndTime();

		$scope.back = function() {
			$location.url("/mission/"+$scope.mission.id).search({page: "event"});
		};

		$scope.add = function() {
			$scope.back();
		};
	});
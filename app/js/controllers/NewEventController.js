smurAngular.controller('NewEventController', 
	function NewEventController($scope, $http, $location, $routeParams, Mission, Utils) {		
		$scope.event = {};
		$scope.event.start = Utils.getCurrentDateAndTime();
		$scope.event.end  = Utils.getCurrentDateAndTime();
		
		Mission.getStore().then(function(store){
			store.get(parseInt($routeParams.missionId), function(data) {
				$scope.mission = data;
				$scope.$apply();
			});
		});
		
		$http.get("/resources/event-types.json").success(function(data){
			$scope.types = data;
		});

		$http.get("/resources/vehicles.json").success(function(data){
			$scope.vehicles = data;
		});

		$scope.$watch('event.type', function(current, old) {
			if(current == "1")
				$scope.destination = "/partials/mission/events/address.html";
			else if(current == "2")
				$scope.destination = "/partials/mission/events/service.html";
			else
				$scope.destination = "";
		});

		$scope.back = function() {
			$location.url("/mission/"+$scope.mission.id).search({page: "event"});
		};

		$scope.add = function() {
			console.log($scope.event);
		};
	});
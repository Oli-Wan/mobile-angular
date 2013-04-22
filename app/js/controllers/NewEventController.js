smurAngular.controller('NewEventController', 
	function NewEventController($scope, $http, $location, $routeParams, Mission) {
		$scope.mission = Mission.get($routeParams.missionId);
		
		$http.get("/resources/event-types.json").success(function(data){
			$scope.types = data;
		});

		$http.get("/resources/vehicles.json").success(function(data){
			$scope.vehicles = data;
		});

		$scope.event = {}
		$scope.event.start = getCurrentDateAndTime();
		$scope.event.end  = getCurrentDateAndTime();

		$scope.back = function() {
			$location.url("/mission/"+$scope.mission.id).search({page: "event"});
		};

		$scope.add = function() {
			$scope.back();
		};
	});

function getCurrentDateAndTime(){
	var currentTime = new Date();
	return {
		date: currentTime.getDate()+"/"+currentTime.getMonth()+"/"+currentTime.getFullYear(),
		time: currentTime.getHours()+":"+currentTime.getMinutes()
	}
}

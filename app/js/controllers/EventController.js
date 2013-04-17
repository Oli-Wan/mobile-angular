
smurAngular.controller("EventController", 
	function EventController($scope, $http, $modal){
		
		$http.get("/resources/event-types.json").success(function(data){
			$scope.types = data;
		});

		$http.get("/resources/vehicles.json").success(function(data){
			$scope.vehicles = data;
		});

		var currentTime = new Date();

		$scope.start = getCurrentDateAndTime();
		$scope.end  = getCurrentDateAndTime();

		$scope.getDestinationType = function(){
			return "/partials/mission/events/address.html";
		};

		$scope.createModal = function() {
			var modal = $modal({
				scope: $scope,
				template: 'partials/mission/eventForm.html', 
				show: true, 
				backdrop: 'static',
				modalClass:'wide-modal'
			});			
		};
	});

function getCurrentDateAndTime(){
	var currentTime = new Date();
	return {
		date: currentTime.getDate()+"/"+currentTime.getMonth()+"/"+currentTime.getFullYear(),
		time: currentTime.getHours()+":"+currentTime.getMinutes()
	}
}
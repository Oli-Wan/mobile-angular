
smurAngular.controller("EventController", 
	function EventController($scope, $modal, $location, $routeParams, Event){		
		
		$scope.fetchEvents = function() {
			Event.getByMissionId($routeParams.missionId).then(function(data) {
				$scope.events = data;
			});
		};

		$scope.goToNewEvent = function() {
			$location.url("/mission/"+$routeParams.missionId+"/events/new");
		};

		$scope.goToEditEvent = function(id) {
			$location.url("/mission/"+$routeParams.missionId+"/event/"+id+"/edit");
		};

		$scope.delete = function(id) {
			Event.remove(id).then(function() {
				$scope.fetchEvents();
			});
			$scope.dismiss();
		};

		$scope.deleteModal = function(id) {
			$scope.element = id;
			return $modal({
				scope: $scope,
				template: '/partials/misc/deleteConfirmation.html', 
				show: true, 
				backdrop: 'static'
			});
		};

		$scope.fetchEvents();
	});

smurAngular.controller("EventController", 
	function EventController($scope, $modal, $routeParams, Event){
		$scope.missionId = $routeParams.missionId;
		
		$scope.fetchEvents = function() {
			Event.getByMissionId($scope.missionId).then(function(data) {
				$scope.events = data;
			});
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
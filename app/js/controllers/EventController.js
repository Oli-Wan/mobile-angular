
smurAngular.controller("EventController", 
	function EventController($scope, $http, $modal, $routeParams, $location, Mission, Event){
		$scope.missionId = $routeParams.missionId;
		$scope.fetchEvents = function() {
			Event.getByMissionId($scope.missionId).then(function(data) {
				$scope.events = data;
			});
		};

		$scope.delete = function(id) {
			Event.getStore().then(function(store) {
				store.remove(id, function() {
					$scope.fetchEvents();
				});
				$scope.dismiss();
			});
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

smurAngular.controller("EventController", 
	function EventController($scope, $http, $modal, $routeParams, $location, Mission, Event){

		$scope.fetchEvents = function() {
			Event.getByMissionId($routeParams.missionId).then(function(data) {
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

		$scope.goToNewEvent = function() {
			$location.url("/mission/"+$routeParams.missionId+"/events/new");
		};

		$scope.goToEdit = function(id) {
			$location.url("/mission/"+$routeParams.missionId+"/event/"+id+"/edit");
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
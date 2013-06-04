
angular.module('mobileAngular').controller("EventController", 
	function ($scope, $location, $window, $routeParams, Event){		
		
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

		$scope.deleteModal = function(id) {
			var confirm = $window.confirm("Êtes vous sûr de vouloir supprimer l'évènement #"+id);
			if(confirm) {
				Event.remove(id).then(function() {
					$scope.fetchEvents();
				});
			}
		};

		$scope.fetchEvents();
	});
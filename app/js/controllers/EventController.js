
smurAngular.controller("EventController", 
	function EventController($scope, $http, $modal, $routeParams, $location, Mission){
		$scope.mission = Mission.get($routeParams.missionId);
		/*
		$scope.createModal = function() {
			var modal = $modal({
				template: 'partials/mission/events/dialog.html', 
				show: true, 
				backdrop: 'static',
				modalClass:'wide-modal'
			});			
		};*/
	});
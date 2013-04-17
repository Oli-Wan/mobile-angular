
smurAngular.controller("EventController", 
	function EventController($scope, $rootScope, $http, $modal){
		$scope.createModal = function() {
			var modal = $modal({
				template: 'partials/mission/events/dialog.html', 
				show: true, 
				backdrop: 'static',
				modalClass:'wide-modal'
			});			
		};
	});
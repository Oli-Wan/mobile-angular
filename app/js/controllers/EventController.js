
smurAngular.controller("EventController", 
	function EventController($scope, $http, $modal, $routeParams, $location, Mission, Event){	
		Mission.getStore().then(function(store){
			store.get(parseInt($routeParams.missionId), function(data) {
				$scope.mission = data;
				$scope.loadEvents();
			});
		});

		$scope.loadEvents = function() {	
			Event.getStore().then(function(store){
				var keyRange = store.makeKeyRange({
					lower: $scope.mission.id,
					upper: $scope.mission.id
				});
				store.query(function(data) {
					$scope.events = data;
					$scope.$apply();
				}, {
					"index":"missionId",
					"keyRange":keyRange
				});
			});
		};

		$scope.delete = function(id) {
			Event.getStore().then(function(store) {
				store.remove(id, function() {
					$scope.loadEvents();
				});
				$scope.dismiss();
			});
		};

		$scope.goToNewEvent = function() {
			$location.url("/mission/"+$scope.mission.id+"/events/new");
		};

		$scope.goToEdit = function(id) {
			$location.url("/mission/"+$scope.mission.id+"/event/"+id+"/edit");
		};

		$scope.deleteModal = function(id) {
			$scope.id = id;
			return $modal({
				scope: $scope,
				template: '/partials/misc/deleteConfirmation.html', 
				show: true, 
				backdrop: 'static'
			});
		};
	});
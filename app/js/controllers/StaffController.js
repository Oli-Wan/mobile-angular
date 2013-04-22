
smurAngular.controller("StaffController", 
	function StaffController($scope, $routeParams, $http, $modal, $location, Mission, Staff){
		Mission.getStore().then(function(store){
			store.get(parseInt($routeParams.missionId), function(data) {
				$scope.mission = data;
				$scope.refreshStaff();
			});
		});

		$http.get('/resources/functions.json').success(function(data){
			$scope.functions = [];
			data.forEach(function(element, index, array) {
				$scope.functions[element.id] = element.name;
			});
		});

		$scope.goToNewStaff = function() {
			$location.url("/mission/"+$scope.mission.id+"/staff/new");
		}

		$scope.delete = function(id) {
			var newStaff = [];
			$scope.mission.staff.forEach(function(element, index, array){
				if(element.id != id)
					newStaff.push(element);
			});
			$scope.mission.staff = newStaff;
			Mission.getStore().then(function(store){
				store.put($scope.mission, function(){
					$scope.refreshStaff();
					$scope.$apply();
				});
			});
			$scope.dismiss();
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

		$scope.refreshStaff = function() {
			if($scope.mission.staff === undefined)
				return;
			
			$scope.staff = [];
			$scope.mission.staff.forEach(function(element, index, array) {
				Staff.getStore().then(function(staffStore){
					staffStore.get(parseInt(element.id), function(data){
						data.time = element.time;
						$scope.staff.push(data);
						$scope.$apply();
					});
				});
			});
		};
	});
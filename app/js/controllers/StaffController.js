
smurAngular.controller("StaffController", 
	function StaffController($scope, $routeParams, $http, $modal, $location, Mission, Staff){
		Mission.get(parseInt($routeParams.missionId)).then(function(data) {
			$scope.mission = data;
			$scope.refreshStaff();
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

		$scope.delete = function(elementToDelete) {
			console.log(elementToDelete);
			var newStaff = [];
			$scope.mission.staff.forEach(function(element, index, array){
				if(element.id != elementToDelete.id || 
					element.time.date != elementToDelete.time.date ||
					element.time.time != elementToDelete.time.time )
					newStaff.push(element);
			});
			$scope.mission.staff = newStaff;
			Mission.save($scope.mission).then(function(){
				$scope.refreshStaff();
			});
			$scope.dismiss();
		};

		$scope.deleteModal = function(element) {
			$scope.element = element;
			return $modal({
				scope: $scope,
				template: '/partials/misc/deleteConfirmation.html', 
				show: true, 
				backdrop: 'static'
			});
		};

		$scope.refreshStaff = function() {
			console.log("refreshing staff");
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
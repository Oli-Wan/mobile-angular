
mobileAngular.controller("StaffController", 
	function StaffController($scope, $routeParams, $http, $window, $location, Mission, Staff){
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
		};

		$scope.deleteModal = function(elementToDelete) {
			var confirm = $window.confirm("Êtes vous sûr de vouloir supprimer la personne "+
				elementToDelete.firstname+" "+elementToDelete.lastname);
			if(confirm) {
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
			}
		};

		$scope.refreshStaff = function() {
			if($scope.mission.staff === undefined)
				return;

			$scope.staff = [];
			$scope.mission.staff.forEach(function(element, index, array) {
				Staff.get(parseInt(element.id)).then(function(data){
					data.time = element.time;
					$scope.staff.push(data);
				});
			});
		};
	});
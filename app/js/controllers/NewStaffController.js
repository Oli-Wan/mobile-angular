
smurAngular.controller("NewStaffController", 
	function NewStaffController($scope, $http, $location, $routeParams, Mission, Staff, Utils) {
		Mission.getStore().then(function(store){
			store.get(parseInt($routeParams.missionId), function(data) {
				$scope.mission = data;
				$scope.$apply();
			});
		});

		Staff.getStore().then(function(store){
			store.getAll(function(data) {
				$scope.persons = [];
				if(!$scope.mission.staff || $scope.mission.staff.length == 0) {
					console.log("No staff")
					$scope.persons = data;
					$scope.$apply();
					return;
				}

				console.log("Staff exist : "+$scope.mission.staff);

				for(var i = 0; i < data.length; i++) {
					for(var j = 0; j < $scope.mission.staff.length; j++) {
						if($scope.mission.staff[j].id != data[i].id) {
							$scope.persons.push(data[i]);
							$scope.$apply();
							break;
						}
					}
				}
			});
		});

		$http.get('/resources/functions.json').success(function(data){
			$scope.functions = data;
		});

		var formattedDate = Utils.getCurrentDateAndTime;

		$scope.date = formattedDate.date;
		$scope.time = formattedDate.time;

		$scope.back = function() {

			$location.url("/mission/"+$scope.mission.id).search({page: "staff"});
		};

		$scope.add = function() {
			$scope.staff.store="staff";
			if($scope.mission.staff === undefined)
				$scope.mission.staff = [];
			
			console.log("Staff : "+$scope.staff);

			$scope.mission.staff.push($scope.staff);

			Mission.getStore().then(function(store){
				store.put($scope.mission);
			});
			$scope.back();
		};
	});


smurAngular.controller("NewStaffController", 
	function NewStaffController($scope, $http, $location, $routeParams, Mission, Staff, Utils) {
		$scope.staff = {};
		var formattedDate = Utils.getCurrentDateAndTime();
		$scope.staff.date = formattedDate.date;
		$scope.staff.time = formattedDate.time;
		
		console.log($scope.staff);

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

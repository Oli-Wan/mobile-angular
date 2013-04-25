
smurAngular.controller("NewStaffController", 
	function NewStaffController($scope, $http, $location, $routeParams, Mission, Utils) {
		$scope.mission = Mission.get($routeParams.missionId);
		$scope.date = Utils.getCurrentDateAndTime();

		$http.get('/resources/functions.json').success(function(data){
			$scope.functions = data;
		});

		$http.get('/resources/persons.json').success(function(data){
			$scope.persons = data;
		});


		$scope.back = function() {
			$location.url("/mission/"+$scope.mission.id).search({page: "staff"});
		};

		$scope.add = function() {
			$scope.staff.store="staff";
			$scope.mission.staff.push($scope.staff);

			Mission.getStore().then(function(store){
				store.put($scope.mission, function(){
					$scope.alerts = [];
					$scope.alerts.push({
						type: "success",
						title: "Succès",
						content: "Mission mise à jour avec succès"
					});
				});
			});
		};
	});

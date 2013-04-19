
smurAngular.controller('NewMissionController', 
	function NewMissionController($scope, $http, $location, Mission, Utils){
		$scope.alerts = [];

		$http.get("/resources/vehicles.json").success(function(data){
			$scope.vehicles = data;
		});

		$http.get("/resources/persons.json").success(function(data){
			$scope.responsibles = data;
		});
		
		$scope.add = function(){
			if($scope.password == "1234") {
				var formattedDate = Utils.getCurrentDateAndTime():
				$scope.mission.created_at = formattedDate.date+" "+formattedDate.time;
				Mission.getStore().then(function(store){
					store.put($scope.mission);
					$scope.back();
				});
			} else {
				$scope.alerts.push({
					"type": "error",
					"title": "Mauvais mot de passe",
					"content": "Essayez 1234"
				});
			}
		};

		$scope.back = function() {
			$location.url("/");
		};
	});

smurAngular.controller('NewMissionController', 
	function NewMissionController($scope, $location, Mission, Vehicle, Staff, mobile, Utils, Command){
		$scope.alerts = [];
		$scope.mobile = mobile;

		Vehicle.getAll().then(function(data){
			$scope.vehicles = data;
		});

		Staff.getAll().then(function(data){
			$scope.responsibles = data;
		});

		$scope.add = function(){
			if($scope.password == "1234") {
				var formattedDate = Utils.getCurrentDateAndTime();
				$scope.mission.created_at = formattedDate.date+" "+formattedDate.time;
				Mission.save($scope.mission).then(function(){
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
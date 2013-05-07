smurAngular.controller("UpdateMissionController", function UpdateMissionController($scope, $window, $routeParams, Mission) {
	var onLoadImage = function(e) {
		$scope.$apply(function(){
			$scope.mission.image = e.target.result;
		});
	};

	$scope.save = function() {
		Mission.save($scope.mission).then(function() {
			$scope.alerts = [];
			$scope.alerts.push({
				type: "success",
				title: "Succès",
				content: "Mission mise à jour avec succès"
			});
			$window.scrollTo(0,0);
		});
	};

	$scope.setFile = function(element) {
		var reader = new FileReader();
		var f = element.files[0];
		reader.onload = function(e) {
			$scope.$apply(function(){
				$scope.mission.image = e.target.result;
			});
		};
		reader.readAsDataURL(f); 
	};
});

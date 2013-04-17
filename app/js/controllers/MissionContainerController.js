
smurAngular.controller("MissionContainerController", 
		function MissionContainerController($scope, $routeParams, $http, $location, Mission){
			$scope.mission = Mission.get($routeParams.missionId);

			 $http.get("/resources/mission-menu.json").success(function(data){
			 	$scope.menuItems = data;
			});
			$scope.includedUrl = "/partials/mission/mission.html";

			$scope.includeUrlIs = function(expectedUrl) {
				return $scope.includedUrl == expectedUrl;
			};

			$scope.navigate = function(url) {
				$scope.includedUrl = url;
			};

			$scope.back = function() {
				$location.url("/");
			};
		});
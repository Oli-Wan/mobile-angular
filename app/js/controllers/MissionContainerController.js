
smurAngular.controller("MissionContainerController", 
	function MissionContainerController($scope, $routeParams, $http, $location, Mission, $window){
		$scope.mission = Mission.get($routeParams.missionId);

		$http.get("/resources/mission-menu.json").success(function(data){
			$scope.menuItems = data;
			$scope.includedUrl = $scope.getPathFromParams();
		});

		$scope.includeUrlIs = function(expectedUrl) {
			return $scope.includedUrl == expectedUrl;
		};

		$scope.navigate = function(id) {
			var date = new Date();
			$location.url("/mission/"+$scope.mission.id).search({page: id});
			$scope.includedUrl = $scope.getPathFromParams();
			$window.scrollTo(0,0);
			console.log("Redirecting took "+(new Date() - date));
		};

		$scope.getPathFromParams = function() {
			var before = new Date();
			var currentPage = $location.search().page;
			for (var i = 0; i < $scope.menuItems.length; i++) {
				if($scope.menuItems[i].id == currentPage) 
					return $scope.menuItems[i].templateUrl;
			};
			return "";
		};

		$scope.back = function() {
			$location.url("/");
		};
	});
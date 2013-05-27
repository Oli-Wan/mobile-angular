
smurAngular.controller("MissionContainerController", 
	function MissionContainerController($scope, $rootScope, $routeParams, $http, $location, Mission, $window){
		$scope.menu = false;
		
		Mission.get(parseInt($routeParams.missionId)).then(function(data){
			$scope.mission = data;
		});

		$http.get("/resources/mission-menu.json").success(function(data){
			$scope.menuItems = data;
			$scope.includedUrl = $scope.getPathFromParams();
		});

		$scope.includeUrlIs = function(expectedUrl) {
			return $scope.includedUrl == expectedUrl;
		};

		$scope.$on('$routeUpdate', function() { 
			$scope.includedUrl = $scope.getPathFromParams();
			$window.scrollTo(0,0);
		});

		$scope.toggleMenu = function(){
			$scope.menu = !$scope.menu;
		};

		$scope.navigate = function(id) {
			if(id == "back")
				$location.url("/");
			else {
				$location.url("/mission/"+$scope.mission.id).search({page: id});
				$scope.menu = false;
			}
		};

		$scope.getPathFromParams = function() {
			var currentPage = $location.search().page;
			for (var i = 0; i < $scope.menuItems.length; i++) {
				if($scope.menuItems[i].id == currentPage) 
					return $scope.menuItems[i].templateUrl;
			};
			return "";
		};

		$scope.showMenu = function() {
			$scope.includedUrl = "";
			$location.path("/mission/"+$scope.mission.id);
		};
	});
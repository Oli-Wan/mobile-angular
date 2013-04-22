
smurAngular.controller("MissionContainerController", 
	function MissionContainerController($scope, $rootScope, $routeParams, $http, $location, Mission, $window, mobile){
		Mission.getStore().then(function(store){
			store.get(parseInt($routeParams.missionId), function(data) {
				$scope.mission = data;
				$scope.$apply();
			});
		});

		$scope.mobile = mobile;

		$http.get("/resources/mission-menu.json").success(function(data){
			$scope.menuItems = data;
			$scope.includedUrl = $scope.getPathFromParams();
		});

		$scope.includeUrlIs = function(expectedUrl) {
			return $scope.includedUrl == expectedUrl;
		};

		$scope.navigate = function(id) {
			if(id == "back")
				$scope.back();
			else {
				$location.url("/mission/"+$scope.mission.id).search({page: id});
				$scope.includedUrl = $scope.getPathFromParams();
				$window.scrollTo(0,0);
			}
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

		$scope.showMenu = function() {
			$scope.includedUrl = "";
			$location.url("/mission/"+$scope.mission.id);
		}

		$scope.renderMenu = function() {			
			if(!$scope.mobile)
				return true;

			if($location.search().page)
				return false;
			else
				return true;
		};

		$scope.renderPage = function() {
			if(!$scope.mobile)
				return true;

			return !$scope.renderMenu();
		};

		$rootScope.$watch('windowWidth',function(newVal, oldVal) {
			if(newVal < 768 && !$scope.mobile) {
				$scope.mobile = true;
			} else if (newVal >= 768 && $scope.mobile) {
				$scope.mobile = false;
			}
		});
	});
mobileAngular.controller('ConnectionController', 
	function ConnectionController($scope, $timeout, $location, $route, Command) {
		$scope.offline = false;

		$scope.$on('offline', function() {
			$scope.offline = true;
		});

		$scope.$on('online', function() {
			$scope.offline = false;
		});
	});
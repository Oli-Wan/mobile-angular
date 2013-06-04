angular.module('mobileAngular').controller('ConnectionController', 
	function ($scope, $timeout, $location, $route, Command) {
		$scope.offline = false;

		$scope.$on('offline', function() {
			$scope.offline = true;
		});

		$scope.$on('online', function() {
			$scope.offline = false;
		});
	});
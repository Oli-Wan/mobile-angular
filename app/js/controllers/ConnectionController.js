angular.module('mobileAngular').controller('ConnectionController', function ($scope) {
		$scope.offline = false;

		$scope.$on('offline', function() {
			$scope.offline = true;
		});

		$scope.$on('online', function() {
			$scope.offline = false;
		});
	});
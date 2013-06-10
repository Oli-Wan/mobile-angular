angular.module('mobileAngular').controller('AccelerometerController', 
	function ($scope, $rootScope){
		$rootScope.$watch('orientationData', function(newVal){
			$scope.orientationData = newVal.originalEvent;
		});
	});

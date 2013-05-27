smurAngular.controller('AccelerometerController', function($scope, $rootScope){
	$rootScope.$watch('orientationData', function(newVal, oldVal){
		$scope.orientationData = newVal.originalEvent;
	});
});

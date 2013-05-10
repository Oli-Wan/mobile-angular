smurAngular.controller('AccelerometerController', function($scope, $rootScope){
	$rootScope.$watch('orientationData', function(newVal, oldVal){
		console.log("Orientation watching");
		$scope.orientationData = newVal.originalEvent;
	});
});

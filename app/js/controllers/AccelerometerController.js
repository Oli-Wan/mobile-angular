mobileAngular.controller('AccelerometerController', 
	function AccelerometerController($scope, $rootScope){
		$rootScope.$watch('orientationData', function(newVal, oldVal){
			$scope.orientationData = newVal.originalEvent;
		});
	});

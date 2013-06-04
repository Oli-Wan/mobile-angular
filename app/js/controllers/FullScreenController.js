angular.module('mobileAngular').controller("FullScreenController", 
	function ($scope, $window){
		if(screenfull.enabled)
			$scope.fullscreenSupport = true;

		$scope.launch = function(){
			screenfull.request();
		};

		$scope.exit = function(){
			screenfull.exit();
		};
	});
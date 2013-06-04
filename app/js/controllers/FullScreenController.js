angular.module('mobileAngular').controller("FullScreenController", 
	function ($scope, $window){
		if(screenfull.enabled)
			$scope.fullscreenSupport = true;

		$scope.requestFullScreen = function(){
			screenfull.request();
		}
	});
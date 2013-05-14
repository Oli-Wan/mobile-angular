smurAngular.controller("FullScreenController", 
	function FullScreenController($scope, $window){
		if(screenfull.enabled)
			$scope.fullscreenSupport = true;

		$scope.requestFullScreen = function(){
			screenfull.request();
		}
	});
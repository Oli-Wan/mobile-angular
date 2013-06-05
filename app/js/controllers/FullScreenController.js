angular.module('mobileAngular').controller("FullScreenController", 
	function ($scope, $window){
		
		$scope.launch = function(){
			console.log("launching");
			screenfull.request();
		};

		$scope.exit = function(){
			screenfull.exit();
		};
	});
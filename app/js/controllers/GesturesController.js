smurAngular.controller('GesturesController', 
	function GesturesController($scope) {
		$scope.event;

		$scope.tapMe = function(){
			console.log("Tapped");
		};

		$scope.swipeMeLeft = function(){
			console.log("swiped to the left");
			$scope.swipeLeft = true;
		};

		$scope.swipeMeRight = function(){
			console.log("swiped to the right");
			$scope.swipeRight = true;
		};

		$scope.dragMe = function(args){
			console.log($scope.event);
			console.log(args);
			console.log("dragged");
		};
	});
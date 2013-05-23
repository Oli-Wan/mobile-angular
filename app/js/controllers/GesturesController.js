smurAngular.controller('GesturesController', 
	function GesturesController($scope) {
		$scope.dragMessage = "right"
		$scope.dragSwitch = false;
		$scope.dragSwitch2 = false;

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

		$scope.$watch('dragSwitch', function(newValue){
			console.log("watch drag", newValue);
		});

		$scope.moveDraggable = function(){
			$scope.dragSwitch = !$scope.dragSwitch;
		};

		$scope.moveDraggable2 = function(){
			$scope.dragSwitch2 = !$scope.dragSwitch2;
		};

		$scope.releaseMe = function(){
			$scope.dragMessage = "right"
		};

	});
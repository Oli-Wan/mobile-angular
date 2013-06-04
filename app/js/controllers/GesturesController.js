angular.module('mobileAngular').controller('GesturesController', function ($scope) {
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

		$scope.end = function() {
			console.log("Transition end");
		};

		$scope.onThreshold = function(message) {
			console.log("Threshold", message);
		};

		$scope.myFunction = function() {
			console.log("Fonction métier");
		}

		$scope.moveDraggable = function(){
			$scope.dragSwitch = !$scope.dragSwitch;
		};

		$scope.moveDraggable2 = function(){
			$scope.dragSwitch2 = !$scope.dragSwitch2;
		};

		$scope.moveDraggable3 = function(){
			$scope.dragSwitch3 = !$scope.dragSwitch3;
		};

		$scope.releaseMe = function(){
			$scope.dragMessage = "right"
		};

		$scope.holdMe = function(){
			$scope.hold = !$scope.hold;
		};

		$scope.$watch('dragSwitch', function(newValue){
			console.log("watch drag", newValue);
		});

		$scope.hold = false;
		$scope.dragSwitch = false;
		$scope.dragSwitch2 = false;
		$scope.dragSwitch3 = false;
	});
smurAngular.directive('ngDrag', function($parse) {
	return {
		restrict: 'E',
		scope: {
			dragSwitch: "=switch",
			threshold: "@"
		},
		link: function ($scope, element, attrs) {
			var draggable = element.parent();

			$scope.thresholdExceeded = false;
			if(attrs['ngDragSwitch'] === undefined)
				$scope.thresholdExceeded = $scope.dragSwitch;

			$scope.switch = function(value) {
				if(attrs['switch'] === undefined)
					return;
				if($scope.dragSwitch == value)
					return;

				$scope.dragSwitch = value
			};

			$scope.move = function(){
				var offset = 0
				if($scope.thresholdExceeded)
					offset = $scope.threshold;

				draggable.addClass('animated-return');
				draggable.css("transform", "translate("+offset+"px)");
			};

			$scope.$watch('dragSwitch', function(newValue){
				$scope.thresholdExceeded = newValue;
				$scope.move();
			});

			Hammer(draggable[0]).on('dragstart', function(event){
				$(this).removeClass('animated-return');
			});

			Hammer(draggable[0]).on('drag', function(event){
				var deltaX = event.gesture.deltaX;
				
				if($scope.thresholdExceeded)
					deltaX = deltaX + parseInt($scope.threshold);

				$(this).css("transform", "translate("+deltaX+"px)");

			});

			Hammer(draggable[0]).on('dragend', function(event){
				$this = $(this);

				if($this.position().left > $scope.threshold) {
					$scope.thresholdExceeded = true;
					$scope.switch(true);
					$scope.$apply();
				} else if ($scope.thresholdExceeded) {
					$scope.thresholdExceeded = false;
					$scope.switch(false);
					$scope.$apply();
				}

				$scope.move();
			});
		}
	};
});	
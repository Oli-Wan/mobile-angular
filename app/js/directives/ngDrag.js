mobileAngular.directive('ngDrag', function($parse) {
	return {
		restrict: 'E',
		scope: {
			dragSwitch: "=switch",
			threshold: "@",
			onThreshold: "&",
			bounded: "@",
			preventDefault: '@'
		},
		link: function ($scope, element, attrs) {
			var draggable = element.parent();
			$scope.thresholdExceeded = false;
			
			if(attrs['switch'] === undefined)
				$scope.thresholdExceeded = $scope.dragSwitch;

			$scope.axis = "X";
			if(attrs['axis'] !== undefined)
				$scope.axis = attrs['axis'].toUpperCase();

			if($scope.threshold === undefined)
				$scope.threshold = 500;

			$scope.isDeltaAboveThreshold = function(delta) {
				if($scope.threshold < 0) {
					return $scope.threshold >= delta;
				} else {
					return delta >= $scope.threshold;
				}
			};

			$scope.switch = function(value) {
				if(attrs['switch'] === undefined)
					return;
				if($scope.dragSwitch == value)
					return;

				$scope.dragSwitch = value
			};

			$scope.move = function(offset, animate){
				draggable.removeClass('animate');
				
				if(animate)
					draggable.addClass('animate');

				var coordinates;
				if($scope.axis == "Y")
					coordinates = "0,"+offset+"px, 0";
				else
					coordinates = offset+"px, 0, 0";

				draggable.css("transform", "translate3d("+coordinates+") scale3d(1,1,1)");
			};

			$scope.$watch('dragSwitch', function(newValue){
				$scope.thresholdExceeded = newValue;
				
				if($scope.thresholdExceeded)
					$scope.move($scope.threshold, true);
				else
					$scope.move(0, true);
			});

			Hammer(draggable[0]).on('drag', function(event) {
				if($scope.preventDefault)
					event.gesture.preventDefault();

				var delta = event.gesture['delta'+$scope.axis];

				if($scope.thresholdExceeded)
					delta = delta + parseInt($scope.threshold);

				if($scope.bounded && $scope.isDeltaAboveThreshold(delta))
					delta = $scope.threshold;

				$scope.move(delta);
			});

			Hammer(draggable[0]).on('release', function(event){
				if($scope.preventDefault)
					event.gesture.preventDefault();

				$this = $(this);
				var delta = event.gesture['delta'+$scope.axis];
				if($scope.thresholdExceeded)
					delta = delta + parseInt($scope.threshold);

				if( $scope.isDeltaAboveThreshold(delta) ) {
					$scope.thresholdExceeded = true;
					$scope.switch(true);
					$scope.$apply(function(){
						$scope.onThreshold();
					});
					$scope.move($scope.threshold, true);
				} else if ($scope.thresholdExceeded) {
					$scope.thresholdExceeded = false;
					$scope.switch(false);
					$scope.$apply();
					$scope.move("0", true);
				} else {
					$scope.move("0", true);
				}
			});
		}
	};
});	
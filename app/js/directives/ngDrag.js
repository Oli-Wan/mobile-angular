mobileAngular.directive('ngDrag', function($parse) {
	return {
		restrict: 'E',
		scope: {
			dragSwitch: "=switch",
			bound: "@",
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
			var events = "dragright dragleft";
			if(attrs['axis'] && attrs['axis'].toUpperCase() == "Y") {
				$scope.axis = "Y";
				events = "dragup dragdown";
			}

			console.log(attrs['axis'], $scope.axis, events);

			if($scope.bound === undefined)
				$scope.threshold = 500;

			$scope.isAbove = function(delta, reference) {
				if(reference < 0) {
					return reference >= delta;
				} else {
					return delta >= reference;
				}
			}

			$scope.isDeltaAboveBound = function(delta) {
				if($scope.bound < 0) {
					return $scope.bound >= delta;
				} else {
					return delta >= $scope.bound;
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
					$scope.move($scope.bound, true);
				else
					$scope.move(0, true);
			});

			Hammer(draggable[0]).on(events, function(event) {
				if($scope.preventDefault)
					event.gesture.preventDefault();

				event.stopPropagation();

				var delta = event.gesture['delta'+$scope.axis];

				if($scope.thresholdExceeded)
					delta = delta + parseInt($scope.bound);

				if($scope.bounded && $scope.isAbove(delta, $scope.bound))
					delta = $scope.bound;

				$scope.move(delta);
			});

			Hammer(draggable[0]).on('release', function(event){
				if($scope.preventDefault)
					event.gesture.preventDefault();

				$this = $(this);
				var delta = event.gesture['delta'+$scope.axis];
				if($scope.thresholdExceeded)
					delta = delta + parseInt($scope.bound);

				if( $scope.isAbove(delta, $scope.bound/2) ) {
					$scope.thresholdExceeded = true;
					$scope.switch(true);
					$scope.$apply(function(){
						$scope.onThreshold();
					});
					$scope.move($scope.bound, true);
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
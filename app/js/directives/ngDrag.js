smurAngular.directive('ngDrag', function($parse) {
	return {
		restrict: 'E',
		scope: {
			dragSwitch: "=switch",
			threshold: "@",
			onThreshold: "&"
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

				draggable.addClass('animate');
				draggable.css("transform", "translate"+$scope.axis+"("+offset+"px)");
			};

			$scope.$watch('dragSwitch', function(newValue){
				$scope.thresholdExceeded = newValue;
				$scope.move();
			});

			Hammer(draggable[0]).on('dragstart', function(event){
				event.stopPropagation();
				$(this).removeClass('animate');
			});

			Hammer(draggable[0]).on('drag', function(event) {
				event.stopPropagation();
				var delta = event.gesture['delta'+$scope.axis];

				if($scope.thresholdExceeded)
					delta = delta + parseInt($scope.threshold);

				$(this).css("transform", "translate"+$scope.axis+"("+delta+"px)");

			});

			Hammer(draggable[0]).on('dragend', function(event){
				event.stopPropagation();
				$this = $(this);
				var delta = event.gesture['delta'+$scope.axis];

				var leftMember;
				var rightMember;
				if($scope.threshold < 0) {
					rightMember = delta;
					leftMember = $scope.threshold;
				} else {
					leftMember = delta;
					rightMember = $scope.threshold;
				}

				if( leftMember > rightMember) {
					$scope.thresholdExceeded = true;
					$scope.switch(true);
					$scope.$apply(function(){
						$scope.onThreshold();
					});
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
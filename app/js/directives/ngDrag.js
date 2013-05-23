smurAngular.directive('ngDrag', function($parse) {
	return {
		restrict: 'A',
		link: function ($scope, element, attrs) {
			var threshold = parseInt(attrs.ngDragThreshold);
			
			var dragFn = $parse(attrs.ngDragAction);
			var releaseFn = $parse(attrs.ngDragRelease);

			var thresholdExceeded = false;

			Hammer(element[0]).on('dragstart', function(event){
				$(this).removeClass('animated-return');
			});


			Hammer(element[0]).on('drag', function(event){
				var deltaX = event.gesture.deltaX;
				
				if(thresholdExceeded)
					deltaX = deltaX + threshold;

				$(this).css("transform", "translate("+deltaX+"px)");

			});

			Hammer(element[0]).on('dragend', function(event){
				$this = $(this);

				var left = 0;

				if($this.position().left > threshold) {
					left = threshold;
					thresholdExceeded = true;
					$scope.$apply(function(){
						dragFn($scope);
					});
				} else if (thresholdExceeded) {
					thresholdExceeded = false;
					$scope.$apply(function(){
						releaseFn($scope);
					});
				}

				$this.addClass('animated-return');
				$this.css("transform", "translate("+left+"px)");
			});
		}
	};
});	
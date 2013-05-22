smurAngular.directive('ngDrag', function() {
	return {
		restrict: 'A',
		scope: {
			threshold: '@ngDragThreshold'
		},
		link: function ($scope, element, attrs) {
			//var threshold = attrs['ng-drag-threshold'];

			var threshold = $scope.threshold;
			var thresholdExceeded = false;

			Hammer(element[0]).on('dragstart', function(event){
				$(this).removeClass('animated-return');
			});


			Hammer(element[0]).on('drag', function(event){
				var deltaX = event.gesture.deltaX;
				if(thresholdExceeded)
					deltaX = deltaX+500;

				$(this).css({
					position: "relative",
					left: deltaX+"px"
				});
			});

			Hammer(element[0]).on('dragend', function(event){
				$this = $(this);
				$this.addClass('animated-return');
				var left = 0;
				console.log($this.position().left);
				if($this.position().left > threshold) {
					left = threshold;
					thresholdExceeded = true;
				} else if (thresholdExceeded)
					thresholdExceeded = false;


				$this.css("left",left+"px");
			});
		}
	};
});	
smurAngular.directive('ngDrag', function() {
	return {
		restrict: 'A',
		link: function ($scope, element, attrs) {
			console.log(element);

			Hammer(element[0]).on('dragstart', function(event){
				$(this).removeClass('animated-return');
			});


			Hammer(element[0]).on('drag', function(event){
				$(this).css({
					position: "relative",
					left: event.gesture.deltaX+"px"
				});
			});

			Hammer(element[0]).on('dragend', function(event){
				$this = $(this);
				$this.addClass('animated-return');
				$this.css("left","0px");
			});
		}
	};
});
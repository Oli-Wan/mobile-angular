
angular.module('mobileAngular').directive('cube', function(url, Utils) {
	return {
		restrict: 'E',
		templateUrl: '/partials/directives/cube.html',
		link: function ($scope, element, attrs) {
			var hor = [Hammer.DIRECTION_LEFT, Hammer.DIRECTION_RIGHT];
			var cubeDiv = element.find("#cube");

			Hammer(element[0]).on('drag', function(event){
				event.gesture.preventDefault();
				var angle = -(event.gesture.angle);
				var direction = event.gesture.direction;
				var axis;
				console.log(hor.indexOf(direction));
				if(hor.indexOf(direction) != -1) {
					axis = 'Y';
					angle = event.gesture.deltaY;
				}
				else {
					axis = 'X';
					angle = event.gesture.deltaX;
				}

				console.log(direction, axis);

				cubeDiv.css("transform", "translateZ( -100px ) rotate"+axis+"("+event.gesture.angle+"deg)");
			});
		}
	};
});
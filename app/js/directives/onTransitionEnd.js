mobileAngular.directive('onTransitionEnd', function($parse, transitionEndEvent) {
	return {
		restrict: 'A',
		link: function ($scope, element, attrs) {
			var fn = $parse(attrs["onTransitionEnd"]);
			console.log(transitionEndEvent);
			element.bind(transitionEndEvent, function(){
				$scope.$apply(function(){
					fn($scope);
				});
			});
		}
	};
});
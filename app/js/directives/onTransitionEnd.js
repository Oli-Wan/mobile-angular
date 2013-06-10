angular.module('mobileAngular').directive('onTransitionEnd', function($parse, transitionEndEvent) {
	return {
		restrict: 'A',
		link: function ($scope, element, attrs) {
			var fn = $parse(attrs["onTransitionEnd"]);
			element.bind(transitionEndEvent, function(event){
				$scope.$apply(function(){
					fn($scope);
				});
			});
		}
	};
});
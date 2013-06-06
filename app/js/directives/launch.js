angular.module('mobileAngular').directive('launch', function($location) {
	return {
		restrict: 'A',
		link: function ($scope, element, attrs) {
			var button = angular.element(element);
			element.bind('click', function(){
				$location.path("/");
				screenfull.request();
			});
		}
	};
});
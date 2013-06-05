angular.module('mobileAngular').directive('launch', function() {
	return {
		restrict: 'A',
		link: function ($scope, element, attrs) {
			var button = angular.element(element);
			element.bind('click', function(){
				screenfull.request();
			});
		}
	};
});
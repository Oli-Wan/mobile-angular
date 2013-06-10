angular.module('mobileAngular').directive('launch', function($location) {
	return {
		restrict: 'A',
		link: function ($scope, element) {
			element.bind('click', function(){
				$location.path("/");
				screenfull.request();
			});
		}
	};
});
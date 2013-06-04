
angular.module('mobileAngular').directive('loader', function(url, Utils) {
	return {
		restrict: 'E',
		templateUrl: '/partials/directives/loader.html'
	};
});
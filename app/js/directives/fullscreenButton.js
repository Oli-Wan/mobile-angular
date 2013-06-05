angular.module('mobileAngular').directive('fullscreenButton', function() {
	return {
		restrict: 'E',
		template: '<button class="btn btn-primary btn-large"><span ng-transclude></span></button>',
		link: function ($scope, element, attrs) {
			var button = angular.element(element);
			element.bind('click', function(){
				screenfull.request();
			});
		},
		transclude: true
	};
});
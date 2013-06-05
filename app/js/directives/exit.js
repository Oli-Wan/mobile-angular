angular.module('mobileAngular').directive('exit', function() {
	return {
		restrict: 'A',
		template: '<span class="hidden-phone" ng-transclude></span><i class="icon-off icon-white"></i>',
		link: function ($scope, element, attrs) {
			var button = angular.element(element);
			element.bind('click', function(){
				screenfull.exit();
			});
		},
		transclude: true
	};
});
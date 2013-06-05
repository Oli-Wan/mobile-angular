angular.module('mobileAngular').directive('fullscreenFocus', function(Utils) {
	return {
		restrict: 'A',
		link: function ($scope, element, attrs) {			
			var container = $("#fullscreen-input-container");
			var textarea = container.children("textarea");

			element.bind('focus', function(){
				textarea.on('focus', function() {
					textarea.val(Utils.deepGet(attrs.ngModel, $scope));
					textarea.off("focus");
				});

				textarea.on('blur', function(){
					Utils.deepSet(attrs.ngModel, $scope, textarea.val());
					$scope.$apply();

					textarea.off('blur');
					textarea.val("");
					container.hide();
				});

				container.show();
				textarea.focus();
			});

		}
	};
});
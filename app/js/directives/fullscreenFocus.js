angular.module('mobileAngular').directive('fullscreenFocus', function($parse) {
	return {
		restrict: 'A',
		link: function ($scope, element, attrs) {			
			var container = $("#fullscreen-input-container");
			var textarea = container.children("textarea");

			element.bind('focus', function(){
				var value = $parse(attrs.ngModel);
				textarea.on('focus', function() {
					textarea.val(value($scope));
					textarea.off("focus");
				});

				textarea.on('blur', function(){
					value.assign($scope, textarea.val());
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
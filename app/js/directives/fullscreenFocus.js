angular.module('mobileAngular').directive('fullscreenFocus', function(Utils) {
	return {
		restrict: 'A',
		link: function ($scope, element, attrs) {			
			var container = $("#fullscreen-input-container");
			var textarea = container.children("textarea");

			element.bind('focus', function(){
				textarea.val(Utils.deepGet(attrs.ngModel, $scope));
				textarea.focus();
				container.show();
				
				//associate blur
				textarea.bind('blur', function(){
					Utils.deepSet(attrs.ngModel, $scope, textarea.val());
					$scope.$apply();
					// cleanup the textarea
					textarea.unbind('blur');
					textarea.val("");
					container.hide();
				});
			});

		}
	};
});
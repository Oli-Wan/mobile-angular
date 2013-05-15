smurAngular.directive('ngFiles', function() {
	return {
		restrict: 'A',
		scope: { files: "=ngModel" },
		link: function ($scope, element, attrs) {
			if(attrs['ngModel'] === undefined) {
				throw "ngFiles directive : ngModel attribute needed!";
			};

			var input = angular.element(element);
			input.bind('change', function(){
				console.log("New file");
				$scope.files = this.files;
				$scope.$apply();
			});
		}
	};
});

smurAngular.directive('lightBox', function() {
	return {
		restrict: 'E',
		templateUrl: '/partials/directives/light-box.html',
		link: function (scope, element, attrs) {

			attrs.$observe("image", function(value){
				scope.image = value;
			});

			var img = angular.element(element.children()[0]);
			var $overlay = $("#overlay");
			var $lightBox = $("#lightBox");

			if($overlay.length == 0) {
				$("body").append("<div id='overlay'></div>");
				$overlay = $("#overlay");
			}

			if($lightBox.length == 0) {
				$("body").append("<div id='lightBox'><img /></div>");
				$lightBox = $("#lightBox");
			}

			$overlay.on('touchstart', function(){
				$lightBox.hide();
				$(this).hide();
			});

			img.bind("touchstart", function(){
				$lightBoxImg = $("#lightBox>img");
				$lightBoxImg.attr("src", img.attr("src"));
				$lightBox.show();
				$lightBox.css({
					"margin-left": -($lightBoxImg.width()/2),
					"margin-top": -($lightBoxImg.height()/2)
				});

				$overlay.show();
			});
		}
	};
});
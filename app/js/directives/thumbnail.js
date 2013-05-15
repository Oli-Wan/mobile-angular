smurAngular.directive('thumbnail', function() {
	return {
		restrict: 'E',
		scope: { src: "@" },
		templateUrl: '/partials/directives/thumbnail.html',
		link: function ($scope, element, attrs) {
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

			var img = $(element).find("img");
			img.on("touchstart", function(){
				var currentHeight = $(window).height();
				$lightBoxImg = $("#lightBox>img");
				$lightBoxImg.css("max-height", (currentHeight-100).toString()+"px");
				$lightBoxImg.attr("src", $(this).attr("src"));
				$lightBoxImg.load(function(){
					$overlay.show();
					$lightBox.show();
					$lightBox.css({
						"margin-left": -($lightBoxImg.width()/2),
						"margin-top": -($lightBoxImg.height()/2)
					});
				});
			});
		}
	};
});

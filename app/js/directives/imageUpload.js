
smurAngular.directive('imageUpload', function(url, ImageStorage) {
	return {
		restrict: 'E',
		scope: { image:'=image' },
		templateUrl: '/partials/directives/image-upload.html',
		link: function ($scope, element, attrs) {
			//Setup overlay
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

			$scope.showThumbnail = false;
			$scope.$watch('image', function(value){
				if(value !== undefined) {
					$scope.showThumbnail = true;
					ImageStorage.getURL(value).then(function(url) {
						$scope.imageUrl = url;
						$lightBox.children("img").attr("src", url);
					});
				}
			});

			//Setup lightbox
			var img = angular.element(element.children()[1].children[0]);
			img.bind("touchstart", function(){
				var currentHeight = $(window).height();
				$lightBoxImg = $("#lightBox>img");
				$lightBoxImg.css("max-height", (currentHeight-100).toString()+"px");
				$overlay.show();
				$lightBox.show();
				$lightBox.css({
					"margin-left": -($lightBoxImg.width()/2),
					"margin-top": -($lightBoxImg.height()/2)
				});
			});

			// File upload
			$scope.setFile = function(element) {
				var reader = new FileReader();
				var image = element.files[0];
				ImageStorage.save(image.name, image).then(function() {
					$scope.image = image.name;
				});
			};
		}
	};
});
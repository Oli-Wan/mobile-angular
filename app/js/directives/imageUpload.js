
smurAngular.directive('imageUpload', function(url, Utils) {
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
					var blob = Utils.dataURLToBlob(value);
					$scope.imageUrl = url.createObjectURL(blob);
				}
			});

			//Setup lightbox
			var img = angular.element(element.children()[1].children[0]);
			img.bind("touchstart", function(){
				var currentHeight = $(window).height();
				$lightBoxImg = $("#lightBox>img");
				$lightBoxImg.css("max-height", (currentHeight-50).toString()+"px");
				$lightBoxImg.attr("src", img.attr("src"));
				$lightBox.show();
				$lightBox.css({
					"margin-left": -($lightBoxImg.width()/2),
					"margin-top": -($lightBoxImg.height()/2)
				});

				$overlay.show();
			});

			// File upload
			$scope.setFile = function(element) {
				var reader = new FileReader();
				var f = element.files[0];
				reader.onloadend = function(event){
					$scope.$apply(function() {
						$scope.image = event.target.result;
						var blob = Utils.dataURLToBlob($scope.image);
						$scope.imageUrl = url.createObjectURL(blob);
					});
				};
				reader.readAsDataURL(f);
			};
		}
	};
});
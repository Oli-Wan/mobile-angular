angular.module('mobileAngular').controller("UpdateMissionController", 
	function ($scope, $window, $routeParams, url, Mission, ImageStorage) {	
		$scope.$watch('mission', function(value){
			if(!value || !value.image)
				return;

            console.log(value.image);

 			ImageStorage.getURL(value.image).then(function(url) {
                console.log(url);
				$scope.imageUrl = url;
			});
		});

		$scope.$watch('image', function(value) {
			if(!value)
				return;

			$scope.imageUrl = url.createObjectURL(value[0]);
		}, true);

		$scope.save = function() {
			if($scope.image !== undefined && $scope.image.length > 0 ) {
				var imageName = $scope.mission.image;
				var imageFile = $scope.image[0];

				if(imageName) {
					ImageStorage.remove(imageName);
				}

                console.log('saving image');
				ImageStorage.save(imageFile.name, imageFile);
				$scope.mission.image = imageFile.name;	
			}
			
			Mission.notifyAndSave($scope.mission).then(function() {
				$scope.alerts = [];
				$scope.alerts.push({
					type: "success",
					title: "Succès",
					content: "Mission mise à jour avec succès"
				});
				$window.scrollTo(0,0);
			});
		};

        $scope.print = function(){

        };
	});

smurAngular.controller("UpdateMissionController", 
	function UpdateMissionController($scope, $window, $routeParams, url, Mission, ImageStorage) {

		$scope.$watch('mission', function(value){
			console.log("watch");
			if(!value || !value.image)
				return;

			console.log(value);
			ImageStorage.getURL(value.image).then(function(url) {
				console.log(url);
				$scope.imageUrl = url;
			});
		});

		$scope.$watch('image', function(value) {
			console.log("Image watcher");
			console.log(value);
			if(!value)
				return;
			console.log("Value exists");
			$scope.imageUrl = url.createObjectURL(value[0]);
		}, true);

		$scope.save = function() {
			if(imageFile !== undefined && imageFile.length > 0 ) {
				var imageName = $scope.mission.image;
				var imageFile = $scope.image[0];

				if(imageName) {
					ImageStorage.remove(imageName);
				}

				ImageStorage.save(imageFile.name, imageFile);
				$scope.mission.image = imageFile.name;	
			}
			

			Mission.save($scope.mission).then(function() {
				$scope.alerts = [];
				$scope.alerts.push({
					type: "success",
					title: "Succès",
					content: "Mission mise à jour avec succès"
				});
				$window.scrollTo(0,0);
			});
		};
	});

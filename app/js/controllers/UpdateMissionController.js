angular.module('mobileAngular').controller("UpdateMissionController", 
	function ($scope, $window, $routeParams, url, Mission, ImageStorage) {
		if($scope.mission.caller === undefined) {
			console.log("init caller")
			$scope.mission.caller = {
				firstname: "",
				lastname: "",
				phone: ""
			};
			console.log($scope.mission);
		}

		$scope.$watch('mission', function(value){
			if(!value || !value.image)
				return;

 			ImageStorage.getURL(value.image).then(function(url) {
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
	});

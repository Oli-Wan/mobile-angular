
smurAngular.controller('MissionsController', 
	function MissionsController($scope, Mission, $location, $window, $rootScope, $timeout){
		Mission.getAll().then(function(data){
			$scope.missions = data;
		});

		$scope.navigateTo = function(mission) {
			$location.url("/mission/"+mission.id).search({page: "mission"});
		};

		$scope.goToNewMission = function(){
			$location.url('/mission/new');
		};

		$scope.deleteModal = function(id) {
			var confirm = $window.confirm("Êtes vous sûr de vouloir supprimer la mission #"+id);
			if(confirm) {
				Mission.remove(id).then(function(){
					Mission.getAll().then(function(data){
						$scope.missions = data;
					});
				});
			}
		};
	});
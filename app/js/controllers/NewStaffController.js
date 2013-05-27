
smurAngular.controller("NewStaffController", 
	function NewStaffController($scope, $http, $location, $routeParams, Mission, Staff, Utils) {
		$scope.staff = {};
		$scope.staff.time = Utils.getCurrentDateAndTime();

		Mission.get(parseInt($routeParams.missionId)).then(function(data){
			$scope.mission = data;
		});

		Staff.getAll().then(function(data) {
			$scope.persons = data;
		});
		
		$http.get('/resources/functions.json').success(function(data){
			$scope.functions = data;
		});

		$scope.back = function() {
			$location.url("/mission/"+$routeParams.missionId).search({page: "staff"});
		};

		$scope.add = function() {
			if($scope.mission.staff === undefined)
				$scope.mission.staff = [];
			
			$scope.mission.staff.push($scope.staff);
			Mission.save($scope.mission).then(function(){
				$scope.back();
			});
		};
	});

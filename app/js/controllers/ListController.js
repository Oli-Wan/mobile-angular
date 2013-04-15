
smurAngular.controller('ListController', 
	function ListController($scope, $http, Mission){
		$scope.missions = Mission.query();

		 $http.get("/resources/vehicles.json").success(function(data){
		 	$scope.vehicles = data;
		 });

		 $http.get("/resources/responsibles.json").success(function(data){
		 	$scope.responsibles = data;
		 });

		 $scope.add = function(){
		 	console.log("Saving");
		 	console.log($scope.vehicle);
		 	console.log($scope.responsible);
		 	console.log($scope.password);
		 };
	});
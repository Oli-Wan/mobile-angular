
smurAngular.controller('ListController', 
	function ListController($scope, Mission){
		$scope.missions = Mission.query(function(){
			console.log("done");
		});
	});
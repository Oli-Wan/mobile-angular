mobileAngular.controller('CommandController', 
	function CommandController($scope, Command) {
		$scope.commands = [];
		Command.getAllSorted().then(function(data){
			console.log(data);
			$scope.commands = data;
		});
	});
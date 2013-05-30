mobileAngular.controller('CommandController', 
	function CommandController($scope, Command) {
		Command.getAllSorted().then(function(data){
			$scope.commands = data;
		});
	});
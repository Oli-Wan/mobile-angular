angular.module('mobileAngular').controller('CommandController', 
	function ($scope, Command) {
		$scope.commands = [];
		Command.getAllSorted().then(function(data){
			console.log(data);
			$scope.commands = data;
		});
	});
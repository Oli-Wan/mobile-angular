smurAngular.controller('CommandController', 
	function CommandController($scope, $timeout, $location, Command) {
		$scope.swipeLeft = [];
		$scope.swipeRight = [];

		$scope.toggleChange = function() {
			$scope.change = true;
			$timeout(function(){
				$scope.change = false;
			}, 500);
		};

		console.log("Command controller");
		$scope.nb = 0;
		$scope.notificationsVisible = false;

		$scope.$on('dataChanged', function() {
			$scope.loadNewCommands();
		});

		$scope.loadNewCommands = function() {
			Command.getNewCommands().then(function(data){
				console.log(data);
				$scope.notifications = data;

				if(data.length > $scope.nb )
					$scope.toggleChange();

				$scope.nb = data.length;		
			});
		};

		$scope.loadNewCommands();

		$scope.toggleNotifcations = function() {
			$scope.notificationsVisible = !$scope.notificationsVisible;
		};

		$scope.swipeLeft = function(command, index) {
			$scope.swipe(command, $scope.swipeLeft, index)
		};

		$scope.swipeRight = function(command, index) {
			$scope.swipe(command, $scope.swipeRight, index)
		};

		$scope.swipe = function(command, array, index) {
			command.status = "read";
			array[index] = true;
			Command.save(command).then(function(){
				$scope.nb = $scope.nb - 1;
			});
		};

		$scope.goToNotification = function(command) {
			command.status = "read";

			Command.save(command).then(function(){
				$scope.loadNewCommands();
				$scope.toggleNotifcations();
			});

			if(command.data.type = "delete")
				$location.url("/");
			else
				$location.url("/mission/"+command.data.id).search({page: "mission"});
		};
	});
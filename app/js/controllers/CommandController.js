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

		$scope.nb = 0;
		$scope.notificationsVisible = false;

		$scope.$on('dataChanged', function() {
			$scope.loadNewCommands();
		});

		$scope.loadNewCommands = function() {
			$scope.swipeLeft = [];
			$scope.swipeRight = [];

			Command.getNewCommands().then(function(data){
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

		$scope.hide = function(command) {
			command.status = "read";
			Command.save(command).then(function(){
				$scope.loadNewCommands();
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
mobileAngular.controller('NotificationController', 
	function NotificationController($scope, $timeout, $location, $route, Command) {
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
				$scope.commands = data;

				if(data.length > $scope.nb )
					$scope.toggleChange();

				$scope.nb = data.length;		
			});
		};

		$scope.loadNewCommands();

		$scope.toggleNotifcations = function() {
			$scope.notificationsVisible = !$scope.notificationsVisible;
		};

		$scope.hide = function(command) {
			command.status = "read";
			Command.save(command).then(function(){
				$scope.loadNewCommands();
			});
		};

		$scope.clear = function() {
			for(var i = 0; i < $scope.commands.length; i++) {
				var command = $scope.commands[i];
				command.status = "read";
				Command.save(command).then(function(){
					$scope.loadNewCommands();
				});
			}
		};

		$scope.goToNotification = function(command) {
			command.status = "read";

			Command.save(command).then(function(){
				$scope.loadNewCommands();
				$scope.toggleNotifcations();
			});

			if(command.data.type == "delete")
				$location.url("/");
			else {
				var url = "/mission/"+command.data.id;
				var currentPath = $location.path();
				if(url == currentPath)
					$route.reload();
				else
					$location.path(url).search({page: "mission"});
			}
		};

		$scope.goToDetails = function(){
			$location.path('/commands/');
		};

		$scope.$on('$routeChangeStart', function() { 
			if($scope.notificationsVisible)
				$scope.notificationsVisible = false;
		});

	});
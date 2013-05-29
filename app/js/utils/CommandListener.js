mobileAngular.run( function(SocketService, $http, ClientID, CommandUtils, localStorage, Backend, $rootScope) {
	var fetch = function() {	
		var lastCmd = localStorage.getItem("LAST_CMD");
		var getParams = "";
		if(lastCmd) 
			getParams = '?{"date": {"$gt":' + lastCmd +'},"$sort": {"date": 1}}';

		$http.get(Backend.get()+'/commands'+getParams).success(function(commands) {
			var recursiveFn = function(count, array) {
				if(count >= array.length)
					return;

				var command = array[count];
				CommandUtils.handleCommand(command, function() {
					recursiveFn(++count, array)
				});
			};

			recursiveFn(0, commands);
		});
	};

	SocketService.on('commands:new', function(command) {
		localStorage.setItem("LAST_CMD", command.date);
		var clientId = ClientID.get();
		console.log(command.origin, clientId);
		if(command.origin == clientId)
			return;

		CommandUtils.handleCommand(command);
	});

	SocketService.on('error', function(){
		$rootScope.$broadcast('offline');
	});

	SocketService.on('disconnect', function(){
		$rootScope.$broadcast('offline');
	});
	SocketService.on('reconnect', function(){
		$rootScope.$broadcast('online');
	});

	SocketService.on('connect', fetch);
});

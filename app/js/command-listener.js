mobileAngular.run( function(SocketService, StoreProvider, $rootScope, $http, ClientID, Command, CommandUtils, localStorage, Backend) {
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

	SocketService.on('disconnect', function(){
		console.log("disconnected");
		// broadcast throughout the app
	});
	SocketService.on('reconnect', function(){
		console.log("Back online");
	});

	SocketService.on('connect', fetch);
});

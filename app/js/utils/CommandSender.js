mobileAngular.run(function($timeout, $http, Command) {
	var pollingInterval = 5000;
	$timeout(function sendingFunction(){
		Command.getNonSentCommands().then(function(data){
			if(data.length == 0) {
				console.log("Nothing to send");
				return;
			}

			var send = function(data, count) {
				if(count >= data.length)
					return;

				var cmd = data[count];
				var postData = JSON.parse(JSON.stringify(cmd));
				delete postData["id"];
				$http.post('http://localhost:2403/commands', postData).success(function(){
					cmd.status = "sent";
					Command.save(cmd).then(function(){
						send(data, ++count);
					});
				}).error(function(){
					console.log("Couldn't send the command, will try again later");
				});
			};
			send(data, 0);
		});
		$timeout(sendingFunction, pollingInterval);
	}, pollingInterval);
});
mobileAngular.run(function($timeout, $http, Command, Backend) {
	var pollingInterval = 5000;
	$timeout(function sendingFunction(){
		Command.getNonSentCommands().then(function(data){
			if(data.length == 0) {
				return;
			}

			var send = function(data, count) {
				if(count >= data.length)
					return;

				var cmd = data[count];
				var postData = JSON.parse(JSON.stringify(cmd));
				delete postData["id"];
				$http.post(Backend.get()+'/commands', postData).success(function(){
					cmd.status = "sent";
					Command.save(cmd).then(function(){
						send(data, ++count);
					});
				})
			};
			send(data, 0);
		});
		$timeout(sendingFunction, pollingInterval);
	}, pollingInterval);
});
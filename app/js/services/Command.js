smurAngular.factory("Command", function Command($q, $rootScope, $http, $timeout, clientId, SocketService, Mission){
	var storeWrapper = {
		store: undefined,
		getStore: function() {
			var deferred = $q.defer();
			if(this.store)
				deferred.resolve(this.store)
			else
			{
				this.store = new IDBStore({
					dbVersion: 2,
					storeName: 'commands',
					keyPath: 'id',
					autoIncrement: true,
					onStoreReady: function() {
						var storeReady = this;
						$rootScope.$apply(function(){
							deferred.resolve(storeReady);
						});
					},
					indexes: [
					{ name: "origin" },
					{ name: "date" },
					{ name: "status" }
					]
				});
			}
			return deferred.promise;
		}
	};

	storeWrapper.getNonSentCommands = function(){
		var deferred = $q.defer();
		storeWrapper.getStore().then(function(store){
			var keyRange = store.makeKeyRange({
				lower: "waiting",
				upper: "waiting"
			});
			store.query(function(data) {
				console.log(data);
				$rootScope.$apply(function(){
					deferred.resolve(data);
				});
			}, {
				"index":"status",
				"keyRange":keyRange
			});
		});
		return deferred.promise;
	};

	// post cmds to the server
	$timeout(function sendingFunction(){
		console.log("Sending messages");
		storeWrapper.getNonSentCommands().then(function(data){
			if(data.length == 0) {
				console.log("Nothing new");
				return;
			}

			var send = function(data, count) {
				if(count >= data.length)
					return;

				var cmd = data[count];
				var postData = JSON.parse(JSON.stringify(cmd));
				delete postData["id"];
				$http.post('http://localhost:2403/commands', postData).success(function(){
					console.log("Command sent");
					cmd.status = "sent";
					console.log(cmd);
					storeWrapper.getStore().then(function(store){
						store.put(cmd, function(){
							console.log("status changed");
							send(data, ++count);
						});
					});
				}).error(function(){
					console.log("Couldn't send the command, will try again later");
				});
			};

			send(data, 0);
		});
		$timeout(sendingFunction, 10000);
	}, 10000);

	console.log(SocketService);
	// retrieve distant commands in realtime
	SocketService.on('commands:new', function(command) {
		console.log()
		console.log(command);

		var storeName = command.entity;
		var store;
		if(store == "mission") {
			store = Mission;
		}
	});

	// put cmd in local store
	return {
		sendIfNeeded: function(store, data) {
			console.log("sendIfNeeded");
			console.log(store);
			console.log(data);
			var deferred = $q.defer();
			store.get(data.id, function(currentData){
				var cmdData;
				var diffArray = new Array();
				if(!currentData) {
					for(var property in data) {
						diffArray.push({
							attribute: property,
							new_val: data[property],
							old_val: ""
						});
					}
				} else {
					for(var property in data) {
						if(data[property] != currentData[property]) {
							diffArray.push({
								attribute: property,
								new_val: data[property],
								old_val: currentData[property]
							});
						}
					}
				}

				if(diffArray.length > 0) {
					var diff = {
						entity: store.storeName,
						id: data.id,
						changes : diffArray
					}; 

					var cmd = {}; 
					cmd.date = new Date();
					cmd.origin = clientId;
					cmd.status = "waiting";
					cmd.data = diff;
					storeWrapper.getStore().then(function(store){
						console.log("New command");
						console.log(cmd);
						store.put(cmd, function(){	
							$rootScope.$apply(function(){
								deferred.resolve();
							});
						});
					});
				} else {					
					$rootScope.$apply(function(){		
						deferred.resolve();
					});
				}
			});
			return deferred.promise;
		}
	};
});
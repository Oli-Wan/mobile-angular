mobileAngular.controller('BootstrapController', 
	function BootstrapController($scope, $http, ClientID, Backend, localStorage, Command, Vehicle, Staff, $window, StoreProvider, $rootScope) {
		var boostrapedKey = "SMUR_BOOSTRAPED";
		$scope.boostraped = localStorage.getItem(boostrapedKey);
		$scope.progress = 0;

		$scope.$watch('progress', function(newValue){
			if(newValue >= 100)
				$scope.ready = true;
		});

		$scope.save = function(){
			$scope.alerts = [];
			ClientID.set($scope.clientID);
			Backend.set($scope.backend);
			$scope.progress += 10;
			var persons = $http.get($scope.backend+'/persons').
			success(function(data){
				var count = 0;
				Staff.clear().then(function(){
					var recursivePut = function(count, data){
						var element = data[count];
						var dbObject = {
							"firstname": element.firstname,
							"lastname": element.lastname,
							"function": {
								store: "function",
								id: element.function
							}  
						};
						Staff.save(dbObject).then(function(){
							count++;
							if(count < data.length)
								recursivePut(count, data);
							else
								$scope.progress += 30;
						});
					};
					recursivePut(count, data);
				});
			}).
			error(function(){
				$scope.alerts.push({
					"type": "error",
					"title": "Impossible de récupérer les données. Vérifiez que l'adresse du serveur est bonne et qu'il est lancé"
				});
			});

			$http.get($scope.backend+'/vehicles').success(function(data){
				var count = 0;
				Vehicle.clear().then(function(){
					var recursivePut = function(count, data){
						var element = data[count];
						var dbObject = {
							"name": element.name,
							"type": element.type
						}  

						Vehicle.save(dbObject).then(function(){
							count++;
							if(count < data.length)
								recursivePut(count, data);
							else
								$scope.progress += 30;
						});
					};
					recursivePut(count, data);
				});
			}).
			error(function(){
				$scope.alerts.push({
					"type": "error",
					"title": "Impossible de récupérer les données. Vérifiez que l'adresse du serveur est bonne et qu'il est lancé"
				});
			});

			var handleCommand = function(command, callback) {
				command.status = "read";
				Command.save(command);
				localStorage.setItem("LAST_CMD", command.date);

				var data = command.data;
				var storeName = data.entity;
				var store = StoreProvider.getStoreByName(storeName);
				if(!store) {
					console.log("Unknown entity");
				} else {
					var action = command.data.type;

					if(action == "delete") {
						store.remove(command.data.id).then(function(){
							if(callback)
								callback();
						});
					} else {
						store.get(data.id).then(function(localData){
							if(!localData) {
								localData = {};
								localData.id = data.id;
							}

							var changeArray = data.changes;

							changeArray.forEach(function(element){
								localData[element.attribute] = element.new_val;
							});

							store.save(localData).then(function(){
								if(callback)
									callback();
							});
						});
					}
				}
			};

			$http.get($scope.backend+'/commands'+'?{"$sort": {"date": 1}}').success(function(commands) {
				if(commands.length <= 0) {
					$scope.progress = 100;
					return;
				}

				var step =  30/commands.length;
				var recursiveFn = function(count, array) {
					if(count >= array.length)
						return;

					var command = array[count];
					handleCommand(command, function() {
						$scope.progress += step;
						recursiveFn(++count, array);
					});
				};

				recursiveFn(0, commands);
			});
		};

		$scope.continue = function() {
			localStorage.setItem(boostrapedKey, true);
			$window.location.reload();
		};
	});
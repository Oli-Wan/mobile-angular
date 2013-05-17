smurAngular.factory("Command", 
	function Command($q, $rootScope, $http, $timeout, clientId, IDBService){
		var storeWrapper = {
			store: undefined,
			getStore: function() {
				var deferred = $q.defer();
				if(this.store) {
					deferred.resolve(this.store);
				} else {
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
		var idbService = IDBService.getIDBCrudObject(storeWrapper);
		idbService.sendIfNeeded = function(store, data, fromOutside) {
			var start = Date.now();
			var deferred = $q.defer();

			store.get(data.id, function(currentData) {
				// let the other instruction run in parallel as with get the data
				$rootScope.$apply(deferred.resolve());
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
					cmd.date = Date.now();
					cmd.origin = clientId;
					cmd.status = "waiting";
					cmd.data = diff;

					storeWrapper.getStore().then(function(cmdStore){	
						cmdStore.put(cmd);
					});
				}
			});
			return deferred.promise;
		};
		idbService.getNonSentCommands = function(){
			var deferred = $q.defer();
			storeWrapper.getStore().then(function(store){
				var keyRange = store.makeKeyRange({
					lower: "waiting",
					upper: "waiting"
				});
				store.query(function(data) {
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
		return idbService;
	});
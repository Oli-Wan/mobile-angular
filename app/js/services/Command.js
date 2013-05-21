smurAngular.factory("Command", 
	function Command($q, $rootScope, $http, $timeout, clientId, IDBService){
		var storeWrapper = {
			store: undefined,
			getStore: function() {
				var deferred = $q.defer();
				if(this.store) {
					deferred.resolve(this.store);
				} else {
					new IDBStore({
						dbVersion: 2,
						storeName: 'commands',
						keyPath: 'id',
						autoIncrement: true,
						onStoreReady: function() {
							var storeReady = this;
							storeWrapper.store = this;
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
		idbService.sendIfNeeded = function(store, data, action) {
			var start = Date.now();
			var deferred = $q.defer();

			if(action == "delete") {
				deferred.resolve();
				var removal = {
					entity: store.storeName,
					id: data,
					type: "delete"
				}; 

				var cmd = {}; 
				cmd.date = Date.now();
				cmd.origin = clientId;
				cmd.status = "waiting";
				cmd.data = removal;
				storeWrapper.getStore().then(function(cmdStore){
					cmdStore.put(cmd);
				});
			} else {
				store.get(data.id, function(currentData) {
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
							type: "update",
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
			}
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
		idbService.getNewCommands = function() {
			var deferred = $q.defer();
			storeWrapper.getStore().then(function(store){
				var keyRange = store.makeKeyRange({
					lower: "new",
					upper: "new"
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
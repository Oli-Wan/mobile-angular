
smurAngular.factory("Mission", function Mission($q, $rootScope, IDBService, Command){
	var storeWrapper = {
		store: undefined,
		getStore: function() {
			var deferred = $q.defer();
			if(this.store) {
				deferred.resolve(this.store);
			} else {
				new IDBStore({
					dbVersion: 1,
					storeName: 'mission',
					keyPath: 'id',
					autoIncrement: true,
					onStoreReady: function() {
						storeWrapper.store = this;
						var storeReady = this;
						$rootScope.$apply(function(){
							deferred.resolve(storeReady);
						});
					}
				});
			}
			return deferred.promise;
		}
	};
	var service = IDBService.getIDBCrudObject(storeWrapper);
	service.save= function(element) {
		if(element.id === undefined)
			element.id = Date.now();

		var deferred = $q.defer();
		storeWrapper.getStore().then(function(store){
			Command.sendIfNeeded(store, element).then(function(){
				store.put(element, function(){
					$rootScope.$apply(function(){
						deferred.resolve("Sucess");
					});
				});
			});
		});
		return deferred.promise;
	};
	return service;
});
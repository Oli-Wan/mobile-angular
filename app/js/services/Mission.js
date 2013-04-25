
smurAngular.factory("Mission", function Mission($timeout, $q, $rootScope, IDBService){
	var storeWrapper = {
		getStore: function() {
			var deferred = $q.defer();
			var a = new IDBStore({
				dbVersion: 1,
				storeName: 'mission',
				keyPath: 'id',
				autoIncrement: true,
				onStoreReady: function() {
					var store = this;
					$rootScope.$apply(function(){
						deferred.resolve(store);
					});
				}
			});
			return deferred.promise;
		}
	};
	return IDBService.getIDBCrudObject(storeWrapper);
});
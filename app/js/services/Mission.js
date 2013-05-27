
mobileAngular.factory("Mission", function Mission($q, $rootScope, SyncedResourceService){
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

	return SyncedResourceService.syncedResourceManager(storeWrapper);
});
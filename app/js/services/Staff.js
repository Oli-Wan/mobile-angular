
mobileAngular.factory("Staff", function Staff($q, $rootScope, IDBService){
	var storeWrapper = {
		store: undefined,
		getStore: function() {
			var deferred = $q.defer();
			if(this.store)
				deferred.resolve(this.store)
			else
			{
				new IDBStore({
					dbVersion: 2,
					storeName: 'staff',
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
	return IDBService.getIDBCrudObject(storeWrapper);
});
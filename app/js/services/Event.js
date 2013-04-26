
smurAngular.factory("Event", function Event($q, $rootScope, IDBService){
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
					storeName: 'event',
					keyPath: 'id',
					autoIncrement: true,
					onStoreReady: function() {
						var storeReady = this;
						console.log("new");
						$rootScope.$apply(function(){
							deferred.resolve(storeReady);
						});
					},
					indexes: [
					{ name: "missionId" }
					]
				});
			}
			return deferred.promise;
		}
	};

	var idbService = IDBService.getIDBCrudObject(storeWrapper);
	idbService.getByMissionId = function(missionId){
		var id = parseInt(missionId);
		var deferred = $q.defer();
		storeWrapper.getStore().then(function(store){
			var keyRange = store.makeKeyRange({
				lower: id,
				upper: id
			});
			store.query(function(data) {
				$rootScope.$apply(function(){
					deferred.resolve(data);
				});
			}, {
				"index":"missionId",
				"keyRange":keyRange
			});
		});
		return deferred.promise;
	};
	return idbService;
});

angular.module('mobileAngular').factory("Event", function ($q, $rootScope, IDBService){
	var storeWrapper = {
		store: undefined,
		getStore: function() {
			var deferred = $q.defer();
			if(this.store)
				deferred.resolve(this.store);
			else
			{
				new IDBStore({
					dbVersion: 2,
					storeName: 'event',
					keyPath: 'id',
					autoIncrement: true,
					onStoreReady: function() {
						storeWrapper.store = this;
						var storeReady = this;
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
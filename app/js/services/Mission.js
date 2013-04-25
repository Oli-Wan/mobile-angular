
smurAngular.factory("Mission", function Mission($timeout, $q, $rootScope){
	var storeWrapper = {
		ready:false,
		getStore: function() {
			return $timeout(waitForStore);
		},
		store: new IDBStore({
			dbVersion: 1,
			storeName: 'mission',
			keyPath: 'id',
			autoIncrement: true,
			onStoreReady: function() {
				storeWrapper.ready = true;
			}
		})
	};

	var waitForStore = function() {
		if(storeWrapper.ready)
			return storeWrapper.store;
		else
			return $timeout(waitForStore, 100);
	}

	return {
		getAll: function() {
			var deferred = $q.defer();
			storeWrapper.getStore().then(function(store){
				store.getAll(function(data){
					$rootScope.$apply(function(){
						deferred.resolve(data);
					});
				});
			});
			return deferred.promise;
		},
		get: function(id) {
			var deferred = $q.defer();
			storeWrapper.getStore().then(function(store){
				store.get(id, function(data) {

					$rootScope.$apply(function(){
						deferred.resolve(data);
					});
				});
			});
			return deferred.promise;
		},
		remove: function(id) {
			var deferred = $q.defer();
			storeWrapper.getStore().then(function(store) {
				store.remove(id, function(){
					$rootScope.$apply(function(){
						deferred.resolve("Sucess");
					});
				});
			});
			return deferred.promise;
		},
		save: function(mission) {
			var deferred = $q.defer();
			storeWrapper.getStore().then(function(store){
				store.put(mission, function(){
					deferred.resolve("Sucess");
				});
			});
			return deferred.promise;
		}
	};
});
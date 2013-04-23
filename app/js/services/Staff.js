
smurAngular.factory("Staff", function Staff($timeout){
	var storeWrapper = {
		ready:false,
		setReady: function() {
			this.ready = true;
		},
		getStore: function() {
			console.log("Getting store");
			return $timeout(waitForStore);
		},
		store: new IDBStore({
			dbVersion: 1,
			storeName: 'staff',
			keyPath: 'id',
			autoIncrement: true,
			onStoreReady: function() {
				storeWrapper.setReady();
			}
		})
	};

	function waitForStore() {
		console.log("Wait for store");
		if(storeWrapper.ready) {
			console.log("Store : "+storeWrapper);
			return storeWrapper.store;
		}
		else {
			return $timeout(waitForStore, 100);
		}
	}
	return storeWrapper;
});
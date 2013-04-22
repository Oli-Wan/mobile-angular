
smurAngular.factory("Event", function Event($timeout){
	var storeWrapper = {
		ready:false,
		setReady: function() {
			this.ready = true;
		},
		getStore: function() {
			return $timeout(waitForStore);
		},
		store: new IDBStore({
			dbVersion: 1,
			storeName: 'event',
			keyPath: 'id',
			autoIncrement: true,
			onStoreReady: function() {
				storeWrapper.setReady();
			},
			indexes: [
			{ name: "missionId" }
			]
		})
	};

	function waitForStore() {
		if(storeWrapper.ready) {
			return storeWrapper.store;
		}
		else {
			return $timeout(waitForStore, 100);
		}
	}
	return storeWrapper;
});
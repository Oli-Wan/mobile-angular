
smurAngular.factory("Mission", function Mission(){
	var storeWrapper = {
		ready:false,
		setReady: function() {
			this.ready = true;
		}
	}

	storeWrapper.store =  new IDBStore({
		dbVersion: 1,
		storeName: 'mission',
		keyPath: 'id',
		autoIncrement: true,
		onStoreReady: function() {
			storeWrapper.setReady();
		}
	});

	return storeWrapper;
});
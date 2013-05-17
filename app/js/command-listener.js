smurAngular.run(function(SocketService, StoreProvider, $rootScope) {
	SocketService.on('commands:new', function(command) {
		var data = command.data;
		var storeName = data.entity;

		var store = StoreProvider.getStoreByName(storeName);
		if(!store) {
			console.log("Unknown entity");
			return;
		}

		store.get(data.id).then(function(localData){
			if(!localData) {
				localData = {};
				localData.id = data.id;
			}

			var changeArray = data.changes;

			changeArray.forEach(function(element){
				localData[element.attribute] = element.new_val;
			});

			store.save(localData).then(function(){
				$rootScope.$broadcast('dataChanged');
			});
		});
	});
});

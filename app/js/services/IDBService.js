 smurAngular.service("IDBService", 
 	function IDBService($q, $rootScope){
 		return {
 			getIDBCrudObject: function(storeWrapper) {
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
 					save: function(element) {
 						if(element.id === undefined)
 							element.id = Date.now();

 						var deferred = $q.defer();
 						storeWrapper.getStore().then(function(store){
 							store.put(element, function(){
 								$rootScope.$apply(function(){
 									deferred.resolve("Sucess");
 								});
 							});
 						});
 						return deferred.promise;
 					},
 					clear: function() {
 						var deferred = $q.defer();
 						storeWrapper.getStore().then(function(store){
 							store.clear(function(){
 								$rootScope.$apply(function(){
 									deferred.resolve("Sucess");
 								});
 							});
 						});
 						return deferred.promise;
 					}
 				};
 			}
 		};
 	});

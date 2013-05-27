 smurAngular.service("SyncedResourceService", 
 	function SyncedResourceService($q, $rootScope, IDBService, Command){
 		return {
 			syncedResourceManager: function(storeWrapper) {
 				var service = IDBService.getIDBCrudObject(storeWrapper);

 				service.notifyAndRemove = function(id) {
 					var deferred = $q.defer();
 					storeWrapper.getStore().then(function(store){
 						Command.sendIfNeeded(store, id, "delete").then(function(){
 							service.remove(id).then(function(){
 								deferred.resolve();
 							});
 						});
 					});
					return deferred.promise;
 				};

 				service.notifyAndSave= function(element) {
 					var deferred = $q.defer();

 					if(element.id === undefined)
 						element.id = Date.now();

 					storeWrapper.getStore().then(function(store){
 						Command.sendIfNeeded(store, element, "update").then(function(){
 							service.save(element).then(function(){
 								deferred.resolve();
 							});
 						});
 					});
 					return deferred.promise;
 				};

 				return service;
 			}
 		};
 	});

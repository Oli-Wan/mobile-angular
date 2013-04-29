 smurAngular.service("IDBService", function IDBService($q, $rootScope){
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
 				save: function(mission) {
 					var deferred = $q.defer();
 					storeWrapper.getStore().then(function(store){
 						console.log("saving");
 						console.log(store);
 						store.put(mission, function(){
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

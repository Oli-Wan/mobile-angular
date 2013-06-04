 angular.module('mobileAngular').service("CommandUtils", function (StoreProvider, Command, $rootScope){
 	return {
 		handleCommand: function(command, callback, notify, status) {
 			if(status)
 				command.status = status;
 			else
 				command.status = "new";

 			if(notify === undefined)
 				notify = true;

 			Command.save(command);
 			localStorage.setItem("LAST_CMD", command.date);

 			var data = command.data;
 			var storeName = data.entity;
 			var store = StoreProvider.getStoreByName(storeName);
 			
 			if(!store) {
 				console.log("Unknown entity");
 				if(callback)
 					callback();
 				return;
 			}
 			var action = command.data.type;

 			if(action == "delete") {
 				store.remove(command.data.id).then(function(){
 					if(notify)
 						$rootScope.$broadcast('dataChanged');

 					if(callback)
 						callback();
 				});
 			} else {
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
 						if(notify)
 							$rootScope.$broadcast('dataChanged');

 						if(callback)
 							callback();
 					});
 				});
 			}
 		}
 	};
 });
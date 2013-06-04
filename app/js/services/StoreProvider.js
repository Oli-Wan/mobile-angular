  angular.module('mobileAngular').service("StoreProvider", function (Mission, Event, Vehicle, Staff){
 		return {
 			getStoreByName: function(name) {
 				if(name == "mission")
 					return Mission;
 				else if(name == "event")
 					return Event;
 				else if(name == "vehicle")
 					return Vehicle;
 				else if(name == "person")
 					return Staff;
 				else 
 					return undefined;
 			}
 		};

 	});

smurAngular.controller("IDBManagementController", 
	function IDBManagementController($scope, $http, Mission, Staff, Event) {
		$scope.deleteMission = function() {
			Mission.getStore().then(function(store) {
				store.deleteDatabase();
			});
		};

		$scope.deleteStaff = function() {
			Staff.getStore().then(function(store) {
				store.deleteDatabase();
			});
		};

		$scope.deleteEvent = function() {
			Event.getStore().then(function(store) {
				store.deleteDatabase();
			});
		};

		$scope.clearMission = function() {
			Mission.getStore().then(function(store){
				store.clear(function() {
					console.log("Mission cleared");
				});
			});
		};

		$scope.clearStaff = function() {
			Staff.getStore().then(function(store){
				store.clear(function() {
					console.log("Staff cleared");
				});
			});
		};

		$scope.clearEvent = function() {
			Event.getStore().then(function(store){
				store.clear(function() {
					console.log("Event cleared");
				});
			});
		};

		$scope.populateStaff = function() {
			console.log("Populating");
			$http.get('/resources/persons.json').success(function(data){
				console.log(data);
				var count = 0;
				Staff.getStore().then(function(store){
					store.clear();
				});
				console.log("Cleared");
				var recursivePut = function(count, data){
					console.log("#"+count+" "+data[count]);
					var element = data[count];
					var dbObject = {
						"firstname": element.firstname,
						"lastname": element.lastname,
						"function": {
							store: "function",
							id: element.function
						}  
					};
					console.log(dbObject);
					Staff.getStore().then(function(store){
						console.log("store ok")
						store.put(dbObject, function(){
							console.log("PUT");
							count++;
							if(count < data.length)
								recursivePut(count, data);
						}, function(error) {
							console.log(error);
						});
					});
				};
				recursivePut(count, data);
			});
		};

	});
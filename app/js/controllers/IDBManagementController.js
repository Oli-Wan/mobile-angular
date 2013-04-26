smurAngular.controller("IDBManagementController", 
	function IDBManagementController($scope, $http, Mission, Staff, Event, Vehicle) {
		$scope.clearMission = function() {
			Mission.clear().then(function() {
				console.log("Mission cleared");
			});
		};

		$scope.clearStaff = function() {
			Staff.clear().then(function() {
				console.log("Staff cleared");
			});
		};

		$scope.clearEvent = function() {
			Event.clear().then(function() {
				console.log("Event cleared");
			});
		};

		$scope.clearVehicle = function() {
			Vehicle.clear().then(function() {
				console.log("Vehicle cleared");
			});
		};

		$scope.populateStaff = function() {
			$http.get('/resources/persons.json').success(function(data){
				var count = 0;
				Staff.clear().then(function(){
					var recursivePut = function(count, data){
						var element = data[count];
						var dbObject = {
							"firstname": element.firstname,
							"lastname": element.lastname,
							"function": {
								store: "function",
								id: element.function
							}  
						};
						Staff.save(dbObject).then(function(){
							count++;
							if(count < data.length)
								recursivePut(count, data);
						});
					};
					recursivePut(count, data);
				});
			});
		};

		$scope.populateVehicle = function() {
			$http.get('/resources/vehicles.json').success(function(data){
				var count = 0;
				Vehicle.clear().then(function(){
					var recursivePut = function(count, data){
						var element = data[count];
						var dbObject = {
							"name": element.name,
							"type": element.type
						}  
						Vehicle.save(dbObject).then(function(){
							count++;
							if(count < data.length)
								recursivePut(count, data);
						});
					};
					recursivePut(count, data);
				});
			});
		};
	});
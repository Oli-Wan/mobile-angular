
smurAngular.controller("StaffController", 
	function StaffController($scope, $routeParams, $http, $location, Mission, Staff){
		Mission.getStore().then(function(store){
			store.get(parseInt($routeParams.missionId), function(data) {
				$scope.mission = data;
				$scope.staff = [];
				$scope.mission.staff.forEach(function(element, index, array) {
					Staff.getStore().then(function(staffStore){
						staffStore.get(parseInt(element.id), function(data){
							$scope.staff.push(data);
							$scope.$apply();
						});
					});
				});
			});
		});

		$http.get('/resources/functions.json').success(function(data){
			$scope.functions = [];
			data.forEach(function(element, index, array) {
				console.log(element);
				$scope.functions[element.id] = element.name;
				console.log($scope.functions);
			});
		});

		$scope.goToNewStaff = function() {
			$location.url("/mission/"+$scope.mission.id+"/staff/new");
		}

		$scope.populate = function() {
			$http.get('/resources/persons.json').success(function(data){
				var count = 0;
				Staff.getStore().then(function(store){
					store.clear();
				});
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
					Staff.getStore().then(function(store){
						store.put(dbObject, function(){
							console.log("Put!")
							count++;
							if(count < data.length)
								recursivePut(count, data);
						});
					});
				};
				recursivePut(count, data);
			});
		};
	});

smurAngular.controller("StaffController", 
	function StaffController($scope, $routeParams, $http, $location, Mission, Staff){
		Mission.getStore().then(function(store){ 
			store.get(parseInt($routeParams.missionId), function(data) {
				$scope.mission = data;
				$scope.$apply();
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
smurAngular.controller('BootstrapController', 
	function BootstrapController($scope, $http, ClientID, Backend, localStorage, Vehicle, Staff, $window) {
		var boostrapedKey = "SMUR_BOOSTRAPED";
		$scope.boostraped = localStorage.getItem(boostrapedKey);

		$scope.save = function(){
			console.log($scope.clientID, $scope.backend)
			ClientID.set($scope.clientID);
			Backend.set($scope.backend);
			localStorage.setItem(boostrapedKey, "true");

			$window.location.reload();

			$http.get($scope.backend+'/persons').success(function(data){
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

			$http.get($scope.backend+'/vehicles').success(function(data){
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
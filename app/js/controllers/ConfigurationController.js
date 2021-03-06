angular.module('mobileAngular').controller("StorageManagementController", 
	function ($scope, $http, Mission, Staff, Event, Vehicle, FileSystem, FileSystemUtils, persistentStorage, Command, localStorage, ClientID, Backend, FullscreenSetting) {

		$scope.alerts = [];

		$scope.getStorageStats = function(){	
			if(persistentStorage) {
				persistentStorage.queryUsageAndQuota(function (usage, quota) {
					$scope.fs = {};
					$scope.fs.used = usage;
					$scope.fs.total = quota;
					$scope.fs.perc = usage/quota*100;
				});
			} else {
				$scope.fsPolyfill = true;
			}
		};

		$scope.getStorageStats();

		$scope.clientId = ClientID.get();
		$scope.backend = Backend.get();
        $scope.fullscreenEnabled = FullscreenSetting.get();

		$scope.clearMission = function() {
			Mission.clear().then(function() {
				$scope.alerts.push({
					"type": "success",
					"title": "Mission cleared"
				});
			});
		};

		$scope.clearStaff = function() {
			Staff.clear().then(function() {
				$scope.alerts.push({
					"type": "success",
					"title": "Staff cleared"
				});
			});
		};

		$scope.clearEvent = function() {
			Event.clear().then(function() {
				$scope.alerts.push({
					"type": "success",
					"title": "Event cleared"
				});
			});
		};

		$scope.clearVehicle = function() {
			Vehicle.clear().then(function() {
				$scope.alerts.push({
					"type": "success",
					"title": "Vehicle cleared"
				});
			});
		};

		$scope.clearCommand = function() {
			Command.clear().then(function() {
				$scope.alerts.push({
					"type": "success",
					"title": "Command cleared"
				});
			});
		};

		$scope.populateStaff = function() {
			$http.get(Backend.get()+'/persons').success(function(data){
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
							else {
								$scope.alerts.push({
									"type": "success",
									"title": "Personnes ajoutées"
								});
							}
						});
					};
					recursivePut(count, data);
				});
			});
		};

		$scope.populateVehicle = function() {
			$http.get(Backend.get()+'/vehicles').success(function(data){
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
							else {
								$scope.alerts.push({
									"type": "success",
									"title": "Véhicules ajoutés"
								});
							}
						});
					};
					recursivePut(count, data);
				});
			});
		};

		$scope.clearFS = function() {
			FileSystem.getFileSystem().then(function(fs){
				var dirReader = fs.root.createReader();
				var entries = [];

				var readEntries = function() {
					dirReader.readEntries (function(results) {
						if (!results.length) {
							listResults(entries.sort());
						} else {
							entries = entries.concat(Array.prototype.slice.call(results || [], 0));
							entries.forEach(function(entry, i) {
								if(entry.isFile)
									entry.remove($scope.getStorageStats, FileSystemUtils.errorHandler);
								else
									entry.removeRecursively($scope.getStorageStats, FileSystemUtils.errorHandler);
							});
						}
					}, FileSystemUtils.errorHandler);
				};
				readEntries();
			});
		};

		$scope.resetLastCmd = function(){
			localStorage.setItem("LAST_CMD", 0);
			$scope.alerts.push({
				"type": "success",
				"title": "ID de la dernière commande reçue remis à zéro."
			});
		};

		$scope.setClientId = function() {
			ClientID.set($scope.clientId);
			$scope.alerts.push({
				"type": "success",
				"title": "Client ID changé."
			});
		};

		$scope.setBackend = function() {
			Backend.set($scope.backend);
			$scope.alerts.push({
				"type": "success",
				"title": "Backend changé."
			});
		};

        $scope.setFullscreenSetting = function() {
            FullscreenSetting.set($scope.fullscreenEnabled);
            $scope.alerts.push({
                "type": "success",
                "title": "Configuration plein écran modifiée."
            });
        }
	});
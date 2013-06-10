angular.module('mobileAngular').factory("ImageStorage", function ($q, $rootScope, FileSystem, FileSystemUtils){
	return {
		save: function(fileName, blob) {
			var deferred = $q.defer();
			FileSystem.getFileSystem().then(function(fs){
				fs.root.getFile(fileName, {create: true}, function(fileEntry){
					fileEntry.createWriter(function(fileWriter) {
						fileWriter.onwriteend = function(e) {
							$rootScope.$apply(function(){
								deferred.resolve();
							});
						};

						fileWriter.onerror = function(e) {
							console.log("Couldn't save image: " + e.toString());
						};

						fileWriter.write(blob);
					}, FileSystemUtils.errorHandler);
				}, FileSystemUtils.errorHandler);
			});
			return deferred.promise;
		},
		getURL: function(fileName) {
			var deferred = $q.defer();
			FileSystem.getFileSystem().then(function(fs){
				fs.root.getFile(fileName, {}, function(fileEntry) {
					$rootScope.$apply(function(){
						deferred.resolve(fileEntry.toURL());
					});
				}, FileSystemUtils.errorHandler);
			});
			return deferred.promise;
		},
		remove: function(fileName) {
			FileSystem.getFileSystem().then(function(fs){
				fs.root.getFile(fileName, {create: false}, function(fileEntry) {
					fileEntry.remove(function() {}, FileSystemUtils.errorHandler);
				}, FileSystemUtils.errorHandler);
			});
		}
	};	
});
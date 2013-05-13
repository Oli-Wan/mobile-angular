smurAngular.factory("FileSystem", function FileSystem($q, $window, FileSystemUtils){
	var deferred = $q.defer();

	var requestFileSystem  = $window.requestFileSystem || $window.webkitRequestFileSystem;
	var persistentStorage = navigator.persistentStorage || navigator.webkitPersistentStorage;

	var onInit = function(fileSystem) {
		deferred.resolve(fileSystem);
	};

	persistentStorage.requestQuota(10*1024*1024 /*10MB*/, function(grantedQuota){
		requestFileSystem(window.PERSISTENT,grantedQuota , onInit, FileSystemUtils.errorHandler);
	});

	return deferred.promise;
});
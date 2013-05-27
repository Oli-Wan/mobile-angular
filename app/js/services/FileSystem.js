smurAngular.factory("FileSystem", 
	function FileSystem($q, $rootScope, $window, FileSystemUtils, persistentStorage, requestFileSystem){
	var fileSystemWrapper = {
		getFileSystem: function() {
			var deferred = $q.defer();

			var onInit = function(fileSystem) {
				fileSystemWrapper.fileSystem = fileSystem;
				$rootScope.$apply(function(){
					deferred.resolve(fileSystem);
				})
			};

			if(persistentStorage) {
				// Last impl in Chrome
				persistentStorage.requestQuota(10*1024*1024 /*10MB*/, function(grantedQuota){
					requestFileSystem(window.PERSISTENT ,grantedQuota , onInit, FileSystemUtils.errorHandler);
				});
			} else if ($window.webkitStorageInfo) {
				// Legacy/mobile chrome support
				window.webkitStorageInfo.requestQuota(PERSISTENT, 10*1024*1024 /*10MB*/, function(grantedBytes) {
					requestFileSystem(PERSISTENT, grantedBytes, onInit, FileSystemUtils.errorHandler);
				}, function(e) {
					console.log('Error', e);
				});
			} else if(requestFileSystem) {
				requestFileSystem(PERSISTENT,  10*1024*1024, onInit, FileSystemUtils.errorHandler);
			} else {
				$rootScope.$apply(function(){
					deferred.reject("Cannot use FS API");
				});
			}		
			return deferred.promise;
		}
	};
	return fileSystemWrapper;
});
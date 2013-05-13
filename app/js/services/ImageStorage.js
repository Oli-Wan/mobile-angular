smurAngular.factory("ImageStorage", function ImageStorage($q, FileSystem, FileSystemUtils){
	return {
		save: function(fileName, blob) {
			var deffered = $q.defer();
			FileSystem.then(function(fs){
				fs.root.getFile(fileName, {create: true}, function(fileEntry){
					fileEntry.createWriter(function(fileWriter) {

						fileWriter.onwriteend = function(e) {
							console.log('Image saved');
							deffered.resolve();
						};

						fileWriter.onerror = function(e) {
							console.log("Couldn't save image: " + e.toString());
						};

						fileWriter.write(blob);
					}, FileSystemUtils.errorHandler);
				}, FileSystemUtils.errorHandler);
			});
			return deffered.promise;
		},
		getURL: function(fileName) {
			var deffered = $q.defer();
			FileSystem.then(function(fs){
				fs.root.getFile(fileName, {}, function(fileEntry) {
					deffered.resolve(fileEntry.toURL());
				}, FileSystemUtils.errorHandler);
			});
			return deffered.promise;
		}
	};	
});
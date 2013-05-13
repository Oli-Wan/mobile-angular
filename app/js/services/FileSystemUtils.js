smurAngular.factory("FileSystemUtils", function FileSystemUtils($q, $window){
	return {
		errorHandler: function(e) {
			var msg = '';
			switch (e.code) {
				case FileError.QUOTA_EXCEEDED_ERR:
				msg = 'Quota exceeded';
				break;
				case FileError.NOT_FOUND_ERR:
				msg = 'Not found';
				break;
				case FileError.SECURITY_ERR:
				msg = 'Security issue';
				break;
				case FileError.INVALID_MODIFICATION_ERR:
				msg = 'Invalid modification';
				break;
				case FileError.INVALID_STATE_ERR:
				msg = 'Invalid state';
				break;
				default:
				msg = 'Unknown Error';
				break;
			};
			console.log('Error: ' + msg);
		}
	};
});
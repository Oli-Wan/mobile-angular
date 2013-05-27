 smurAngular.service("Utils", function Utils(){
 	return {
 		getCurrentDateAndTime: function(){
 			var currentTime = new Date();
 			return {
 				date: currentTime.getFullYear()+"-"+
 				this.toTwoDigits(currentTime.getMonth()+1)+"-"+
 				this.toTwoDigits(currentTime.getDate()),
 				time: this.toTwoDigits(currentTime.getHours())+":"+
 				this.toTwoDigits(currentTime.getMinutes())
 			};
 		},
 		toTwoDigits: function(value) {
 			var valueString = value.toString();
 			if(valueString.length == 1) {
 				valueString = "0"+valueString;
 			}
 			return valueString;
 		},
 		dataURLToBlob: function(dataURL) {
 			var BASE64_MARKER = ';base64,';
 			if (dataURL.indexOf(BASE64_MARKER) == -1) {
 				var parts = dataURL.split(',');
 				var contentType = parts[0].split(':')[1];
 				var raw = parts[1];

 				return new Blob([raw], {type: contentType});
 			}

 			var parts = dataURL.split(BASE64_MARKER);
 			var contentType = parts[0].split(':')[1];
 			var raw = window.atob(parts[1]);
 			var rawLength = raw.length;

 			var uInt8Array = new Uint8Array(rawLength);

 			for (var i = 0; i < rawLength; ++i) {
 				uInt8Array[i] = raw.charCodeAt(i);
 			}

 			return new Blob([uInt8Array], {type: contentType});
 		}
 	};
 });
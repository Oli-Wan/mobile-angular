 angular.module('mobileAngular').service("Utils", function () {
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
 		},
 		deepGet: function(path, object) {
 			var pathArray = path.split(".");
 			console.log(path, pathArray);
 			return this.deepAccess(pathArray, object);
 		},
 		deepSet: function(path, object, value) {
 			var pathArray = path.split(".");
 			this.deepAccess(pathArray, object, value);
 		},
 		deepAccess: function(pathArray, object, value) {
 			console.log(pathArray, object);
 			if(pathArray.length > 1) {
 				var key = pathArray.shift()
 				var newObject = object[key];
 				
 				if(!newObject && value)
 					newObject = object[key] = {};

 				if(newObject)
 					return this.deepAccess(pathArray, newObject, value);
 			} else {
 				if(value)
 					object[pathArray[0]] = value;
 				else
 					return object[pathArray[0]];
 			}
 		}
 	};
 });
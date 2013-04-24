 smurAngular.service("Utils", function Utils(){
 	return {
 		getCurrentDateAndTime: function(){
 			var currentTime = new Date();
 			return {
 				date: this.toTwoDigits(currentTime.getDate())+"/"+
 					this.toTwoDigits(currentTime.getMonth()+1)+"/"+
 					currentTime.getFullYear(),
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
 		}
 	};
 });
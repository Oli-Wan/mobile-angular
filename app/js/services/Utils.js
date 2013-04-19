 smurAngular.service("Utils", function Utils(){
 	return {
 		getCurrentDateAndTime: function(){
 			var currentTime = new Date();
 			return {
 				date: currentTime.getDate()+"/"+currentTime.getMonth()+"/"+currentTime.getFullYear(),
 				time: currentTime.getHours()+":"+currentTime.getMinutes()
 			};
 		}
 	};
 });
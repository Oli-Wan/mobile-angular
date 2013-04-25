 smurAngular.service("Utils", function Utils($q, $rootScope){
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
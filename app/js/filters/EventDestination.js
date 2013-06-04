angular.module('mobileAngular').filter('eventDestination', function(){
	return function(input) {
		if(input == "intervention")
			return "/partials/mission/events/address.html";
		else if(input == "hospitalisation")
			return "/partials/mission/events/service.html";
		else
			return "";
	};
});
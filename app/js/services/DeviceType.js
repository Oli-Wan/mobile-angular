angular.module('mobileAngular').factory("DeviceType", 
	function ($window){
		var viewport = $window.innerWidth;
		if(viewport < 768)
			return "phone";
		else if(viewport < 980)
			return "tablet";
		else
			return "desktop";
	});
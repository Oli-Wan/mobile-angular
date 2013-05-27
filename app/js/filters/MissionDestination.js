mobileAngular.filter('missionDestination', function(){
	return function(events) {
		if(events === undefined)
			return;

		for(var i = 0; i < events.length; i++) {
			if(events[i].type == intervention)
				return events[i].city;
		}
	};
});
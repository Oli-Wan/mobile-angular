smurAngular.factory("clientId", function(localStorage, $http){
	
	
	var clientId = localStorage.getItem("SMUR_CLIENT_ID");
	if(!clientId) {
		clientId = "clientIdTest";
		localStorage.setItem("SMUR_CLIENT_ID", clientId);		
	}

	return clientId;
});

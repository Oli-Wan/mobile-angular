smurAngular.factory("ClientID", function(localStorage){
	var clientIdKey = "SMUR_CLIENT_ID"
	return {
		get: function() {
			var clientId = localStorage.getItem(clientIdKey);
			if(!clientId) {
				this.set("temporaryClientId");
				return "temporaryClientId";
			}
			return clientId;		
		},
		set: function(clientId) {
			localStorage.setItem(clientIdKey, clientId);
		}
	};
});

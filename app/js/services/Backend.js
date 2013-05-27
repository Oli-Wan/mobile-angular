smurAngular.factory("Backend", function(localStorage){
	var backendKey = "SMUR_BACKEND"
	return {
		get: function() {
			return localStorage.getItem(backendKey);
		},
		set: function(backend) {
			localStorage.setItem(backendKey, backend);
		}
	};
});

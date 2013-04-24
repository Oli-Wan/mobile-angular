
smurAngular.factory("Mission", function Mission($http){
	var Mission = {
		list: [],
		getAll: function() {
			return this.list;
		},
		get: function(id) {
			var foundElement;
			this.list.forEach(function(element, index, array){
				if(element.id == id)
					foundElement = element;
			});
			return foundElement;
		},
		create: function(data) {
			this.list.push(data);
		},
		delete: function(id) {
			var currentList = this.list;
			this.list = [];
			for(var i = 0; i < currentList.length; i++) {
				if(currentList[i].id == id) {
					console.log("deleting "+currentList[i])
					continue;
				}

				this.list.push(currentList[i]);
			}
		},
	}

	$http.get("/resources/missions.json").success(function(data){
		Mission.list = data;
	});
	
	return Mission;
});
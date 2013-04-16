
smurAngular.factory("Mission", function Mission($http, localStorage){
	var Mission = {
		list: [],
		getAll: function() {
			return this.list;
		},
		get: function(id) {
			this.list.foreach(function(element, index, array){
				if(element.id === id)
					return id;
			});
		},
		create: function(data) {
			this.list.push(data);
			this.sync();
		},
		delete: function(id) {
			for(var i = 0; i < this.list.length; i++) {
				var newList = [];
				if(this.list[i].id == id)
					continue;

				newList.push(this.list[i]);
			}
			this.list = newList;
			this.sync();
		},
		sync: function() {
			localStorage['MISSIONS'] = JSON.stringify(this.list);
		}
	}

	var localMissions = localStorage['MISSIONS'];

	if(localMissions)
		Mission.list = JSON.parse(localMissions);
	else {
		$http.get("/resources/missions.json").success(function(data){
			Mission.list = data;
			localStorage['MISSIONS'] = JSON.stringify(Mission.list);
		});
	}
	return Mission;
});
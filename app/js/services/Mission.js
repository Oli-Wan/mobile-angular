
smurAngular.factory("Mission", function Mission($resource){
	return $resource("/missions/:id", { id: "@id"});
});
smurAngular.factory("SocketService", function SocketService(){ 
	return io.connect("http://localhost:2403");
});

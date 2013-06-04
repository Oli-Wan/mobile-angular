angular.module('mobileAngular').factory("SocketService", function (Backend){ 
	return io.connect(Backend.get());
});

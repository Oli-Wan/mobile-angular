angular.module('mobileAngular').factory("CommandSender",
    function ($timeout, $http, Command, Backend) {
        return {
            run: function () {
                var pollingInterval = 5000;
                $timeout(function sendingFunction() {
                    Command.getNonSentCommands().then(function (data) {
                        // wait 5 secs and try again
                        if (data.length == 0) {
                            $timeout(sendingFunction, pollingInterval);
                            return
                        }


                        var send = function (data, count) {
                            if (count >= data.length) {
                                $timeout(sendingFunction, pollingInterval);
                                return;
                            }


                            var cmd = data[count];
                            var postData = JSON.parse(JSON.stringify(cmd));
                            delete postData["id"];
                            $http.post(Backend.get() + '/commands', postData).success(function () {
                                cmd.status = "sent";
                                Command.save(cmd).then(function () {
                                    send(data, ++count);
                                });
                            })
                        };
                        send(data, 0);
                    });
                }, pollingInterval);
            }
        }
    });
angular.module('mobileAngular').service("SystemNotificationService", function ($rootScope) {
    var permission = Notification.permission;
    if(permission != "granted" ) {
        Notification.requestPermission(function(arg) {
            console.log("request notif callback", arg);
        });
    }

    return {
        send: function(title, message, callback){
            new Notification(title, {
                body: message,
                onclick: callback
            });
        }
    };
});

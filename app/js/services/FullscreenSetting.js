angular.module('mobileAngular').factory("FullscreenSetting", function(localStorage){
    var key = "FULLSCREEN"
    return {
        get: function() {
            return localStorage.getItem(key);
        },
        set: function(value) {
            localStorage.setItem(key, value);
        }
    };
});

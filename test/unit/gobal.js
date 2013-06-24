beforeEach(module('mobileAngular', function ($provide) {
    $provide.factory("Backend", function () {
        return {
            get: function () {
                return "test";
            },
            set: function () {
            }
        }
    });
}));
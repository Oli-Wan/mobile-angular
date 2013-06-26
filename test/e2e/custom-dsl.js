angular.scenario.dsl('hammer', function () {
    var chain = {};

    chain.tap = function () {
        return this.addFutureAction("element '" + this.label + "' tap", function ($window, $document, done) {
            var elements = $document.elements();
            var event = newEvent("tap");
            sendEvent(event, elements[0]);
            done();
        });
    };

    return function (selector, label) {
        this.dsl.using(selector, label);
        return chain;
    };
});
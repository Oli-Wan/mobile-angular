angular.scenario.dsl('hammer', function () {
    var chain = {};

    chain.tap = function () {
        return this.addFutureAction("hammer '" + this.label + "' tap", function ($window, $document, done) {
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

angular.scenario.dsl("css", function () {
    var chain = {};

    chain.verticalTranslateOffset = function () {
        return this.addFutureAction("css '" + this.label + "' translatedVertically", function ($window, $document, done) {
            var elements = $document.elements();
            var translate = elements.css("transform").toString();
            var offset = undefined;
            console.log(translate);
            if (translate.search("matrix") != -1) {
                offset = parseInt(translate.split(",").pop());
            } else {
                offset = parseInt(Number.valueOf(translate.split(",")[1]));
            }
            console.log(offset);
            done(null, offset);
        });
    };

    chain.animated = function () {
        return this.addFutureAction("css '" + this.label + "' animated", function ($window, $document, done) {
            var elements = $document.elements();
            var animated = elements.hasClass("animate");
            done(null, animated);
        });
    };

    return function (selector, label) {
        this.dsl.using(selector, label);
        return chain;
    };
})
;
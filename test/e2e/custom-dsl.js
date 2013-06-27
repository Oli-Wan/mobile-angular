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

    chain.dragRight = function (offset) {
        return this.addFutureAction("hammer '" + this.label + "' dragright", function ($window, $document, done) {
            var elements = $document.elements();
            console.log(elements);
            var dragRightEvent = newEvent("dragright");
            var dragEndEvent = newEvent("dragend");
            dragRightEvent.gesture = {
                deltaX: offset,
                preventDefault: function () {
                }
            };
            sendEvent(dragRightEvent, elements[0]);
            sendEvent(dragEndEvent, elements[0]);
            done();
        });
    };

    chain.dragUp = function (offset) {
        return this.addFutureAction("hammer '" + this.label + "' dragup", function ($window, $document, done) {
            var elements = $document.elements();
            console.log(elements);
            var dragUpEvent = newEvent("dragup");
            var dragEndEvent = newEvent("dragend");
            dragUpEvent.gesture = {
                deltaY: offset,
                preventDefault: function () {
                }
            };
            sendEvent(dragUpEvent, elements[0]);
            sendEvent(dragEndEvent, elements[0]);
            done();
        });
    };

    chain.dragEnd = function () {
        return this.addFutureAction("hammer '" + this.label + "' drag", function ($window, $document, done) {
            var elements = $document.elements();
            var dragEndEvent = newEvent("dragend");
            sendEvent(dragEndEvent, elements[0]);
            done();
        });
    };

    return function (selector, label) {
        this.dsl.using(selector, label);
        return chain;
    };
});

angular.scenario.dsl("display", function () {
    var chain = {};

    chain.verticalTranslateOffset = function () {
        return this.addFutureAction("display '" + this.label + "' verticalTranslateOffset", function ($window, $document, done) {
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

    chain.horizontalTranslateOffset = function () {
        return this.addFutureAction("display '" + this.label + "' verticalTranslateOffset", function ($window, $document, done) {
            var elements = $document.elements();
            var translate = elements.css("transform").toString();
            var offset = undefined;
            console.log(translate);
            if (translate.search("matrix") != -1) {
                var splitResult = translate.split(",");
                offset = parseInt(splitResult[splitResult.length - 2]);
            } else {
                offset = parseInt(Number.valueOf(translate.split(",")[0]));
            }
            console.log(offset);
            done(null, offset);
        });
    };


    chain.animated = function () {
        return this.addFutureAction("display '" + this.label + "' animated", function ($window, $document, done) {
            var elements = $document.elements();
            var animated = elements.hasClass("animate");
            done(null, animated);
        });
    };

    chain.haveClass = function (className) {
        return this.addFutureAction("display '" + this.label + "' haveClass", function ($window, $document, done) {
            var elements = $document.elements();
            var haveClass = elements.hasClass(className);
            done(null, haveClass);
        });
    };

    chain.element = function () {
        return this.addFutureAction("display '" + this.label + "' element", function ($window, $document, done) {
            done(null, $document.elements());
        });
    };

    return function (selector, label) {
        this.dsl.using(selector, label);
        return chain;
    };
});
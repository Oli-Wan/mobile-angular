"use strict";

//utils
function createDragEvent(eventName, gestureEvent, element) {
    var event = newEvent(eventName);
    event.gesture = gestureEvent;
    sendEvent(event, element[0]);
}

function checkTranslation(element, expected) {
    var translate = element.css("transform").toString();
    if (translate.search("matrix") != -1) {
        expect(translate).toEqual('matrix(1, 0, 0, 1, 0, ' + expected + ')');
    } else {
        expect(translate).toEqual('translate3d(0, ' + expected + 'px, 0)');
    }
}
// tests
describe("ngDrag directive", function () {
    var element, scope;

    beforeEach(inject(function ($rootScope, $compile) {
        scope = $rootScope;
        scope.dragSwitch = false;
        scope.onThreshold = function () {
        };

        spyOn(scope, "onThreshold").andCallThrough();

        element = angular.element("<div>" +
            '<ng-drag switch="dragSwitch" ' +
            '   bound="200"' +
            '   axis="y"' +
            '   bounded="true"' +
            '   on-threshold="onThreshold()">' +
            '</ng-drag>' +
            "</div>");

        $compile(element)(scope);
        scope.$digest();
    }));

    describe("the draggable element", function () {
        it("should be draggable to the top", function () {
            createDragEvent("dragup", {deltaY: 100}, element);
            checkTranslation(element, 100);
        });

        it("should be draggable to the bottom", function () {
            createDragEvent("dragdown", {deltaY: -100}, element);
            checkTranslation(element, -100);
        });

        it("should not be draggable to the left", function () {
            createDragEvent("dragleft", {deltaX: -100}, element);
            checkTranslation(element, 0);
        });

        it("should not be draggable to the right", function () {
            createDragEvent("dragright", {deltaX: 100}, element);
            checkTranslation(element, 0);
        });

        it("should slide to target if released while moving forward", function () {
            createDragEvent("dragup", {deltaY: 100}, element);
            createDragEvent("dragend", {}, element);
            checkTranslation(element, 200);
        });

        it("should slide to origin if released while moving backward", function () {
            createDragEvent("dragup", {deltaY: 100}, element);
            createDragEvent("dragdown", {deltaY: -10}, element);
            createDragEvent("dragend", {}, element);
            checkTranslation(element, 0);
        });

        it("should be bounded", function () {
            createDragEvent("dragup", {deltaY: 250}, element);
            checkTranslation(element, 200);
        });
    });

    describe("draggable state management", function () {
        it("should toggle the given switch on bound exceeded", function () {
            createDragEvent("dragup", {deltaY: 200}, element);
            createDragEvent("dragend", {}, element);
            expect(scope.dragSwitch).toBe(true);
        });

        it("should move if switch is modified from outside", function () {
            scope.dragSwitch = true;
            scope.$apply();
            checkTranslation(element, 200);
        });

        it("should call callback on threshold", function () {
            createDragEvent("dragup", {deltaY: 200}, element);
            createDragEvent("dragend", {}, element);
            expect(scope.onThreshold).toHaveBeenCalled();
        });
    });
});
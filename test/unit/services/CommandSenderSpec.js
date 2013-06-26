"use strict";

var nonSentCommands = [
    {
        id: 1,
        date: Date.now(),
        origin: "test",
        status: "waiting",
        data: [
            {
                id: 1,
                type: "update",
                changes: [
                    {
                        new_val: "test",
                        old_val: "",
                        attribute: "observation"
                    }
                ],
                entity: "mission"
            }
        ]
    },
    {
        id: 2,
        date: Date.now(),
        origin: "test",
        status: "waiting",
        data: [
            {
                id: 1,
                type: "update",
                changes: [
                    {
                        new_val: "test test",
                        old_val: "test",
                        attribute: "observation"
                    }
                ],
                entity: "mission"
            }
        ]
    }
];
/*
 * The CommandSender is working in background when module is instantiated,
 * testing this one
 */
describe("CommandSender", function () {
    beforeEach(inject(function ($q, Command, Backend, $httpBackend) {

        spyOn(Command, "getNonSentCommands").andCallFake(function () {
            var deferred = $q.defer();
            deferred.resolve(nonSentCommands);
            return deferred.promise;
        });

        spyOn(Command, "save").andCallFake(function () {
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
        });
    }));

    afterEach(inject(function ($httpBackend) {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    }));

    it("should have sent the new commands", inject(function ($timeout, $httpBackend) {
        var command1 = nonSentCommands[0];
        var command2 = nonSentCommands[1];
        delete command1["id"];
        delete command2["id"];
        $httpBackend.expectPOST("test/commands", command1).respond(200, "");
        $httpBackend.expectPOST("test/commands", command2).respond(200, "");
        $timeout.flush();
        $httpBackend.flush();
    }));
});
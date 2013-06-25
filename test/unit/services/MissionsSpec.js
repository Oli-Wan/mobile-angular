"use strict";

var missions = [
    {
        id: 1,
        responsible: "John doe",
        observation: "test",
        vehicle: "test1"
    },
    {
        id: 2,
        responsible: "Jane doe",
        observation: "obs",
        vehicle: "test2"
    }
];

describe('Mission indexedDB service', function () {
    var ready = false, store, CommandStore;

    beforeEach(inject(function ($q, Command, $httpBackend) {
        spyOn(Command, "sendIfNeeded").andCallFake(function () {
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
        });

        CommandStore = Command;

        store = new IDBStore({
            dbVersion: 1,
            storeName: 'mission',
            keyPath: 'id',
            autoIncrement: true,
            onStoreReady: function () {
                store.clear();
                missions.forEach(function (element) {
                    store.put(element);
                });
                ready = true;
            }
        });

        waitsFor(function () {
            return ready;
        }, "Unable to create the store", 5000);

        $httpBackend.when("POST", "test/command").respond();
    }));

    it("should return all missions", inject(function (Mission) {
        var results, ready = false;
        runs(function () {
            Mission.getAll().then(function (data) {
                results = data;
                ready = true;
            });
        });

        waitsFor(function () {
            return ready;
        }, "The db should return values", 500);

        runs(function () {
            expect(results).toEqual(missions);
        });
    }));

    it("should save mission", inject(function (Mission) {
        var mission = {
            id: 3,
            responsible: "Jane doe",
            observation: "obs",
            vehicle: "test2"
        };

        var results, ready = false;
        runs(function () {
            Mission.save(mission).then(function () {
                store.getAll(function (data) {
                    results = data;
                    ready = true;
                });
            });
        });

        waitsFor(function () {
            return ready;
        }, "The db should be able to save and return values", 500);

        runs(function () {
            expect(results.length).toBe(3);
        });
    }));

    it("should update mission", inject(function (Mission) {
        var update = missions[0];
        update.observation = "updated";


        var results, ready = false;
        runs(function () {
            Mission.save(update).then(function () {
                store.get(1, function (data) {
                    results = data;
                    ready = true;
                });
            });
        });

        waitsFor(function () {
            return ready;
        }, "The db should be able to save and return values", 500);

        runs(function () {
            expect(results.observation).toEqual("updated");
        });
    }));

    it("should delete mission", inject(function (Mission) {
        var results, ready = false;
        runs(function () {
            Mission.remove(1).then(function () {
                store.getAll(function (data) {
                    results = data;
                    ready = true;
                });
            });
        });

        waitsFor(function () {
            return ready;
        }, "The db should be able to save and return values", 500);

        runs(function () {
            expect(results.length).toBe(1);
        });
    }));

    it("should clear the store", inject(function (Mission) {
        var results, ready = false;
        runs(function () {
            Mission.clear().then(function () {
                store.getAll(function (data) {
                    results = data;
                    ready = true;
                });
            });
        });

        waitsFor(function () {
            return ready;
        }, "The db should be able to save and return values", 500);

        runs(function () {
            expect(results.length).toBe(0);
        });
    }));


    it("should notify on create", inject(function (Mission, $httpBackend) {
        var mission = {
            id: 3,
            responsible: "Jane doe",
            observation: "obs",
            vehicle: "test2"
        };

        var results, ready = false;
        runs(function () {
            Mission.notifyAndSave(mission).then(function () {
                store.getAll(function (data) {
                    results = data;
                    ready = true;
                });
            });
        });

        waitsFor(function () {
            return ready;
        }, "The db should be able to save and return values", 500);

        runs(function () {
            expect(results.length).toBe(3);
            expect(CommandStore.sendIfNeeded).toHaveBeenCalled();
        });
    }));

    it("should notify on remove", inject(function (Mission) {
        var results, ready = false;
        runs(function () {
            Mission.notifyAndRemove(1).then(function () {
                store.getAll(function (data) {
                    results = data;
                    ready = true;
                });
            });
        });

        waitsFor(function () {
            return ready;
        }, "The db should be able to save and return values", 500);

        runs(function () {
            expect(results.length).toBe(1);
            expect(CommandStore.sendIfNeeded).toHaveBeenCalled();
        });
    }));
});

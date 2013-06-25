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

describe("MissionsController", function () {
    var scope, missionDbMock;

    beforeEach(inject(function ($controller, $window, $rootScope, $location, $q, $timeout) {
        scope = $rootScope;

        missionDbMock = {
            getAll: function () {
                var deferred = $q.defer();
                $timeout(function () {
                    deferred.resolve(missions);
                }, 5000);
                return deferred.promise;
            },
            notifyAndRemove: function (id) {
                var deferred = $q.defer();
                deferred.resolve();
                return deferred.promise;
            }
        };

        spyOn($window, "confirm");
        spyOn(missionDbMock, "notifyAndRemove").andCallThrough();

        $controller('MissionsController', {
            $scope: scope,
            Mission: missionDbMock,
            $location: $location,
            $window: $window
        });
    }));

    it("should display the mission list", inject(function ($timeout) {
        $timeout.flush();
        expect(scope.missions).toBeDefined();
        expect(scope.missions.length).toEqual(2);
    }));

    it("should ask confirmation on delete", inject(function ($window) {
        scope.deleteModal(1);
        expect($window.confirm).toHaveBeenCalled();
    }));

    it("should delete mission with given id", inject(function ($timeout) {
        scope.delete(1);
        $timeout.flush();
        expect(missionDbMock.notifyAndRemove).toHaveBeenCalledWith(1);
    }));

    it("should navigate to mission of id", inject(function ($location) {
        scope.navigateTo(1);
        var absUrl = $location.absUrl();
        expect(absUrl).toContain("/mission/1?page=mission");
    }));

    it("should navigate to new mission", inject(function ($location) {
        scope.goToNewMission(1);
        var absUrl = $location.absUrl();
        expect(absUrl).toContain("/mission/new");
    }));
});
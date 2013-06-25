"use strict";

var menu = [
    {
        "id": "mission",
        "name": "Mission",
        "templateUrl": "/partials/mission/mission.html"
    },
    {
        "id": "staff",
        "name": "Personnel",
        "templateUrl": "/partials/mission/staff/staff.html"
    },
    {
        "id": "event",
        "name": "Evènements",
        "templateUrl": "/partials/mission/events/events.html"
    },
    {
        "id": "victim",
        "name": "Victimes",
        "templateUrl": "/partials/mission/victims/victims.html"
    },
    {
        "id": "vehicle",
        "name": "Véhicules",
        "templateUrl": "/partials/mission/vehicles/vehicles.html"
    },
    {
        "id": "back",
        "name": "Retour à la liste"
    }
];

describe("MissionContainerController", function () {
    var scope, missionFake;

    beforeEach(inject(function ($controller, $window, $rootScope, $location, $q, $timeout, $httpBackend) {
        scope = $rootScope;

        var routeParams = {
            missionId: 1
        };
        missionFake = {
            observation: "test",
            get: function (id) {
                var deferred = $q.defer();
                var localObs = this.observation;
                $timeout(function () {
                    var mission = {
                        id: id,
                        responsible: "John doe",
                        observation: localObs,
                        vehicle: "test1"
                    };
                    deferred.resolve(mission);
                }, 5000);
                return deferred.promise;
            }
        };

        // simulate navigated from mission list
        $location.url("/mission/1").search({page: "mission"});

        $controller('MissionContainerController', {
            $scope: scope,
            $routeParams: routeParams,
            Mission: missionFake
        });

        $httpBackend.when("GET", "/resources/mission-menu.json").respond(menu);
        $httpBackend.flush();
        $timeout.flush();
    }));

    it("should close the menu by default", function () {
        expect(scope.menu).toBe(false);
    });

    it("should get the mission with id", inject(function ($timeout) {
        expect(scope.mission).toEqual({
            id: 1,
            responsible: "John doe",
            observation: "test",
            vehicle: "test1"
        });
    }));


    it("should reload mission on data change", inject(function ($timeout) {
        missionFake.observation = "updated";
        scope.$broadcast('dataChanged');
        $timeout.flush();
        expect(scope.mission).toEqual({
            id: 1,
            responsible: "John doe",
            observation: "updated",
            vehicle: "test1"
        });
    }));

    it("should show mission update form", function () {
        expect(scope.includedUrl).toEqual("/partials/mission/mission.html");
    });

    it("should navigate to staff", inject(function ($location) {
        scope.navigate("staff");
        var absUrl = $location.absUrl();
        expect(absUrl).toContain("/mission/1?page=staff");
        // simulate AngularJS event
        scope.$broadcast("$routeUpdate");
        expect(scope.includedUrl).toEqual("/partials/mission/staff/staff.html");
    }));

    it("should navigate to event", inject(function ($location) {
        scope.navigate("event");
        var absUrl = $location.absUrl();
        expect(absUrl).toContain("/mission/1?page=event");
        // simulate AngularJS event
        scope.$broadcast("$routeUpdate");
        expect(scope.includedUrl).toEqual("/partials/mission/events/events.html");
    }));

    it("should navigate to victim", inject(function ($location) {
        scope.navigate("victim");
        var absUrl = $location.absUrl();
        expect(absUrl).toContain("/mission/1?page=victim");
        // simulate AngularJS event
        scope.$broadcast("$routeUpdate");
        expect(scope.includedUrl).toEqual("/partials/mission/victims/victims.html");
    }));

    it("should navigate to vehicles", inject(function ($location) {
        scope.navigate("vehicle");
        var absUrl = $location.absUrl();
        expect(absUrl).toContain("/mission/1?page=vehicle");
        // simulate AngularJS event
        scope.$broadcast("$routeUpdate");
        expect(scope.includedUrl).toEqual("/partials/mission/vehicles/vehicles.html");
    }));

    it("should navigate back to mission list", inject(function ($location) {
        scope.navigate("back");
        var path = $location.path();
        expect(path).toBe("/");
    }));
});
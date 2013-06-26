var commands = [
    {
        id: 1,
        date: Date.now(),
        origin: "test",
        status: "waiting",
        data: {
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
    },
    {
        id: 2,
        date: Date.now(),
        origin: "test",
        status: "waiting",
        data: {
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
    }
];

describe("NotificationController", function () {
    var scope, command;

    beforeEach(inject(function ($controller, $window, $rootScope, $timeout, $location, $q, Command) {
        scope = $rootScope;
        var route = {
            reload: function () {
            }
        };

        command = {
            getNewCommands: function () {
                var deferred = $q.defer();
                $timeout(function () {
                    deferred.resolve(commands);
                }, 5000);
                return deferred.promise;
            },
            save: function () {
                var deferred = $q.defer();
                $timeout(function () {
                    deferred.resolve();
                });
                return deferred.promise;
            }
        };

        spyOn(command, "save").andCallThrough();

        $controller('NotificationController', {
            $scope: scope,
            $route: route,
            Command: command
        });
    }));

    it("should get new commands", inject(function ($timeout) {
        $timeout.flush();
        expect(scope.commands).toBe(commands);
        expect(scope.nb).toBe(2);
    }));

    it("should mark commands as read", function () {
        //clone
        var expectedCmd = JSON.parse(JSON.stringify(commands[0]));
        scope.hide(commands[0], 0);
        expectedCmd.status = "read";
        expect(command.save).toHaveBeenCalledWith(expectedCmd);
    });


    it("should reload commands on dataChanges", inject(function ($timeout) {
        $timeout.flush()
        expect(scope.commands).toBe(commands);
        expect(scope.nb).toBe(2);
        commands.push({
            id: 3,
            date: Date.now(),
            origin: "test",
            status: "waiting",
            data: [
                {
                    id: 1,
                    type: "update",
                    changes: [
                        {
                            new_val: "test test test",
                            old_val: "test test",
                            attribute: "observation"
                        }
                    ],
                    entity: "mission"
                }
            ]
        });
        scope.$broadcast('dataChanged');
        $timeout.flush();
        expect(scope.commands).toBe(commands);
        expect(scope.nb).toBe(3);
    }));

    it("should mark all notifications as read on clear and hide them", inject(function ($timeout) {
        $timeout.flush();
        var readCmd1 = JSON.parse(JSON.stringify(commands[0]));
        var readCmd2 = JSON.parse(JSON.stringify(commands[1]));
        readCmd1.status = readCmd2.status = "read";
        scope.clear();
        expect(command.save).toHaveBeenCalledWith(readCmd1);
        expect(command.save).toHaveBeenCalledWith(readCmd2);
        expect(scope.commands.length).toBe(0);
        expect(scope.nb).toBe(0);
    }));

    it("should mark the command as read redirect to mission", inject(function ($timeout, $location) {
        scope.goToNotification(commands[0]);
        $timeout.flush();
        var expectedCmd = JSON.parse(JSON.stringify(commands[0]));
        expectedCmd.status = "read";
        expect(command.save).toHaveBeenCalledWith(expectedCmd);
        var absUrl = $location.absUrl();
        expect(absUrl).toContain("/mission/1?page=mission");
    }));
});
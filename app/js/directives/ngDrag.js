angular.module('mobileAngular').directive('ngDrag', function ($parse) {
    return {
        restrict: 'E',
        scope: {
            dragSwitch: "=switch",
            bound: "@",
            onThreshold: "&",
            bounded: "@",
            preventDefault: '@'
        },
        link: function ($scope, element, attrs) {
            var draggable = element.parent();

            var thresholdExceeded = false;

            if (attrs['switch'] === undefined)
                thresholdExceeded = $scope.dragSwitch;

            var axis = "X";
            var events = "dragright dragleft";
            var lastDelta;
            var lastDirection;

            if (attrs['axis'] && attrs['axis'].toUpperCase() == "Y") {
                axis = "Y";
                events = "dragup dragdown";
            }

            $scope.isAbove = function (delta, reference) {
                if (reference < 0) {
                    return reference >= delta;
                } else {
                    return delta >= reference;
                }
            }

            $scope.calculateDirection = function (oldDelta, newDelta) {
                if (axis == "Y") {
                    if (newDelta < oldDelta)
                        return "up"
                    else
                        return "down";
                } else {
                    if (newDelta > oldDelta)
                        return "right"
                    else
                        return "left";
                }
            };

            $scope.switch = function (value) {
                if (attrs['switch'] === undefined)
                    return;
                if ($scope.dragSwitch == value)
                    return;

                $scope.dragSwitch = value
            };

            $scope.move = function (offset, animate) {
                draggable.removeClass('animate');

                if (animate)
                    draggable.addClass('animate');

                var coordinates;
                if (axis == "Y")
                    coordinates = "0," + offset + "px, 0";
                else
                    coordinates = offset + "px, 0, 0";

                draggable.css("transform", "translate3d(" + coordinates + ")");
            };

            $scope.$watch('dragSwitch', function (newValue) {
                thresholdExceeded = newValue;

                if (thresholdExceeded)
                    $scope.move($scope.bound, true);
                else
                    $scope.move(0, true);
            });

            Hammer(draggable[0]).on(events, function (event) {
                lastDirection = $scope.calculateDirection(lastDelta, event.gesture['delta' + axis]);
                lastDelta = event.gesture['delta' + axis];
                if ($scope.preventDefault)
                    event.gesture.preventDefault();

                event.stopPropagation();

                var delta = event.gesture['delta' + axis];

                if (thresholdExceeded)
                    delta = delta + parseInt($scope.bound);

                if ($scope.bounded && $scope.isAbove(delta, $scope.bound))
                    delta = $scope.bound;

                $scope.move(delta);
            });

            Hammer(draggable[0]).on('dragend', function (event) {
                var test;
                var bound = $scope.bound;

                if (axis == "Y") {
                    test = bound >= 0 && lastDirection != Hammer.DIRECTION_UP;
                    test = test || (bound <= 0 && lastDirection != Hammer.DIRECTION_DOWN);
                } else {
                    test = bound >= 0 && lastDirection == Hammer.DIRECTION_RIGHT;
                    test = test || (bound <= 0 && lastDirection == Hammer.DIRECTION_LEFT);
                }

                if (test) {
                    thresholdExceeded = true;
                    $scope.switch(true);
                    $scope.$apply(function () {
                        $scope.onThreshold();
                    });
                    $scope.move($scope.bound, true);
                } else if (thresholdExceeded) {
                    thresholdExceeded = false;
                    $scope.switch(false);
                    $scope.$apply();
                    $scope.move("0", true);
                } else {
                    $scope.move("0", true);
                }
            });
        }
    };
});	
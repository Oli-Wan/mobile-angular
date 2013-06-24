angular.module('mobileAngular').controller('MissionsController',
    function ($scope, Mission, $location, $window) {
        Mission.getAll().then(function (data) {
            $scope.missions = data;
        });

        $scope.$on('dataChanged', function () {
            Mission.getAll().then(function (data) {
                $scope.missions = data;
            });
        });

        $scope.navigateTo = function (id) {
            $location.url("/mission/" + id).search({page: "mission"});
        };

        $scope.goToNewMission = function () {
            $location.url('/mission/new');
        };

        $scope.delete = function (id) {
            Mission.notifyAndRemove(id).then(function () {
                Mission.getAll().then(function (data) {
                    $scope.missions = data;
                });
            });
        }

        $scope.deleteModal = function (id) {
            var confirm = $window.confirm("Êtes vous sûr de vouloir supprimer la mission #" + id);
            if (confirm) {
                $scope.delete(id);
            }
        };
    });
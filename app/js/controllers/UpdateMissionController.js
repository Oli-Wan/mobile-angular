angular.module('mobileAngular').controller("UpdateMissionController",
    function ($scope, $window, $routeParams, url, Mission, ImageStorage) {
        $scope.$watch('mission', function (value) {
            if (!value || !value.image)
                return;

            console.log(value.image);

            ImageStorage.getURL(value.image).then(function (url) {
                console.log(url);
                $scope.imageUrl = url;
            });
        });

        $scope.$watch('image', function (value) {
            if (!value)
                return;

            $scope.imageUrl = url.createObjectURL(value[0]);
        }, true);

        $scope.save = function () {
            if ($scope.image !== undefined && $scope.image.length > 0) {
                var imageName = $scope.mission.image;
                var imageFile = $scope.image[0];

                if (imageName) {
                    ImageStorage.remove(imageName);
                }

                console.log('saving image');
                ImageStorage.save(imageFile.name, imageFile);
                $scope.mission.image = imageFile.name;
            }

            Mission.notifyAndSave($scope.mission).then(function () {
                $scope.alerts = [];
                $scope.alerts.push({
                    type: "success",
                    title: "Succès",
                    content: "Mission mise à jour avec succès"
                });
                $window.scrollTo(0, 0);
            });
        };

        $scope.print = function () {
            var mission = $scope.mission;
            var doc = new jsPDF();
            doc.setFont("helvetica");
            doc.setFontSize(22);
            doc.text(10, 20, "Mission " + mission.id);
            doc.line(10, 25, 200, 25);
            doc.setFontSize(16);
            doc.text(10, 35, "Raison : " + mission.reason);
            doc.text(10, 45, "Type : " + mission.type);
            doc.setFontSize(22);
            doc.text(10, 65, "Appelant");
            doc.setFontSize(16);
            doc.text(10, 85, "Nom : " + mission.caller.lastname);
            doc.text(10, 95, "Prénom : " + mission.caller.firstname);
            doc.text(10, 105, "Téléphone : " + mission.caller.phone);
            doc.setFontSize(22);
            doc.text(10, 125, "Observation");
            doc.setFontSize(16);
            var count = 0;
            var line = 145;
            while(count < mission.observation.length) {
                doc.text(10, line, mission.observation.substring(count, count+70).trim());
                count += 70;
                line += 10;
                if(line >= 270) {
                    doc.addPage();
                    line = 20;
                }
            }

            doc.save("test.pdf");
        };
    });

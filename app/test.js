'use strict';
var mobileAngular = angular.module('mobileAngular', [
    'ngResource',
    '$strap.directives',
    'angular-gestures'
  ]);
mobileAngular.config([
  '$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'partials/missions.html',
      controller: 'MissionsController'
    });
    $routeProvider.when('/mission/new', {
      templateUrl: 'partials/missions/new.html',
      controller: 'NewMissionController'
    });
    $routeProvider.when('/mission/:missionId', {
      templateUrl: 'partials/mission-container.html',
      controller: 'MissionContainerController',
      reloadOnSearch: false
    });
    $routeProvider.when('/mission/:missionId/events/new', {
      templateUrl: 'partials/mission/events/form.html',
      controller: 'EditEventController'
    });
    $routeProvider.when('/mission/:missionId/event/:eventId/edit', {
      templateUrl: 'partials/mission/events/form.html',
      controller: 'EditEventController'
    });
    $routeProvider.when('/mission/:missionId/staff/new', {
      templateUrl: 'partials/mission/staff/new.html',
      controller: 'NewStaffController'
    });
    $routeProvider.when('/mission/:missionId/vehicle/new', {
      templateUrl: 'partials/mission/vehicles/new.html',
      controller: 'NewVehicleController'
    });
    $routeProvider.when('/storagemanagement', {
      templateUrl: 'partials/misc/storage-management.html',
      controller: 'StorageManagementController'
    });
    $routeProvider.when('/accelerometer', {
      templateUrl: 'partials/misc/accelerometer.html',
      controller: 'AccelerometerController'
    });
    $routeProvider.when('/gestures', {
      templateUrl: 'partials/misc/gestures.html',
      controller: 'GesturesController'
    });
    $routeProvider.when('/commands/', {
      templateUrl: 'partials/misc/command-list.html',
      controller: 'CommandController'
    });
    $routeProvider.when('/cube/', { templateUrl: 'partials/misc/cube.html' });
    $routeProvider.otherwise({ redirectTo: '/' });
  }
]);
mobileAngular.value('$strap.config', { datepicker: { format: 'dd/mm/yyyy' } });
mobileAngular.run([
  '$rootScope',
  '$window',
  '$timeout',
  function ($rootScope, $window, $timeout) {
    $rootScope.scrollX = $window.scrollX;
    angular.element($window).bind('scroll', function () {
      $rootScope.scrollX = $window.scrollX;
      $rootScope.$apply('scrollX');
    });
    angular.element($window).bind('deviceorientation', function (data) {
      $rootScope.orientationData = data;
      $rootScope.$apply('orientationData');
    });
    screenfull.onchange = function () {
      $rootScope.fullscreen = screenfull.isFullscreen;
      $rootScope.$apply('fullScreen');
    };
  }
]);mobileAngular.controller('AccelerometerController', function AccelerometerController($scope, $rootScope) {
  $rootScope.$watch('orientationData', function (newVal, oldVal) {
    $scope.orientationData = newVal.originalEvent;
  });
});mobileAngular.controller('BootstrapController', function BootstrapController($scope, $http, ClientID, Backend, localStorage, Command, Vehicle, Staff, $window, StoreProvider, $rootScope, CommandUtils) {
  var boostrapedKey = 'SMUR_BOOSTRAPED';
  $scope.boostraped = localStorage.getItem(boostrapedKey);
  $scope.progress = 0;
  $scope.$watch('progress', function (newValue) {
    if (newValue >= 100)
      $scope.ready = true;
  });
  $scope.save = function () {
    $scope.progress = 0;
    $scope.alerts = [];
    ClientID.set($scope.clientID);
    Backend.set($scope.backend);
    $scope.progress += 10;
    $http.get($scope.backend + '/persons').success(function (data) {
      var count = 0;
      Staff.clear().then(function () {
        var recursivePut = function (count, data) {
          var element = data[count];
          var dbObject = {
              'firstname': element.firstname,
              'lastname': element.lastname,
              'function': {
                store: 'function',
                id: element.function
              }
            };
          Staff.save(dbObject).then(function () {
            count++;
            if (count < data.length)
              recursivePut(count, data);
            else
              $scope.progress += 30;
          });
        };
        recursivePut(count, data);
      });
    }).error(function () {
      $scope.alerts.push({
        'type': 'error',
        'title': 'Impossible de r\xe9cup\xe9rer les donn\xe9es. V\xe9rifiez que l\'adresse du serveur est bonne et qu\'il est lanc\xe9'
      });
    });
    $http.get($scope.backend + '/vehicles').success(function (data) {
      var count = 0;
      Vehicle.clear().then(function () {
        var recursivePut = function (count, data) {
          var element = data[count];
          var dbObject = {
              'name': element.name,
              'type': element.type
            };
          Vehicle.save(dbObject).then(function () {
            count++;
            if (count < data.length)
              recursivePut(count, data);
            else
              $scope.progress += 30;
          });
        };
        recursivePut(count, data);
      });
    }).error(function () {
      $scope.alerts.push({
        'type': 'error',
        'title': 'Impossible de r\xe9cup\xe9rer les donn\xe9es. V\xe9rifiez que l\'adresse du serveur est bonne et qu\'il est lanc\xe9'
      });
    });
    $http.get($scope.backend + '/commands' + '?{"$sort": {"date": 1}}').success(function (commands) {
      if (commands.length <= 0) {
        $scope.progress = 100;
        return;
      }
      var step = 30 / commands.length;
      var recursiveFn = function (count, array) {
        if (count >= array.length) {
          $scope.progress = 100;
          return;
        }
        var command = array[count];
        CommandUtils.handleCommand(command, function () {
          $scope.progress += step;
          recursiveFn(++count, array);
        }, false, 'read');
      };
      recursiveFn(0, commands);
    });
  };
  $scope.continue = function () {
    localStorage.setItem(boostrapedKey, true);
    $window.location.reload();
  };
});mobileAngular.controller('CommandController', function CommandController($scope, Command) {
  $scope.commands = [];
  Command.getAllSorted().then(function (data) {
    console.log(data);
    $scope.commands = data;
  });
});mobileAngular.controller('ConnectionController', function ConnectionController($scope, $timeout, $location, $route, Command) {
  $scope.offline = false;
  $scope.$on('offline', function () {
    $scope.offline = true;
  });
  $scope.$on('online', function () {
    $scope.offline = false;
  });
});mobileAngular.controller('EditEventController', function EditEventController($scope, $http, $location, $routeParams, Mission, Event, Vehicle, Utils) {
  Mission.get(parseInt($routeParams.missionId)).then(function (data) {
    $scope.mission = data;
    if ($routeParams.eventId) {
      Event.get(parseInt($routeParams.eventId)).then(function (data) {
        $scope.event = data;
      });
    } else {
      $scope.event = {};
      $scope.event.start = Utils.getCurrentDateAndTime();
      $scope.event.end = Utils.getCurrentDateAndTime();
      $scope.event.missionId = $scope.mission.id;
    }
  });
  Vehicle.getAll().then(function (data) {
    $scope.vehicles = data;
  });
  $http.get('/resources/event-types.json').success(function (data) {
    $scope.types = data;
  });
  $scope.back = function () {
    $location.url('/mission/' + $scope.mission.id).search({ page: 'event' });
  };
  $scope.save = function () {
    Event.save($scope.event).then(function () {
      $scope.back();
    });
  };
});mobileAngular.controller('EventController', function EventController($scope, $location, $window, $routeParams, Event) {
  $scope.fetchEvents = function () {
    Event.getByMissionId($routeParams.missionId).then(function (data) {
      $scope.events = data;
    });
  };
  $scope.goToNewEvent = function () {
    $location.url('/mission/' + $routeParams.missionId + '/events/new');
  };
  $scope.goToEditEvent = function (id) {
    $location.url('/mission/' + $routeParams.missionId + '/event/' + id + '/edit');
  };
  $scope.deleteModal = function (id) {
    var confirm = $window.confirm('\xcates vous s\xfbr de vouloir supprimer l\'\xe9v\xe8nement #' + id);
    if (confirm) {
      Event.remove(id).then(function () {
        $scope.fetchEvents();
      });
    }
  };
  $scope.fetchEvents();
});mobileAngular.controller('FullScreenController', function FullScreenController($scope, $window) {
  if (screenfull.enabled)
    $scope.fullscreenSupport = true;
  $scope.requestFullScreen = function () {
    screenfull.request();
  };
});mobileAngular.controller('GesturesController', function GesturesController($scope) {
  $scope.tapMe = function () {
    console.log('Tapped');
  };
  $scope.swipeMeLeft = function () {
    console.log('swiped to the left');
    $scope.swipeLeft = true;
  };
  $scope.swipeMeRight = function () {
    console.log('swiped to the right');
    $scope.swipeRight = true;
  };
  $scope.end = function () {
    console.log('Transition end');
  };
  $scope.onThreshold = function (message) {
    console.log('Threshold', message);
  };
  $scope.myFunction = function () {
    console.log('Fonction m\xe9tier');
  };
  $scope.moveDraggable = function () {
    $scope.dragSwitch = !$scope.dragSwitch;
  };
  $scope.moveDraggable2 = function () {
    $scope.dragSwitch2 = !$scope.dragSwitch2;
  };
  $scope.moveDraggable3 = function () {
    $scope.dragSwitch3 = !$scope.dragSwitch3;
  };
  $scope.releaseMe = function () {
    $scope.dragMessage = 'right';
  };
  $scope.holdMe = function () {
    $scope.hold = !$scope.hold;
  };
  $scope.$watch('dragSwitch', function (newValue) {
    console.log('watch drag', newValue);
  });
  $scope.hold = false;
  $scope.dragSwitch = false;
  $scope.dragSwitch2 = false;
  $scope.dragSwitch3 = false;
});mobileAngular.controller('MissionContainerController', function MissionContainerController($scope, $routeParams, $http, $location, Mission, $window) {
  $scope.getMission = function () {
    Mission.get(parseInt($routeParams.missionId)).then(function (data) {
      $scope.mission = data;
    });
  };
  $scope.includeUrlIs = function (expectedUrl) {
    return $scope.includedUrl == expectedUrl;
  };
  $scope.toggleMenu = function () {
    $scope.menu = !$scope.menu;
  };
  $scope.navigate = function (id) {
    if (id == 'back')
      $location.url('/');
    else {
      $location.url('/mission/' + $scope.mission.id).search({ page: id });
      $scope.menu = false;
    }
  };
  $scope.getPathFromParams = function () {
    var currentPage = $location.search().page;
    for (var i = 0; i < $scope.menuItems.length; i++) {
      if ($scope.menuItems[i].id == currentPage)
        return $scope.menuItems[i].templateUrl;
    }
    ;
    return '';
  };
  $scope.showMenu = function () {
    $scope.includedUrl = '';
    $location.path('/mission/' + $scope.mission.id);
  };
  $scope.$on('$routeUpdate', function () {
    $scope.includedUrl = $scope.getPathFromParams();
    $window.scrollTo(0, 0);
  });
  $scope.$on('dataChanged', function () {
    $scope.getMission();
  });
  $http.get('/resources/mission-menu.json').success(function (data) {
    $scope.menuItems = data;
    $scope.includedUrl = $scope.getPathFromParams();
  });
  $scope.menu = false;
  $scope.getMission();
});mobileAngular.controller('MissionsController', function MissionsController($scope, Mission, $location, $window) {
  Mission.getAll().then(function (data) {
    $scope.missions = data;
  });
  $scope.$on('dataChanged', function () {
    Mission.getAll().then(function (data) {
      $scope.missions = data;
    });
  });
  $scope.navigateTo = function (mission) {
    $location.url('/mission/' + mission.id).search({ page: 'mission' });
  };
  $scope.goToNewMission = function () {
    $location.url('/mission/new');
  };
  $scope.deleteModal = function (id) {
    var confirm = $window.confirm('\xcates vous s\xfbr de vouloir supprimer la mission #' + id);
    if (confirm) {
      Mission.notifyAndRemove(id).then(function () {
        Mission.getAll().then(function (data) {
          $scope.missions = data;
        });
      });
    }
  };
});mobileAngular.controller('NewMissionController', function NewMissionController($scope, $location, Mission, Vehicle, Staff, Utils, Command) {
  $scope.alerts = [];
  Vehicle.getAll().then(function (data) {
    $scope.vehicles = data;
  });
  Staff.getAll().then(function (data) {
    $scope.responsibles = data;
  });
  $scope.add = function () {
    if ($scope.password == '1234') {
      var formattedDate = Utils.getCurrentDateAndTime();
      $scope.mission.created_at = formattedDate.date + ' ' + formattedDate.time;
      Mission.notifyAndSave($scope.mission).then(function () {
        $scope.back();
      });
    } else {
      $scope.alerts.push({
        'type': 'error',
        'title': 'Mauvais mot de passe',
        'content': 'Essayez 1234'
      });
    }
  };
  $scope.back = function () {
    $location.url('/');
  };
});mobileAngular.controller('NewStaffController', function NewStaffController($scope, $http, $location, $routeParams, Mission, Staff, Utils) {
  $scope.staff = {};
  $scope.staff.time = Utils.getCurrentDateAndTime();
  Mission.get(parseInt($routeParams.missionId)).then(function (data) {
    $scope.mission = data;
  });
  Staff.getAll().then(function (data) {
    $scope.persons = data;
  });
  $http.get('/resources/functions.json').success(function (data) {
    $scope.functions = data;
  });
  $scope.back = function () {
    $location.url('/mission/' + $routeParams.missionId).search({ page: 'staff' });
  };
  $scope.add = function () {
    if ($scope.mission.staff === undefined)
      $scope.mission.staff = [];
    $scope.mission.staff.push($scope.staff);
    Mission.save($scope.mission).then(function () {
      $scope.back();
    });
  };
});mobileAngular.controller('NewVehicleController', function NewVehicleController($scope, $http, $location, $routeParams, Mission, Vehicle, Utils) {
  Mission.get(parseInt($routeParams.missionId)).then(function (data) {
    $scope.mission = data;
  });
  Vehicle.getAll().then(function (data) {
    $scope.vehicles = data;
  });
  $http.get('/resources/vehicle-types.json').success(function (data) {
    $scope.types = data;
    $scope.typeNames = [];
    $scope.types.forEach(function (element, index, array) {
      $scope.typeNames.push(element.name);
    });
  });
  $scope.back = function () {
    $location.url('/mission/' + $scope.mission.id).search({ page: 'vehicle' });
  };
  $scope.add = function () {
    $scope.vehicle.store = 'vehicle';
    $scope.vehicle.time = Utils.getCurrentDateAndTime();
    if ($scope.mission.vehicles === undefined)
      $scope.mission.vehicles = [];
    $scope.mission.vehicles.push($scope.vehicle);
    Mission.save($scope.mission).then(function () {
      $scope.back();
    });
  };
});mobileAngular.controller('NotificationController', function NotificationController($scope, $timeout, $location, $route, Command) {
  $scope.hideArray = [];
  $scope.removeArray = [];
  $scope.toggleChange = function () {
    $scope.change = true;
    $timeout(function () {
      $scope.change = false;
    }, 500);
  };
  $scope.nb = 0;
  $scope.notificationsVisible = false;
  $scope.$on('dataChanged', function () {
    $scope.loadNewCommands();
  });
  $scope.loadNewCommands = function () {
    $scope.hideArray = [];
    Command.getNewCommands().then(function (data) {
      $scope.commands = data;
      if (data.length > $scope.nb)
        $scope.toggleChange();
      $scope.nb = data.length;
    });
  };
  $scope.loadNewCommands();
  $scope.toggleNotifcations = function () {
    $scope.notificationsVisible = !$scope.notificationsVisible;
  };
  $scope.hide = function (command, index) {
    $scope.hideArray[index] = true;
    command.status = 'read';
    Command.save(command).then(function () {
      $scope.nb--;
    });
  };
  $scope.clear = function () {
    for (var i = 0; i < $scope.commands.length; i++) {
      var command = $scope.commands[i];
      command.status = 'read';
      Command.save(command).then(function () {
        $scope.loadNewCommands();
      });
    }
  };
  $scope.goToNotification = function (command) {
    command.status = 'read';
    Command.save(command).then(function () {
      $scope.loadNewCommands();
      $scope.toggleNotifcations();
    });
    if (command.data.type == 'delete')
      $location.url('/');
    else {
      var url = '/mission/' + command.data.id;
      var currentPath = $location.path();
      if (url == currentPath)
        $route.reload();
      else
        $location.path(url).search({ page: 'mission' });
    }
  };
  $scope.goToDetails = function () {
    $location.path('/commands/');
  };
  $scope.$on('$routeChangeStart', function () {
    if ($scope.notificationsVisible)
      $scope.notificationsVisible = false;
  });
});mobileAngular.controller('StaffController', function StaffController($scope, $routeParams, $http, $window, $location, Mission, Staff) {
  Mission.get(parseInt($routeParams.missionId)).then(function (data) {
    $scope.mission = data;
    $scope.refreshStaff();
  });
  $http.get('/resources/functions.json').success(function (data) {
    $scope.functions = [];
    data.forEach(function (element, index, array) {
      $scope.functions[element.id] = element.name;
    });
  });
  $scope.goToNewStaff = function () {
    $location.url('/mission/' + $scope.mission.id + '/staff/new');
  };
  $scope.deleteModal = function (elementToDelete) {
    var confirm = $window.confirm('\xcates vous s\xfbr de vouloir supprimer la personne ' + elementToDelete.firstname + ' ' + elementToDelete.lastname);
    if (confirm) {
      var newStaff = [];
      $scope.mission.staff.forEach(function (element, index, array) {
        if (element.id != elementToDelete.id || element.time.date != elementToDelete.time.date || element.time.time != elementToDelete.time.time)
          newStaff.push(element);
      });
      $scope.mission.staff = newStaff;
      Mission.save($scope.mission).then(function () {
        $scope.refreshStaff();
      });
    }
  };
  $scope.refreshStaff = function () {
    if ($scope.mission.staff === undefined)
      return;
    $scope.staff = [];
    $scope.mission.staff.forEach(function (element, index, array) {
      Staff.get(parseInt(element.id)).then(function (data) {
        data.time = element.time;
        $scope.staff.push(data);
      });
    });
  };
});mobileAngular.controller('StorageManagementController', function StorageManagementController($scope, $http, Mission, Staff, Event, Vehicle, FileSystem, FileSystemUtils, persistentStorage, Command, localStorage, ClientID, Backend) {
  $scope.alerts = [];
  $scope.getStorageStats = function () {
    if (persistentStorage) {
      persistentStorage.queryUsageAndQuota(function (usage, quota) {
        $scope.fs = {};
        $scope.fs.used = usage;
        $scope.fs.total = quota;
        $scope.fs.perc = usage / quota * 100;
      });
    } else {
      $scope.fsPolyfill = true;
    }
  };
  $scope.getStorageStats();
  $scope.clientId = ClientID.get();
  $scope.backend = Backend.get();
  $scope.clearMission = function () {
    Mission.clear().then(function () {
      $scope.alerts.push({
        'type': 'success',
        'title': 'Mission cleared'
      });
    });
  };
  $scope.clearStaff = function () {
    Staff.clear().then(function () {
      $scope.alerts.push({
        'type': 'success',
        'title': 'Staff cleared'
      });
    });
  };
  $scope.clearEvent = function () {
    Event.clear().then(function () {
      $scope.alerts.push({
        'type': 'success',
        'title': 'Event cleared'
      });
    });
  };
  $scope.clearVehicle = function () {
    Vehicle.clear().then(function () {
      $scope.alerts.push({
        'type': 'success',
        'title': 'Vehicle cleared'
      });
    });
  };
  $scope.clearCommand = function () {
    Command.clear().then(function () {
      $scope.alerts.push({
        'type': 'success',
        'title': 'Command cleared'
      });
    });
  };
  $scope.populateStaff = function () {
    $http.get(Backend.get() + '/persons').success(function (data) {
      var count = 0;
      Staff.clear().then(function () {
        var recursivePut = function (count, data) {
          var element = data[count];
          var dbObject = {
              'firstname': element.firstname,
              'lastname': element.lastname,
              'function': {
                store: 'function',
                id: element.function
              }
            };
          Staff.save(dbObject).then(function () {
            count++;
            if (count < data.length)
              recursivePut(count, data);
            else {
              $scope.alerts.push({
                'type': 'success',
                'title': 'Personnes ajout\xe9es'
              });
            }
          });
        };
        recursivePut(count, data);
      });
    });
  };
  $scope.populateVehicle = function () {
    $http.get(Backend.get() + '/vehicles').success(function (data) {
      var count = 0;
      Vehicle.clear().then(function () {
        var recursivePut = function (count, data) {
          var element = data[count];
          var dbObject = {
              'name': element.name,
              'type': element.type
            };
          Vehicle.save(dbObject).then(function () {
            count++;
            if (count < data.length)
              recursivePut(count, data);
            else {
              $scope.alerts.push({
                'type': 'success',
                'title': 'V\xe9hicules ajout\xe9s'
              });
            }
          });
        };
        recursivePut(count, data);
      });
    });
  };
  $scope.clearFS = function () {
    FileSystem.getFileSystem().then(function (fs) {
      var dirReader = fs.root.createReader();
      var entries = [];
      var readEntries = function () {
        dirReader.readEntries(function (results) {
          if (!results.length) {
            listResults(entries.sort());
          } else {
            entries = entries.concat(Array.prototype.slice.call(results || [], 0));
            entries.forEach(function (entry, i) {
              if (entry.isFile)
                entry.remove($scope.getStorageStats, FileSystemUtils.errorHandler);
              else
                entry.removeRecursively($scope.getStorageStats, FileSystemUtils.errorHandler);
            });
          }
        }, FileSystemUtils.errorHandler);
      };
      readEntries();
    });
  };
  $scope.resetLastCmd = function () {
    localStorage.setItem('LAST_CMD', 0);
    $scope.alerts.push({
      'type': 'success',
      'title': 'ID de la derni\xe8re commande re\xe7ue remis \xe0 z\xe9ro.'
    });
  };
  $scope.setClientId = function () {
    ClientID.set($scope.clientId);
    $scope.alerts.push({
      'type': 'success',
      'title': 'Client ID chang\xe9.'
    });
  };
  $scope.setClientId = function () {
    Backend.set($scope.backend);
    $scope.alerts.push({
      'type': 'success',
      'title': 'Backend chang\xe9.'
    });
  };
});mobileAngular.controller('UpdateMissionController', function UpdateMissionController($scope, $window, $routeParams, url, Mission, ImageStorage) {
  $scope.$watch('mission', function (value) {
    if (!value || !value.image)
      return;
    ImageStorage.getURL(value.image).then(function (url) {
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
      ImageStorage.save(imageFile.name, imageFile);
      $scope.mission.image = imageFile.name;
    }
    Mission.notifyAndSave($scope.mission).then(function () {
      $scope.alerts = [];
      $scope.alerts.push({
        type: 'success',
        title: 'Succ\xe8s',
        content: 'Mission mise \xe0 jour avec succ\xe8s'
      });
      $window.scrollTo(0, 0);
    });
  };
});mobileAngular.controller('VehicleController', function VehicleController($scope, $routeParams, $window, $location, Mission, Vehicle) {
  Mission.get(parseInt($routeParams.missionId)).then(function (data) {
    $scope.mission = data;
    $scope.refreshVehicles();
  });
  $scope.goToNewVehicle = function () {
    $location.url('/mission/' + $scope.mission.id + '/vehicle/new');
  };
  $scope.deleteModal = function (elementToDelete) {
    var confirm = $window.confirm('\xcates vous s\xfbr de vouloir supprimer le v\xe9hicule #' + elementToDelete.name);
    if (confirm) {
      var newVehicles = [];
      $scope.mission.vehicles.forEach(function (element, index, array) {
        if (element.id != elementToDelete.id || element.time.date != elementToDelete.time.date || element.time.time != elementToDelete.time.time)
          newVehicles.push(element);
      });
      $scope.mission.vehicles = newVehicles;
      Mission.save($scope.mission).then(function () {
        $scope.refreshVehicles();
      });
    }
  };
  $scope.refreshVehicles = function () {
    if ($scope.mission.vehicles === undefined)
      return;
    $scope.vehicles = [];
    $scope.mission.vehicles.forEach(function (element, index, array) {
      Vehicle.get(parseInt(element.id)).then(function (data) {
        data.time = element.time;
        $scope.vehicles.push(data);
      });
    });
  };
});mobileAngular.directive('cube', function (url, Utils) {
  return {
    restrict: 'E',
    templateUrl: '/partials/directives/cube.html',
    link: function ($scope, element, attrs) {
      var hor = [
          Hammer.DIRECTION_LEFT,
          Hammer.DIRECTION_RIGHT
        ];
      var cubeDiv = element.find('#cube');
      Hammer(element[0]).on('drag', function (event) {
        event.gesture.preventDefault();
        var angle = -event.gesture.angle;
        var direction = event.gesture.direction;
        var axis;
        console.log(hor.indexOf(direction));
        if (hor.indexOf(direction) != -1) {
          axis = 'Y';
          angle = event.gesture.deltaY;
        } else {
          axis = 'X';
          angle = event.gesture.deltaX;
        }
        console.log(direction, axis);
        cubeDiv.css('transform', 'translateZ( -100px ) rotate' + axis + '(' + event.gesture.angle + 'deg)');
      });
    }
  };
});mobileAngular.directive('loader', function (url, Utils) {
  return {
    restrict: 'E',
    templateUrl: '/partials/directives/loader.html'
  };
});mobileAngular.directive('ngDrag', function ($parse) {
  return {
    restrict: 'E',
    scope: {
      dragSwitch: '=switch',
      bound: '@',
      onThreshold: '&',
      bounded: '@',
      preventDefault: '@'
    },
    link: function ($scope, element, attrs) {
      var draggable = element.parent();
      $scope.thresholdExceeded = false;
      if (attrs['switch'] === undefined)
        $scope.thresholdExceeded = $scope.dragSwitch;
      $scope.axis = 'X';
      var events = 'dragright dragleft';
      if (attrs['axis'] && attrs['axis'].toUpperCase() == 'Y') {
        $scope.axis = 'Y';
        events = 'dragup dragdown';
      }
      if ($scope.bound === undefined)
        $scope.threshold = 500;
      $scope.isAbove = function (delta, reference) {
        if (reference < 0) {
          return reference >= delta;
        } else {
          return delta >= reference;
        }
      };
      $scope.isDeltaAboveBound = function (delta) {
        if ($scope.bound < 0) {
          return $scope.bound >= delta;
        } else {
          return delta >= $scope.bound;
        }
      };
      $scope.switch = function (value) {
        if (attrs['switch'] === undefined)
          return;
        if ($scope.dragSwitch == value)
          return;
        $scope.dragSwitch = value;
      };
      $scope.move = function (offset, animate) {
        draggable.removeClass('animate');
        if (animate)
          draggable.addClass('animate');
        var coordinates;
        if ($scope.axis == 'Y')
          coordinates = '0,' + offset + 'px, 0';
        else
          coordinates = offset + 'px, 0, 0';
        draggable.css('transform', 'translate3d(' + coordinates + ') scale3d(1,1,1)');
      };
      $scope.$watch('dragSwitch', function (newValue) {
        $scope.thresholdExceeded = newValue;
        if ($scope.thresholdExceeded)
          $scope.move($scope.bound, true);
        else
          $scope.move(0, true);
      });
      Hammer(draggable[0]).on(events, function (event) {
        if ($scope.preventDefault)
          event.gesture.preventDefault();
        event.stopPropagation();
        var delta = event.gesture['delta' + $scope.axis];
        if ($scope.thresholdExceeded)
          delta = delta + parseInt($scope.bound);
        if ($scope.bounded && $scope.isAbove(delta, $scope.bound))
          delta = $scope.bound;
        $scope.move(delta);
      });
      Hammer(draggable[0]).on('release', function (event) {
        if ($scope.preventDefault)
          event.gesture.preventDefault();
        $this = $(this);
        var delta = event.gesture['delta' + $scope.axis];
        if ($scope.thresholdExceeded)
          delta = delta + parseInt($scope.bound);
        if ($scope.isAbove(delta, $scope.bound / 2)) {
          $scope.thresholdExceeded = true;
          $scope.switch(true);
          $scope.$apply(function () {
            $scope.onThreshold();
          });
          $scope.move($scope.bound, true);
        } else if ($scope.thresholdExceeded) {
          $scope.thresholdExceeded = false;
          $scope.switch(false);
          $scope.$apply();
          $scope.move('0', true);
        } else {
          $scope.move('0', true);
        }
      });
    }
  };
});mobileAngular.directive('ngFiles', function () {
  return {
    restrict: 'A',
    scope: { files: '=ngModel' },
    link: function ($scope, element, attrs) {
      if (attrs['ngModel'] === undefined) {
        throw 'ngFiles directive : ngModel attribute needed!';
      }
      ;
      var input = angular.element(element);
      input.bind('change', function () {
        $scope.files = this.files;
        $scope.$apply();
      });
    }
  };
});mobileAngular.directive('ngTap', function () {
  return function (scope, element, attrs) {
    var tapping;
    tapping = false;
    element.bind('touchstart', function (e) {
      element.addClass('active');
      tapping = true;
    });
    element.bind('touchmove', function (e) {
      element.removeClass('active');
      tapping = false;
    });
    element.bind('touchend', function (e) {
      element.removeClass('active');
      if (tapping) {
        scope.$apply(attrs['ngTap'], element);
      }
    });
  };
});mobileAngular.directive('onTransitionEnd', function ($parse, transitionEndEvent) {
  return {
    restrict: 'A',
    link: function ($scope, element, attrs) {
      var fn = $parse(attrs['onTransitionEnd']);
      element.bind(transitionEndEvent, function (event) {
        console.log('transion-end', event);
        $scope.$apply(function () {
          fn($scope);
        });
      });
    }
  };
});mobileAngular.directive('thumbnail', function () {
  return {
    restrict: 'E',
    scope: { src: '@' },
    templateUrl: '/partials/directives/thumbnail.html',
    link: function ($scope, element, attrs) {
      var $overlay = $('#overlay');
      var $lightBox = $('#lightBox');
      if ($overlay.length == 0) {
        $('body').append('<div id=\'overlay\'></div>');
        $overlay = $('#overlay');
      }
      if ($lightBox.length == 0) {
        $('body').append('<div id=\'lightBox\'><img /></div>');
        $lightBox = $('#lightBox');
      }
      Hammer($overlay[0]).on('tap', function () {
        $lightBox.hide();
        $(this).hide();
      });
      var img = $(element).find('img');
      Hammer(img[0]).on('tap', function () {
        var currentHeight = $(window).height();
        $lightBoxImg = $('#lightBox>img');
        $lightBoxImg.css('max-height', (currentHeight - 100).toString() + 'px');
        $lightBoxImg.attr('src', $(this).attr('src'));
        $lightBoxImg.load(function () {
          $overlay.show();
          $lightBox.show();
          $lightBox.css({
            'margin-left': -($lightBoxImg.width() / 2),
            'margin-top': -($lightBoxImg.height() / 2)
          });
        });
      });
    }
  };
});mobileAngular.filter('eventDestination', function () {
  return function (input) {
    if (input == 'intervention')
      return '/partials/mission/events/address.html';
    else if (input == 'hospitalisation')
      return '/partials/mission/events/service.html';
    else
      return '';
  };
});mobileAngular.filter('missionDestination', function () {
  return function (events) {
    if (events === undefined)
      return;
    for (var i = 0; i < events.length; i++) {
      if (events[i].type == intervention)
        return events[i].city;
    }
  };
});mobileAngular.factory('Backend', function (localStorage) {
  var backendKey = 'SMUR_BACKEND';
  return {
    get: function () {
      return localStorage.getItem(backendKey);
    },
    set: function (backend) {
      localStorage.setItem(backendKey, backend);
    }
  };
});mobileAngular.factory('ClientID', function (localStorage) {
  var clientIdKey = 'SMUR_CLIENT_ID';
  return {
    get: function () {
      var clientId = localStorage.getItem(clientIdKey);
      if (!clientId) {
        this.set('temporaryClientId');
        return 'temporaryClientId';
      }
      return clientId;
    },
    set: function (clientId) {
      localStorage.setItem(clientIdKey, clientId);
    }
  };
});mobileAngular.factory('Command', function Command($q, $rootScope, $http, $timeout, ClientID, IDBService) {
  var storeWrapper = {
      store: undefined,
      getStore: function () {
        var deferred = $q.defer();
        if (this.store) {
          deferred.resolve(this.store);
        } else {
          new IDBStore({
            dbVersion: 2,
            storeName: 'commands',
            keyPath: 'id',
            autoIncrement: true,
            onStoreReady: function () {
              var storeReady = this;
              storeWrapper.store = this;
              $rootScope.$apply(function () {
                deferred.resolve(storeReady);
              });
            },
            indexes: [
              { name: 'origin' },
              { name: 'date' },
              { name: 'status' }
            ]
          });
        }
        return deferred.promise;
      }
    };
  var idbService = IDBService.getIDBCrudObject(storeWrapper);
  idbService.sendIfNeeded = function (store, data, action) {
    var start = Date.now();
    var deferred = $q.defer();
    if (action == 'delete') {
      deferred.resolve();
      var removal = {
          entity: store.storeName,
          id: data,
          type: 'delete'
        };
      var cmd = {};
      cmd.date = Date.now();
      cmd.origin = ClientID.get();
      cmd.status = 'waiting';
      cmd.data = removal;
      storeWrapper.getStore().then(function (cmdStore) {
        cmdStore.put(cmd);
      });
    } else {
      store.get(data.id, function (currentData) {
        $rootScope.$apply(deferred.resolve());
        var cmdData;
        var diffArray = new Array();
        if (!currentData) {
          for (var property in data) {
            diffArray.push({
              attribute: property,
              new_val: data[property],
              old_val: ''
            });
          }
        } else {
          for (var property in data) {
            if (data[property] != currentData[property]) {
              diffArray.push({
                attribute: property,
                new_val: data[property],
                old_val: currentData[property]
              });
            }
          }
        }
        if (diffArray.length > 0) {
          var diff = {
              entity: store.storeName,
              id: data.id,
              type: 'update',
              changes: diffArray
            };
          var cmd = {};
          cmd.date = Date.now();
          cmd.origin = ClientID.get();
          cmd.status = 'waiting';
          cmd.data = diff;
          storeWrapper.getStore().then(function (cmdStore) {
            cmdStore.put(cmd);
          });
        }
      });
    }
    return deferred.promise;
  };
  idbService.getNonSentCommands = function () {
    var deferred = $q.defer();
    storeWrapper.getStore().then(function (store) {
      var keyRange = store.makeKeyRange({
          lower: 'waiting',
          upper: 'waiting'
        });
      store.query(function (data) {
        $rootScope.$apply(function () {
          deferred.resolve(data);
        });
      }, {
        'index': 'status',
        'keyRange': keyRange
      });
    });
    return deferred.promise;
  };
  idbService.getNewCommands = function () {
    var deferred = $q.defer();
    storeWrapper.getStore().then(function (store) {
      var keyRange = store.makeKeyRange({
          lower: 'new',
          upper: 'new'
        });
      store.query(function (data) {
        $rootScope.$apply(function () {
          deferred.resolve(data);
        });
      }, {
        'index': 'status',
        'keyRange': keyRange
      });
    });
    return deferred.promise;
  };
  idbService.getAllSorted = function () {
    var deferred = $q.defer();
    storeWrapper.getStore().then(function (store) {
      store.query(function (data) {
        $rootScope.$apply(function () {
          deferred.resolve(data);
        });
      }, {
        'index': 'date',
        'order': 'DESC'
      });
    });
    return deferred.promise;
  };
  return idbService;
});mobileAngular.service('CommandUtils', function CommandUtils(StoreProvider, Command, $rootScope) {
  return {
    handleCommand: function (command, callback, notify, status) {
      if (status)
        command.status = status;
      else
        command.status = 'new';
      if (notify === undefined)
        notify = true;
      Command.save(command);
      localStorage.setItem('LAST_CMD', command.date);
      var data = command.data;
      var storeName = data.entity;
      var store = StoreProvider.getStoreByName(storeName);
      if (!store) {
        console.log('Unknown entity');
        if (callback)
          callback();
        return;
      }
      var action = command.data.type;
      if (action == 'delete') {
        store.remove(command.data.id).then(function () {
          if (notify)
            $rootScope.$broadcast('dataChanged');
          if (callback)
            callback();
        });
      } else {
        store.get(data.id).then(function (localData) {
          if (!localData) {
            localData = {};
            localData.id = data.id;
          }
          var changeArray = data.changes;
          changeArray.forEach(function (element) {
            localData[element.attribute] = element.new_val;
          });
          store.save(localData).then(function () {
            if (notify)
              $rootScope.$broadcast('dataChanged');
            if (callback)
              callback();
          });
        });
      }
    }
  };
});mobileAngular.factory('Event', function Event($q, $rootScope, IDBService) {
  var storeWrapper = {
      store: undefined,
      getStore: function () {
        var deferred = $q.defer();
        if (this.store)
          deferred.resolve(this.store);
        else {
          new IDBStore({
            dbVersion: 2,
            storeName: 'event',
            keyPath: 'id',
            autoIncrement: true,
            onStoreReady: function () {
              storeWrapper.store = this;
              var storeReady = this;
              $rootScope.$apply(function () {
                deferred.resolve(storeReady);
              });
            },
            indexes: [{ name: 'missionId' }]
          });
        }
        return deferred.promise;
      }
    };
  var idbService = IDBService.getIDBCrudObject(storeWrapper);
  idbService.getByMissionId = function (missionId) {
    var id = parseInt(missionId);
    var deferred = $q.defer();
    storeWrapper.getStore().then(function (store) {
      var keyRange = store.makeKeyRange({
          lower: id,
          upper: id
        });
      store.query(function (data) {
        $rootScope.$apply(function () {
          deferred.resolve(data);
        });
      }, {
        'index': 'missionId',
        'keyRange': keyRange
      });
    });
    return deferred.promise;
  };
  return idbService;
});mobileAngular.factory('FileSystem', function FileSystem($q, $rootScope, $window, FileSystemUtils, persistentStorage, requestFileSystem) {
  var fileSystemWrapper = {
      getFileSystem: function () {
        var deferred = $q.defer();
        var onInit = function (fileSystem) {
          fileSystemWrapper.fileSystem = fileSystem;
          $rootScope.$apply(function () {
            deferred.resolve(fileSystem);
          });
        };
        if (persistentStorage) {
          persistentStorage.requestQuota(10 * 1024 * 1024, function (grantedQuota) {
            requestFileSystem(window.PERSISTENT, grantedQuota, onInit, FileSystemUtils.errorHandler);
          });
        } else if ($window.webkitStorageInfo) {
          window.webkitStorageInfo.requestQuota(PERSISTENT, 10 * 1024 * 1024, function (grantedBytes) {
            requestFileSystem(PERSISTENT, grantedBytes, onInit, FileSystemUtils.errorHandler);
          }, function (e) {
            console.log('Error', e);
          });
        } else if (requestFileSystem) {
          requestFileSystem(PERSISTENT, 10 * 1024 * 1024, onInit, FileSystemUtils.errorHandler);
        } else {
          $rootScope.$apply(function () {
            deferred.reject('Cannot use FS API');
          });
        }
        return deferred.promise;
      }
    };
  return fileSystemWrapper;
});mobileAngular.factory('FileSystemUtils', function FileSystemUtils($q, $window) {
  return {
    errorHandler: function (e) {
      var msg = '';
      switch (e.code) {
      case FileError.QUOTA_EXCEEDED_ERR:
        msg = 'Quota exceeded';
        break;
      case FileError.NOT_FOUND_ERR:
        msg = 'Not found';
        break;
      case FileError.SECURITY_ERR:
        msg = 'Security issue';
        break;
      case FileError.INVALID_MODIFICATION_ERR:
        msg = 'Invalid modification';
        break;
      case FileError.INVALID_STATE_ERR:
        msg = 'Invalid state';
        break;
      default:
        msg = 'Unknown Error';
        break;
      }
      ;
      console.log('Error: ' + msg);
      console.log(e);
    }
  };
});mobileAngular.service('IDBService', function IDBService($q, $rootScope) {
  return {
    getIDBCrudObject: function (storeWrapper) {
      return {
        getAll: function () {
          var deferred = $q.defer();
          storeWrapper.getStore().then(function (store) {
            store.getAll(function (data) {
              $rootScope.$apply(function () {
                deferred.resolve(data);
              });
            });
          });
          return deferred.promise;
        },
        get: function (id) {
          var deferred = $q.defer();
          storeWrapper.getStore().then(function (store) {
            store.get(id, function (data) {
              $rootScope.$apply(function () {
                deferred.resolve(data);
              });
            });
          });
          return deferred.promise;
        },
        remove: function (id) {
          var deferred = $q.defer();
          storeWrapper.getStore().then(function (store) {
            store.remove(id, function () {
              $rootScope.$apply(function () {
                deferred.resolve('Sucess');
              });
            });
          });
          return deferred.promise;
        },
        save: function (element) {
          if (element.id === undefined)
            element.id = Date.now();
          var deferred = $q.defer();
          storeWrapper.getStore().then(function (store) {
            store.put(element, function () {
              $rootScope.$apply(function () {
                deferred.resolve('Sucess');
              });
            });
          });
          return deferred.promise;
        },
        clear: function () {
          var deferred = $q.defer();
          storeWrapper.getStore().then(function (store) {
            store.clear(function () {
              $rootScope.$apply(function () {
                deferred.resolve('Sucess');
              });
            });
          });
          return deferred.promise;
        }
      };
    }
  };
});mobileAngular.factory('ImageStorage', function ImageStorage($q, $rootScope, FileSystem, FileSystemUtils) {
  return {
    save: function (fileName, blob) {
      var deffered = $q.defer();
      FileSystem.getFileSystem().then(function (fs) {
        fs.root.getFile(fileName, { create: true }, function (fileEntry) {
          fileEntry.createWriter(function (fileWriter) {
            fileWriter.onwriteend = function (e) {
              $rootScope.$apply(function () {
                deffered.resolve();
              });
            };
            fileWriter.onerror = function (e) {
              console.log('Couldn\'t save image: ' + e.toString());
            };
            fileWriter.write(blob);
          }, FileSystemUtils.errorHandler);
        }, FileSystemUtils.errorHandler);
      });
      return deffered.promise;
    },
    getURL: function (fileName) {
      var deffered = $q.defer();
      FileSystem.getFileSystem().then(function (fs) {
        fs.root.getFile(fileName, {}, function (fileEntry) {
          $rootScope.$apply(function () {
            deffered.resolve(fileEntry.toURL());
          });
        }, FileSystemUtils.errorHandler);
      });
      return deffered.promise;
    },
    remove: function (fileName) {
      FileSystem.getFileSystem().then(function (fs) {
        fs.root.getFile(fileName, { create: false }, function (fileEntry) {
          fileEntry.remove(function () {
          }, FileSystemUtils.errorHandler);
        }, FileSystemUtils.errorHandler);
      });
    }
  };
});mobileAngular.value('localStorage', window.localStorage);mobileAngular.factory('Mission', function Mission($q, $rootScope, SyncedResourceService) {
  var storeWrapper = {
      store: undefined,
      getStore: function () {
        var deferred = $q.defer();
        if (this.store) {
          deferred.resolve(this.store);
        } else {
          new IDBStore({
            dbVersion: 1,
            storeName: 'mission',
            keyPath: 'id',
            autoIncrement: true,
            onStoreReady: function () {
              storeWrapper.store = this;
              var storeReady = this;
              $rootScope.$apply(function () {
                deferred.resolve(storeReady);
              });
            }
          });
        }
        return deferred.promise;
      }
    };
  return SyncedResourceService.syncedResourceManager(storeWrapper);
});mobileAngular.value('persistentStorage', navigator.persistentStorage || navigator.webkitPersistentStorage);mobileAngular.value('requestFileSystem', window.requestFileSystem || window.webkitRequestFileSystem);mobileAngular.factory('SocketService', function SocketService(Backend) {
  return io.connect(Backend.get());
});mobileAngular.factory('Staff', function Staff($q, $rootScope, IDBService) {
  var storeWrapper = {
      store: undefined,
      getStore: function () {
        var deferred = $q.defer();
        if (this.store)
          deferred.resolve(this.store);
        else {
          new IDBStore({
            dbVersion: 2,
            storeName: 'staff',
            keyPath: 'id',
            autoIncrement: true,
            onStoreReady: function () {
              storeWrapper.store = this;
              var storeReady = this;
              $rootScope.$apply(function () {
                deferred.resolve(storeReady);
              });
            }
          });
        }
        return deferred.promise;
      }
    };
  return IDBService.getIDBCrudObject(storeWrapper);
});mobileAngular.service('StoreProvider', function StoreProvider(Mission, Event, Vehicle, Staff) {
  return {
    getStoreByName: function (name) {
      if (name == 'mission')
        return Mission;
      else if (name == 'event')
        return Event;
      else if (name == 'vehicle')
        return Vehicle;
      else if (name == 'person')
        return Staff;
      else
        return undefined;
    }
  };
});mobileAngular.service('SyncedResourceService', function SyncedResourceService($q, $rootScope, IDBService, Command) {
  return {
    syncedResourceManager: function (storeWrapper) {
      var service = IDBService.getIDBCrudObject(storeWrapper);
      service.notifyAndRemove = function (id) {
        var deferred = $q.defer();
        storeWrapper.getStore().then(function (store) {
          Command.sendIfNeeded(store, id, 'delete').then(function () {
            service.remove(id).then(function () {
              deferred.resolve();
            });
          });
        });
        return deferred.promise;
      };
      service.notifyAndSave = function (element) {
        var deferred = $q.defer();
        if (element.id === undefined)
          element.id = Date.now();
        storeWrapper.getStore().then(function (store) {
          Command.sendIfNeeded(store, element, 'update').then(function () {
            service.save(element).then(function () {
              deferred.resolve();
            });
          });
        });
        return deferred.promise;
      };
      return service;
    }
  };
});mobileAngular.factory('transitionEndEvent', function () {
  var t;
  var el = document.createElement('fakeelement');
  var result;
  var transEndEventNames = {
      'WebkitTransition': 'webkitTransitionEnd',
      'MozTransition': 'transitionend',
      'OTransition': 'oTransitionEnd',
      'msTransition': 'MSTransitionEnd',
      'transition': 'transitionend'
    };
  for (t in transEndEventNames) {
    if (el.style[t] !== undefined) {
      result = transEndEventNames[t];
    }
  }
  el = null;
  return result;
});mobileAngular.value('url', window.URL || window.webkitURL);mobileAngular.service('Utils', function Utils() {
  return {
    getCurrentDateAndTime: function () {
      var currentTime = new Date();
      return {
        date: currentTime.getFullYear() + '-' + this.toTwoDigits(currentTime.getMonth() + 1) + '-' + this.toTwoDigits(currentTime.getDate()),
        time: this.toTwoDigits(currentTime.getHours()) + ':' + this.toTwoDigits(currentTime.getMinutes())
      };
    },
    toTwoDigits: function (value) {
      var valueString = value.toString();
      if (valueString.length == 1) {
        valueString = '0' + valueString;
      }
      return valueString;
    },
    dataURLToBlob: function (dataURL) {
      var BASE64_MARKER = ';base64,';
      if (dataURL.indexOf(BASE64_MARKER) == -1) {
        var parts = dataURL.split(',');
        var contentType = parts[0].split(':')[1];
        var raw = parts[1];
        return new Blob([raw], { type: contentType });
      }
      var parts = dataURL.split(BASE64_MARKER);
      var contentType = parts[0].split(':')[1];
      var raw = window.atob(parts[1]);
      var rawLength = raw.length;
      var uInt8Array = new Uint8Array(rawLength);
      for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      return new Blob([uInt8Array], { type: contentType });
    }
  };
});mobileAngular.factory('Vehicle', function Vehicle($q, $rootScope, IDBService) {
  var storeWrapper = {
      store: undefined,
      getStore: function () {
        var deferred = $q.defer();
        if (this.store)
          deferred.resolve(this.store);
        else {
          new IDBStore({
            dbVersion: 1,
            storeName: 'vehicle',
            keyPath: 'id',
            autoIncrement: true,
            onStoreReady: function () {
              storeWrapper.store = this;
              var storeReady = this;
              $rootScope.$apply(function () {
                deferred.resolve(storeReady);
              });
            }
          });
        }
        return deferred.promise;
      }
    };
  return IDBService.getIDBCrudObject(storeWrapper);
});mobileAngular.run(function (SocketService, $http, ClientID, CommandUtils, localStorage, Backend, $rootScope) {
  var fetch = function () {
    var lastCmd = localStorage.getItem('LAST_CMD');
    var getParams = '';
    if (lastCmd)
      getParams = '?{"date": {"$gt":' + lastCmd + '},"$sort": {"date": 1}}';
    $http.get(Backend.get() + '/commands' + getParams).success(function (commands) {
      var recursiveFn = function (count, array) {
        if (count >= array.length) {
          $rootScope.$broadcast('dataChanged');
          return;
        }
        var command = array[count];
        CommandUtils.handleCommand(command, function () {
          recursiveFn(++count, array);
        }, false);
      };
      recursiveFn(0, commands);
    });
  };
  SocketService.on('commands:new', function (command) {
    localStorage.setItem('LAST_CMD', command.date);
    var clientId = ClientID.get();
    console.log(command.origin, clientId);
    if (command.origin == clientId)
      return;
    CommandUtils.handleCommand(command);
  });
  SocketService.on('error', function () {
    $rootScope.$broadcast('offline');
  });
  SocketService.on('disconnect', function () {
    $rootScope.$broadcast('offline');
  });
  SocketService.on('reconnect', function () {
    $rootScope.$broadcast('online');
  });
  SocketService.on('connect', fetch);
});mobileAngular.run(function ($timeout, $http, Command, Backend) {
  var pollingInterval = 5000;
  $timeout(function sendingFunction() {
    Command.getNonSentCommands().then(function (data) {
      if (data.length == 0) {
        return;
      }
      var send = function (data, count) {
        if (count >= data.length)
          return;
        var cmd = data[count];
        var postData = JSON.parse(JSON.stringify(cmd));
        delete postData['id'];
        $http.post(Backend.get() + '/commands', postData).success(function () {
          cmd.status = 'sent';
          Command.save(cmd).then(function () {
            send(data, ++count);
          });
        });
      };
      send(data, 0);
    });
    $timeout(sendingFunction, pollingInterval);
  }, pollingInterval);
});(function ($) {
  if (!$.cssHooks) {
    throw 'jQuery 1.4.3+ is needed for this plugin to work';
    return;
  }
  function styleSupport(prop) {
    var vendorProp, supportedProp, capProp = prop.charAt(0).toUpperCase() + prop.slice(1), prefixes = [
        'Moz',
        'Webkit',
        'O',
        'ms'
      ], div = document.createElement('div');
    if (prop in div.style) {
      supportedProp = prop;
    } else {
      for (var i = 0; i < prefixes.length; i++) {
        vendorProp = prefixes[i] + capProp;
        if (vendorProp in div.style) {
          supportedProp = vendorProp;
          break;
        }
      }
    }
    div = null;
    $.support[prop] = supportedProp;
    return supportedProp;
  }
  var transform = styleSupport('transform');
  if (transform && transform !== 'transform') {
    $.cssHooks.transform = {
      get: function (elem, computed, extra) {
        return $.css(elem, transform);
      },
      set: function (elem, value) {
        elem.style[transform] = value;
      }
    };
  }
}(jQuery));
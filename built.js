'use strict';

var mobileAngular = angular.module('mobileAngular', ['ngResource', '$strap.directives', 'angular-gestures']);

mobileAngular.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', 
  {
    templateUrl: 'partials/missions.html', 
    controller: 'MissionsController'
  });
  $routeProvider.when('/mission/new', 
  {
    templateUrl: 'partials/missions/new.html', 
    controller: 'NewMissionController'
  });
  $routeProvider.when('/mission/:missionId', 
  {
    templateUrl: 'partials/mission-container.html', 
    controller: 'MissionContainerController',
    reloadOnSearch: false
  });
  $routeProvider.when('/mission/:missionId/events/new', 
  {
    templateUrl: 'partials/mission/events/form.html', 
    controller: 'EditEventController'
  });
  $routeProvider.when('/mission/:missionId/event/:eventId/edit', 
  {
    templateUrl: 'partials/mission/events/form.html', 
    controller: 'EditEventController'
  });

  $routeProvider.when('/mission/:missionId/staff/new', 
  {
    templateUrl: 'partials/mission/staff/new.html', 
    controller: 'NewStaffController'
  });
  $routeProvider.when('/mission/:missionId/vehicle/new', 
  {
    templateUrl: 'partials/mission/vehicles/new.html', 
    controller: 'NewVehicleController'
  });
  $routeProvider.when('/storagemanagement', 
  {
    templateUrl: 'partials/misc/storage-management.html', 
    controller: 'StorageManagementController'
  });
  $routeProvider.when('/accelerometer', 
  {
    templateUrl: 'partials/misc/accelerometer.html', 
    controller: 'AccelerometerController'
  });
  $routeProvider.when('/gestures', 
  {
    templateUrl: 'partials/misc/gestures.html', 
    controller: 'GesturesController'
  });
  $routeProvider.when('/commands/', 
  {
    templateUrl: 'partials/misc/command-list.html', 
    controller: 'CommandController'
  });
    $routeProvider.when('/cube/', 
  {
    templateUrl: 'partials/misc/cube.html'
  });
  $routeProvider.otherwise({redirectTo: '/'});
}]);

//default for datepicker
mobileAngular.value('$strap.config', {
  datepicker: {
    format: 'dd/mm/yyyy'
  }
});

mobileAngular.run(function($rootScope, $window, $timeout){
  $rootScope.scrollX = $window.scrollX;

  angular.element($window).bind('scroll',function(){
    $rootScope.scrollX = $window.scrollX;
    $rootScope.$apply('scrollX');
  });

  angular.element($window).bind('deviceorientation', function(data){
    $rootScope.orientationData = data;
    $rootScope.$apply('orientationData');
  });

  screenfull.onchange = function() {
    $rootScope.fullscreen = screenfull.isFullscreen;
    $rootScope.$apply('fullScreen');
  };
});

"use strict";var mobileAngular=angular.module("mobileAngular",["ngResource","$strap.directives","angular-gestures"]);mobileAngular.config(["$routeProvider",function(a){a.when("/",{templateUrl:"partials/missions.html",controller:"MissionsController"}),a.when("/mission/new",{templateUrl:"partials/missions/new.html",controller:"NewMissionController"}),a.when("/mission/:missionId",{templateUrl:"partials/mission-container.html",controller:"MissionContainerController",reloadOnSearch:!1}),a.when("/mission/:missionId/events/new",{templateUrl:"partials/mission/events/form.html",controller:"EditEventController"}),a.when("/mission/:missionId/event/:eventId/edit",{templateUrl:"partials/mission/events/form.html",controller:"EditEventController"}),a.when("/mission/:missionId/staff/new",{templateUrl:"partials/mission/staff/new.html",controller:"NewStaffController"}),a.when("/mission/:missionId/vehicle/new",{templateUrl:"partials/mission/vehicles/new.html",controller:"NewVehicleController"}),a.when("/storagemanagement",{templateUrl:"partials/misc/storage-management.html",controller:"StorageManagementController"}),a.when("/accelerometer",{templateUrl:"partials/misc/accelerometer.html",controller:"AccelerometerController"}),a.when("/gestures",{templateUrl:"partials/misc/gestures.html",controller:"GesturesController"}),a.when("/commands/",{templateUrl:"partials/misc/command-list.html",controller:"CommandController"}),a.when("/cube/",{templateUrl:"partials/misc/cube.html"}),a.otherwise({redirectTo:"/"})}]),mobileAngular.value("$strap.config",{datepicker:{format:"dd/mm/yyyy"}}),mobileAngular.run(["$rootScope","$window","$timeout",function(a,b){a.scrollX=b.scrollX,angular.element(b).bind("scroll",function(){a.scrollX=b.scrollX,a.$apply("scrollX")}),angular.element(b).bind("deviceorientation",function(b){a.orientationData=b,a.$apply("orientationData")}),screenfull.onchange=function(){a.fullscreen=screenfull.isFullscreen,a.$apply("fullScreen")}}]);var mobileAngular=angular.module("mobileAngular",["ngResource","$strap.directives","angular-gestures"]);mobileAngular.config(["$routeProvider",function(a){a.when("/",{templateUrl:"partials/missions.html",controller:"MissionsController"}),a.when("/mission/new",{templateUrl:"partials/missions/new.html",controller:"NewMissionController"}),a.when("/mission/:missionId",{templateUrl:"partials/mission-container.html",controller:"MissionContainerController",reloadOnSearch:!1}),a.when("/mission/:missionId/events/new",{templateUrl:"partials/mission/events/form.html",controller:"EditEventController"}),a.when("/mission/:missionId/event/:eventId/edit",{templateUrl:"partials/mission/events/form.html",controller:"EditEventController"}),a.when("/mission/:missionId/staff/new",{templateUrl:"partials/mission/staff/new.html",controller:"NewStaffController"}),a.when("/mission/:missionId/vehicle/new",{templateUrl:"partials/mission/vehicles/new.html",controller:"NewVehicleController"}),a.when("/storagemanagement",{templateUrl:"partials/misc/storage-management.html",controller:"StorageManagementController"}),a.when("/accelerometer",{templateUrl:"partials/misc/accelerometer.html",controller:"AccelerometerController"}),a.when("/gestures",{templateUrl:"partials/misc/gestures.html",controller:"GesturesController"}),a.when("/commands/",{templateUrl:"partials/misc/command-list.html",controller:"CommandController"}),a.when("/cube/",{templateUrl:"partials/misc/cube.html"}),a.otherwise({redirectTo:"/"})}]),mobileAngular.value("$strap.config",{datepicker:{format:"dd/mm/yyyy"}}),mobileAngular.run(["$rootScope","$window","$timeout",function(a,b){a.scrollX=b.scrollX,angular.element(b).bind("scroll",function(){a.scrollX=b.scrollX,a.$apply("scrollX")}),angular.element(b).bind("deviceorientation",function(b){a.orientationData=b,a.$apply("orientationData")}),screenfull.onchange=function(){a.fullscreen=screenfull.isFullscreen,a.$apply("fullScreen")}}]),mobileAngular.controller("AccelerometerController",["$scope","$rootScope",function(a,b){b.$watch("orientationData",function(b){a.orientationData=b.originalEvent})}]),mobileAngular.controller("BootstrapController",["$scope","$http","ClientID","Backend","localStorage","Command","Vehicle","Staff","$window","StoreProvider","$rootScope","CommandUtils",function(a,b,c,d,e,f,g,h,i,j,k,l){var m="SMUR_BOOSTRAPED";a.boostraped=e.getItem(m),a.progress=0,a.$watch("progress",function(b){b>=100&&(a.ready=!0)}),a.save=function(){a.progress=0,a.alerts=[],c.set(a.clientID),d.set(a.backend),a.progress+=10,b.get(a.backend+"/persons").success(function(b){var c=0;h.clear().then(function(){var d=function(b,c){var e=c[b],f={firstname:e.firstname,lastname:e.lastname,"function":{store:"function",id:e.function}};h.save(f).then(function(){b++,b<c.length?d(b,c):a.progress+=30})};d(c,b)})}).error(function(){a.alerts.push({type:"error",title:"Impossible de récupérer les données. Vérifiez que l'adresse du serveur est bonne et qu'il est lancé"})}),b.get(a.backend+"/vehicles").success(function(b){var c=0;g.clear().then(function(){var d=function(b,c){var e=c[b],f={name:e.name,type:e.type};g.save(f).then(function(){b++,b<c.length?d(b,c):a.progress+=30})};d(c,b)})}).error(function(){a.alerts.push({type:"error",title:"Impossible de récupérer les données. Vérifiez que l'adresse du serveur est bonne et qu'il est lancé"})}),b.get(a.backend+"/commands"+'?{"$sort": {"date": 1}}').success(function(b){if(b.length<=0)return a.progress=100,void 0;var c=30/b.length,d=function(b,e){if(b>=e.length)return a.progress=100,void 0;var f=e[b];l.handleCommand(f,function(){a.progress+=c,d(++b,e)},!1,"read")};d(0,b)})},a.continue=function(){e.setItem(m,!0),i.location.reload()}}]),mobileAngular.controller("CommandController",["$scope","Command",function(a,b){a.commands=[],b.getAllSorted().then(function(b){console.log(b),a.commands=b})}]),mobileAngular.controller("ConnectionController",["$scope","$timeout","$location","$route","Command",function(a){a.offline=!1,a.$on("offline",function(){a.offline=!0}),a.$on("online",function(){a.offline=!1})}]),mobileAngular.controller("EditEventController",["$scope","$http","$location","$routeParams","Mission","Event","Vehicle","Utils",function(a,b,c,d,e,f,g,h){e.get(parseInt(d.missionId)).then(function(b){a.mission=b,d.eventId?f.get(parseInt(d.eventId)).then(function(b){a.event=b}):(a.event={},a.event.start=h.getCurrentDateAndTime(),a.event.end=h.getCurrentDateAndTime(),a.event.missionId=a.mission.id)}),g.getAll().then(function(b){a.vehicles=b}),b.get("/resources/event-types.json").success(function(b){a.types=b}),a.back=function(){c.url("/mission/"+a.mission.id).search({page:"event"})},a.save=function(){f.save(a.event).then(function(){a.back()})}}]),mobileAngular.controller("EventController",["$scope","$location","$window","$routeParams","Event",function(a,b,c,d,e){a.fetchEvents=function(){e.getByMissionId(d.missionId).then(function(b){a.events=b})},a.goToNewEvent=function(){b.url("/mission/"+d.missionId+"/events/new")},a.goToEditEvent=function(a){b.url("/mission/"+d.missionId+"/event/"+a+"/edit")},a.deleteModal=function(b){var d=c.confirm("Êtes vous sûr de vouloir supprimer l'évènement #"+b);d&&e.remove(b).then(function(){a.fetchEvents()})},a.fetchEvents()}]),mobileAngular.controller("FullScreenController",["$scope","$window",function(a){screenfull.enabled&&(a.fullscreenSupport=!0),a.requestFullScreen=function(){screenfull.request()}}]),mobileAngular.controller("GesturesController",["$scope",function(a){a.tapMe=function(){console.log("Tapped")},a.swipeMeLeft=function(){console.log("swiped to the left"),a.swipeLeft=!0},a.swipeMeRight=function(){console.log("swiped to the right"),a.swipeRight=!0},a.end=function(){console.log("Transition end")},a.onThreshold=function(a){console.log("Threshold",a)},a.myFunction=function(){console.log("Fonction métier")},a.moveDraggable=function(){a.dragSwitch=!a.dragSwitch},a.moveDraggable2=function(){a.dragSwitch2=!a.dragSwitch2},a.moveDraggable3=function(){a.dragSwitch3=!a.dragSwitch3},a.releaseMe=function(){a.dragMessage="right"},a.holdMe=function(){a.hold=!a.hold},a.$watch("dragSwitch",function(a){console.log("watch drag",a)}),a.hold=!1,a.dragSwitch=!1,a.dragSwitch2=!1,a.dragSwitch3=!1}]),mobileAngular.controller("MissionContainerController",["$scope","$routeParams","$http","$location","Mission","$window",function(a,b,c,d,e,f){a.getMission=function(){e.get(parseInt(b.missionId)).then(function(b){a.mission=b})},a.includeUrlIs=function(b){return a.includedUrl==b},a.toggleMenu=function(){a.menu=!a.menu},a.navigate=function(b){"back"==b?d.url("/"):(d.url("/mission/"+a.mission.id).search({page:b}),a.menu=!1)},a.getPathFromParams=function(){for(var b=d.search().page,c=0;c<a.menuItems.length;c++)if(a.menuItems[c].id==b)return a.menuItems[c].templateUrl;return""},a.showMenu=function(){a.includedUrl="",d.path("/mission/"+a.mission.id)},a.$on("$routeUpdate",function(){a.includedUrl=a.getPathFromParams(),f.scrollTo(0,0)}),a.$on("dataChanged",function(){a.getMission()}),c.get("/resources/mission-menu.json").success(function(b){a.menuItems=b,a.includedUrl=a.getPathFromParams()}),a.menu=!1,a.getMission()}]),mobileAngular.controller("MissionsController",["$scope","Mission","$location","$window",function(a,b,c,d){b.getAll().then(function(b){a.missions=b}),a.$on("dataChanged",function(){b.getAll().then(function(b){a.missions=b})}),a.navigateTo=function(a){c.url("/mission/"+a.id).search({page:"mission"})},a.goToNewMission=function(){c.url("/mission/new")},a.deleteModal=function(c){var e=d.confirm("Êtes vous sûr de vouloir supprimer la mission #"+c);e&&b.notifyAndRemove(c).then(function(){b.getAll().then(function(b){a.missions=b})})}}]),mobileAngular.controller("NewMissionController",["$scope","$location","Mission","Vehicle","Staff","Utils","Command",function(a,b,c,d,e,f){a.alerts=[],d.getAll().then(function(b){a.vehicles=b}),e.getAll().then(function(b){a.responsibles=b}),a.add=function(){if("1234"==a.password){var b=f.getCurrentDateAndTime();a.mission.created_at=b.date+" "+b.time,c.notifyAndSave(a.mission).then(function(){a.back()})}else a.alerts.push({type:"error",title:"Mauvais mot de passe",content:"Essayez 1234"})},a.back=function(){b.url("/")}}]),mobileAngular.controller("NewStaffController",["$scope","$http","$location","$routeParams","Mission","Staff","Utils",function(a,b,c,d,e,f,g){a.staff={},a.staff.time=g.getCurrentDateAndTime(),e.get(parseInt(d.missionId)).then(function(b){a.mission=b}),f.getAll().then(function(b){a.persons=b}),b.get("/resources/functions.json").success(function(b){a.functions=b}),a.back=function(){c.url("/mission/"+d.missionId).search({page:"staff"})},a.add=function(){void 0===a.mission.staff&&(a.mission.staff=[]),a.mission.staff.push(a.staff),e.save(a.mission).then(function(){a.back()})}}]),mobileAngular.controller("NewVehicleController",["$scope","$http","$location","$routeParams","Mission","Vehicle","Utils",function(a,b,c,d,e,f,g){e.get(parseInt(d.missionId)).then(function(b){a.mission=b}),f.getAll().then(function(b){a.vehicles=b}),b.get("/resources/vehicle-types.json").success(function(b){a.types=b,a.typeNames=[],a.types.forEach(function(b){a.typeNames.push(b.name)})}),a.back=function(){c.url("/mission/"+a.mission.id).search({page:"vehicle"})},a.add=function(){a.vehicle.store="vehicle",a.vehicle.time=g.getCurrentDateAndTime(),void 0===a.mission.vehicles&&(a.mission.vehicles=[]),a.mission.vehicles.push(a.vehicle),e.save(a.mission).then(function(){a.back()})}}]),mobileAngular.controller("NotificationController",["$scope","$timeout","$location","$route","Command",function(a,b,c,d,e){a.hideArray=[],a.removeArray=[],a.toggleChange=function(){a.change=!0,b(function(){a.change=!1},500)},a.nb=0,a.notificationsVisible=!1,a.$on("dataChanged",function(){a.loadNewCommands()}),a.loadNewCommands=function(){a.hideArray=[],e.getNewCommands().then(function(b){a.commands=b,b.length>a.nb&&a.toggleChange(),a.nb=b.length})},a.loadNewCommands(),a.toggleNotifcations=function(){a.notificationsVisible=!a.notificationsVisible},a.hide=function(b,c){a.hideArray[c]=!0,b.status="read",e.save(b).then(function(){a.nb--})},a.clear=function(){for(var b=0;b<a.commands.length;b++){var c=a.commands[b];c.status="read",e.save(c).then(function(){a.loadNewCommands()})}},a.goToNotification=function(b){if(b.status="read",e.save(b).then(function(){a.loadNewCommands(),a.toggleNotifcations()}),"delete"==b.data.type)c.url("/");else{var f="/mission/"+b.data.id,g=c.path();f==g?d.reload():c.path(f).search({page:"mission"})}},a.goToDetails=function(){c.path("/commands/")},a.$on("$routeChangeStart",function(){a.notificationsVisible&&(a.notificationsVisible=!1)})}]),mobileAngular.controller("StaffController",["$scope","$routeParams","$http","$window","$location","Mission","Staff",function(a,b,c,d,e,f,g){f.get(parseInt(b.missionId)).then(function(b){a.mission=b,a.refreshStaff()}),c.get("/resources/functions.json").success(function(b){a.functions=[],b.forEach(function(b){a.functions[b.id]=b.name})}),a.goToNewStaff=function(){e.url("/mission/"+a.mission.id+"/staff/new")},a.deleteModal=function(b){var c=d.confirm("Êtes vous sûr de vouloir supprimer la personne "+b.firstname+" "+b.lastname);if(c){var e=[];a.mission.staff.forEach(function(a){(a.id!=b.id||a.time.date!=b.time.date||a.time.time!=b.time.time)&&e.push(a)}),a.mission.staff=e,f.save(a.mission).then(function(){a.refreshStaff()})}},a.refreshStaff=function(){void 0!==a.mission.staff&&(a.staff=[],a.mission.staff.forEach(function(b){g.get(parseInt(b.id)).then(function(c){c.time=b.time,a.staff.push(c)})}))}}]),mobileAngular.controller("StorageManagementController",["$scope","$http","Mission","Staff","Event","Vehicle","FileSystem","FileSystemUtils","persistentStorage","Command","localStorage","ClientID","Backend",function(a,b,c,d,e,f,g,h,i,j,k,l,m){a.alerts=[],a.getStorageStats=function(){i?i.queryUsageAndQuota(function(b,c){a.fs={},a.fs.used=b,a.fs.total=c,a.fs.perc=100*(b/c)}):a.fsPolyfill=!0},a.getStorageStats(),a.clientId=l.get(),a.backend=m.get(),a.clearMission=function(){c.clear().then(function(){a.alerts.push({type:"success",title:"Mission cleared"})})},a.clearStaff=function(){d.clear().then(function(){a.alerts.push({type:"success",title:"Staff cleared"})})},a.clearEvent=function(){e.clear().then(function(){a.alerts.push({type:"success",title:"Event cleared"})})},a.clearVehicle=function(){f.clear().then(function(){a.alerts.push({type:"success",title:"Vehicle cleared"})})},a.clearCommand=function(){j.clear().then(function(){a.alerts.push({type:"success",title:"Command cleared"})})},a.populateStaff=function(){b.get(m.get()+"/persons").success(function(b){var c=0;d.clear().then(function(){var e=function(b,c){var f=c[b],g={firstname:f.firstname,lastname:f.lastname,"function":{store:"function",id:f.function}};d.save(g).then(function(){b++,b<c.length?e(b,c):a.alerts.push({type:"success",title:"Personnes ajoutées"})})};e(c,b)})})},a.populateVehicle=function(){b.get(m.get()+"/vehicles").success(function(b){var c=0;f.clear().then(function(){var d=function(b,c){var e=c[b],g={name:e.name,type:e.type};f.save(g).then(function(){b++,b<c.length?d(b,c):a.alerts.push({type:"success",title:"Véhicules ajoutés"})})};d(c,b)})})},a.clearFS=function(){g.getFileSystem().then(function(b){var c=b.root.createReader(),d=[],e=function(){c.readEntries(function(b){b.length?(d=d.concat(Array.prototype.slice.call(b||[],0)),d.forEach(function(b){b.isFile?b.remove(a.getStorageStats,h.errorHandler):b.removeRecursively(a.getStorageStats,h.errorHandler)})):listResults(d.sort())},h.errorHandler)};e()})},a.resetLastCmd=function(){k.setItem("LAST_CMD",0),a.alerts.push({type:"success",title:"ID de la dernière commande reçue remis à zéro."})},a.setClientId=function(){l.set(a.clientId),a.alerts.push({type:"success",title:"Client ID changé."})},a.setClientId=function(){m.set(a.backend),a.alerts.push({type:"success",title:"Backend changé."})}}]),mobileAngular.controller("UpdateMissionController",["$scope","$window","$routeParams","url","Mission","ImageStorage",function(a,b,c,d,e,f){a.$watch("mission",function(b){b&&b.image&&f.getURL(b.image).then(function(b){a.imageUrl=b})}),a.$watch("image",function(b){b&&(a.imageUrl=d.createObjectURL(b[0]))},!0),a.save=function(){if(void 0!==a.image&&a.image.length>0){var c=a.mission.image,d=a.image[0];c&&f.remove(c),f.save(d.name,d),a.mission.image=d.name}e.notifyAndSave(a.mission).then(function(){a.alerts=[],a.alerts.push({type:"success",title:"Succès",content:"Mission mise à jour avec succès"}),b.scrollTo(0,0)})}}]),mobileAngular.controller("VehicleController",["$scope","$routeParams","$window","$location","Mission","Vehicle",function(a,b,c,d,e,f){e.get(parseInt(b.missionId)).then(function(b){a.mission=b,a.refreshVehicles()}),a.goToNewVehicle=function(){d.url("/mission/"+a.mission.id+"/vehicle/new")},a.deleteModal=function(b){var d=c.confirm("Êtes vous sûr de vouloir supprimer le véhicule #"+b.name);if(d){var f=[];a.mission.vehicles.forEach(function(a){(a.id!=b.id||a.time.date!=b.time.date||a.time.time!=b.time.time)&&f.push(a)}),a.mission.vehicles=f,e.save(a.mission).then(function(){a.refreshVehicles()})}},a.refreshVehicles=function(){void 0!==a.mission.vehicles&&(a.vehicles=[],a.mission.vehicles.forEach(function(b){f.get(parseInt(b.id)).then(function(c){c.time=b.time,a.vehicles.push(c)})}))}}]),mobileAngular.directive("cube",["url","Utils",function(){return{restrict:"E",templateUrl:"/partials/directives/cube.html",link:function(a,b){var c=[Hammer.DIRECTION_LEFT,Hammer.DIRECTION_RIGHT],d=b.find("#cube");Hammer(b[0]).on("drag",function(a){a.gesture.preventDefault();var b,e=-a.gesture.angle,f=a.gesture.direction;console.log(c.indexOf(f)),-1!=c.indexOf(f)?(b="Y",e=a.gesture.deltaY):(b="X",e=a.gesture.deltaX),console.log(f,b),d.css("transform","translateZ( -100px ) rotate"+b+"("+a.gesture.angle+"deg)")})}}}]),mobileAngular.directive("loader",["url","Utils",function(){return{restrict:"E",templateUrl:"/partials/directives/loader.html"}}]),mobileAngular.directive("ngDrag",["$parse",function(){return{restrict:"E",scope:{dragSwitch:"=switch",bound:"@",onThreshold:"&",bounded:"@",preventDefault:"@"},link:function(a,b,c){var d=b.parent();a.thresholdExceeded=!1,void 0===c["switch"]&&(a.thresholdExceeded=a.dragSwitch),a.axis="X";var e="dragright dragleft";c.axis&&"Y"==c.axis.toUpperCase()&&(a.axis="Y",e="dragup dragdown"),void 0===a.bound&&(a.threshold=500),a.isAbove=function(a,b){return 0>b?b>=a:a>=b},a.isDeltaAboveBound=function(b){return a.bound<0?a.bound>=b:b>=a.bound},a.switch=function(b){void 0!==c["switch"]&&a.dragSwitch!=b&&(a.dragSwitch=b)},a.move=function(b,c){d.removeClass("animate"),c&&d.addClass("animate");var e;e="Y"==a.axis?"0,"+b+"px, 0":b+"px, 0, 0",d.css("transform","translate3d("+e+") scale3d(1,1,1)")},a.$watch("dragSwitch",function(b){a.thresholdExceeded=b,a.thresholdExceeded?a.move(a.bound,!0):a.move(0,!0)}),Hammer(d[0]).on(e,function(b){a.preventDefault&&b.gesture.preventDefault(),b.stopPropagation();var c=b.gesture["delta"+a.axis];a.thresholdExceeded&&(c+=parseInt(a.bound)),a.bounded&&a.isAbove(c,a.bound)&&(c=a.bound),a.move(c)}),Hammer(d[0]).on("release",function(b){a.preventDefault&&b.gesture.preventDefault(),$this=$(this);var c=b.gesture["delta"+a.axis];a.thresholdExceeded&&(c+=parseInt(a.bound)),a.isAbove(c,a.bound/2)?(a.thresholdExceeded=!0,a.switch(!0),a.$apply(function(){a.onThreshold()}),a.move(a.bound,!0)):a.thresholdExceeded?(a.thresholdExceeded=!1,a.switch(!1),a.$apply(),a.move("0",!0)):a.move("0",!0)})}}}]),mobileAngular.directive("ngFiles",function(){return{restrict:"A",scope:{files:"=ngModel"},link:function(a,b,c){if(void 0===c.ngModel)throw"ngFiles directive : ngModel attribute needed!";var d=angular.element(b);d.bind("change",function(){a.files=this.files,a.$apply()})}}}),mobileAngular.directive("ngTap",function(){return function(a,b,c){var d;d=!1,b.bind("touchstart",function(){b.addClass("active"),d=!0}),b.bind("touchmove",function(){b.removeClass("active"),d=!1}),b.bind("touchend",function(){b.removeClass("active"),d&&a.$apply(c.ngTap,b)})}}),mobileAngular.directive("onTransitionEnd",["$parse","transitionEndEvent",function(a,b){return{restrict:"A",link:function(c,d,e){var f=a(e.onTransitionEnd);d.bind(b,function(a){console.log("transion-end",a),c.$apply(function(){f(c)})})}}}]),mobileAngular.directive("thumbnail",function(){return{restrict:"E",scope:{src:"@"},templateUrl:"/partials/directives/thumbnail.html",link:function(a,b){var c=$("#overlay"),d=$("#lightBox");0==c.length&&($("body").append("<div id='overlay'></div>"),c=$("#overlay")),0==d.length&&($("body").append("<div id='lightBox'><img /></div>"),d=$("#lightBox")),Hammer(c[0]).on("tap",function(){d.hide(),$(this).hide()});var e=$(b).find("img");Hammer(e[0]).on("tap",function(){var a=$(window).height();$lightBoxImg=$("#lightBox>img"),$lightBoxImg.css("max-height",(a-100).toString()+"px"),$lightBoxImg.attr("src",$(this).attr("src")),$lightBoxImg.load(function(){c.show(),d.show(),d.css({"margin-left":-($lightBoxImg.width()/2),"margin-top":-($lightBoxImg.height()/2)})})})}}}),mobileAngular.filter("eventDestination",function(){return function(a){return"intervention"==a?"/partials/mission/events/address.html":"hospitalisation"==a?"/partials/mission/events/service.html":""}}),mobileAngular.filter("missionDestination",function(){return function(a){if(void 0!==a)for(var b=0;b<a.length;b++)if(a[b].type==intervention)return a[b].city}}),mobileAngular.factory("Backend",["localStorage",function(a){var b="SMUR_BACKEND";return{get:function(){return a.getItem(b)},set:function(c){a.setItem(b,c)}}}]),mobileAngular.factory("Command",["$q","$rootScope","$http","$timeout","ClientID","IDBService",function(a,b,c,d,e,f){var g={store:void 0,getStore:function(){var c=a.defer();return this.store?c.resolve(this.store):new IDBStore({dbVersion:2,storeName:"commands",keyPath:"id",autoIncrement:!0,onStoreReady:function(){var a=this;g.store=this,b.$apply(function(){c.resolve(a)})},indexes:[{name:"origin"},{name:"date"},{name:"status"}]}),c.promise}},h=f.getIDBCrudObject(g);return h.sendIfNeeded=function(c,d,f){Date.now();var h=a.defer();if("delete"==f){h.resolve();var i={entity:c.storeName,id:d,type:"delete"},j={};j.date=Date.now(),j.origin=e.get(),j.status="waiting",j.data=i,g.getStore().then(function(a){a.put(j)})}else c.get(d.id,function(a){b.$apply(h.resolve());var f=new Array;if(a)for(var i in d)d[i]!=a[i]&&f.push({attribute:i,new_val:d[i],old_val:a[i]});else for(var i in d)f.push({attribute:i,new_val:d[i],old_val:""});if(f.length>0){var j={entity:c.storeName,id:d.id,type:"update",changes:f},k={};k.date=Date.now(),k.origin=e.get(),k.status="waiting",k.data=j,g.getStore().then(function(a){a.put(k)})}});return h.promise},h.getNonSentCommands=function(){var c=a.defer();return g.getStore().then(function(a){var d=a.makeKeyRange({lower:"waiting",upper:"waiting"});a.query(function(a){b.$apply(function(){c.resolve(a)})},{index:"status",keyRange:d})}),c.promise},h.getNewCommands=function(){var c=a.defer();return g.getStore().then(function(a){var d=a.makeKeyRange({lower:"new",upper:"new"});a.query(function(a){b.$apply(function(){c.resolve(a)})},{index:"status",keyRange:d})}),c.promise},h.getAllSorted=function(){var c=a.defer();return g.getStore().then(function(a){a.query(function(a){b.$apply(function(){c.resolve(a)})},{index:"date",order:"DESC"})}),c.promise},h}]),mobileAngular.service("CommandUtils",["StoreProvider","Command","$rootScope",function(a,b,c){return{handleCommand:function(d,e,f,g){d.status=g?g:"new",void 0===f&&(f=!0),b.save(d),localStorage.setItem("LAST_CMD",d.date);var h=d.data,i=h.entity,j=a.getStoreByName(i);if(!j)return console.log("Unknown entity"),e&&e(),void 0;var k=d.data.type;"delete"==k?j.remove(d.data.id).then(function(){f&&c.$broadcast("dataChanged"),e&&e()}):j.get(h.id).then(function(a){a||(a={},a.id=h.id);var b=h.changes;b.forEach(function(b){a[b.attribute]=b.new_val}),j.save(a).then(function(){f&&c.$broadcast("dataChanged"),e&&e()})})}}}]),mobileAngular.factory("Event",["$q","$rootScope","IDBService",function(a,b,c){var d={store:void 0,getStore:function(){var c=a.defer();return this.store?c.resolve(this.store):new IDBStore({dbVersion:2,storeName:"event",keyPath:"id",autoIncrement:!0,onStoreReady:function(){d.store=this;var a=this;b.$apply(function(){c.resolve(a)})},indexes:[{name:"missionId"}]}),c.promise}},e=c.getIDBCrudObject(d);return e.getByMissionId=function(c){var e=parseInt(c),f=a.defer();return d.getStore().then(function(a){var c=a.makeKeyRange({lower:e,upper:e});a.query(function(a){b.$apply(function(){f.resolve(a)})},{index:"missionId",keyRange:c})}),f.promise},e}]),mobileAngular.factory("FileSystem",["$q","$rootScope","$window","FileSystemUtils","persistentStorage","requestFileSystem",function(a,b,c,d,e,f){var g={getFileSystem:function(){var h=a.defer(),i=function(a){g.fileSystem=a,b.$apply(function(){h.resolve(a)})};return e?e.requestQuota(10485760,function(a){f(window.PERSISTENT,a,i,d.errorHandler)}):c.webkitStorageInfo?window.webkitStorageInfo.requestQuota(PERSISTENT,10485760,function(a){f(PERSISTENT,a,i,d.errorHandler)},function(a){console.log("Error",a)}):f?f(PERSISTENT,10485760,i,d.errorHandler):b.$apply(function(){h.reject("Cannot use FS API")}),h.promise}};return g}]),mobileAngular.factory("FileSystemUtils",["$q","$window",function(){return{errorHandler:function(a){var b="";switch(a.code){case FileError.QUOTA_EXCEEDED_ERR:b="Quota exceeded";break;case FileError.NOT_FOUND_ERR:b="Not found";break;case FileError.SECURITY_ERR:b="Security issue";break;case FileError.INVALID_MODIFICATION_ERR:b="Invalid modification";break;case FileError.INVALID_STATE_ERR:b="Invalid state";break;default:b="Unknown Error"}console.log("Error: "+b),console.log(a)}}}]),mobileAngular.service("IDBService",["$q","$rootScope",function(a,b){return{getIDBCrudObject:function(c){return{getAll:function(){var d=a.defer();return c.getStore().then(function(a){a.getAll(function(a){b.$apply(function(){d.resolve(a)})})}),d.promise},get:function(d){var e=a.defer();return c.getStore().then(function(a){a.get(d,function(a){b.$apply(function(){e.resolve(a)})})}),e.promise},remove:function(d){var e=a.defer();return c.getStore().then(function(a){a.remove(d,function(){b.$apply(function(){e.resolve("Sucess")})})}),e.promise},save:function(d){void 0===d.id&&(d.id=Date.now());var e=a.defer();return c.getStore().then(function(a){a.put(d,function(){b.$apply(function(){e.resolve("Sucess")})})}),e.promise},clear:function(){var d=a.defer();return c.getStore().then(function(a){a.clear(function(){b.$apply(function(){d.resolve("Sucess")})})}),d.promise}}}}}]),mobileAngular.factory("ImageStorage",["$q","$rootScope","FileSystem","FileSystemUtils",function(a,b,c,d){return{save:function(e,f){var g=a.defer();return c.getFileSystem().then(function(a){a.root.getFile(e,{create:!0},function(a){a.createWriter(function(a){a.onwriteend=function(){b.$apply(function(){g.resolve()})},a.onerror=function(a){console.log("Couldn't save image: "+a.toString())},a.write(f)},d.errorHandler)},d.errorHandler)}),g.promise},getURL:function(e){var f=a.defer();return c.getFileSystem().then(function(a){a.root.getFile(e,{},function(a){b.$apply(function(){f.resolve(a.toURL())})},d.errorHandler)}),f.promise},remove:function(a){c.getFileSystem().then(function(b){b.root.getFile(a,{create:!1},function(a){a.remove(function(){},d.errorHandler)},d.errorHandler)})}}}]),mobileAngular.factory("Mission",["$q","$rootScope","SyncedResourceService",function(a,b,c){var d={store:void 0,getStore:function(){var c=a.defer();return this.store?c.resolve(this.store):new IDBStore({dbVersion:1,storeName:"mission",keyPath:"id",autoIncrement:!0,onStoreReady:function(){d.store=this;var a=this;b.$apply(function(){c.resolve(a)})}}),c.promise}};return c.syncedResourceManager(d)}]),mobileAngular.factory("SocketService",["Backend",function(a){return io.connect(a.get())}]),mobileAngular.factory("Staff",["$q","$rootScope","IDBService",function(a,b,c){var d={store:void 0,getStore:function(){var c=a.defer();return this.store?c.resolve(this.store):new IDBStore({dbVersion:2,storeName:"staff",keyPath:"id",autoIncrement:!0,onStoreReady:function(){d.store=this;var a=this;b.$apply(function(){c.resolve(a)})}}),c.promise}};return c.getIDBCrudObject(d)}]),mobileAngular.service("StoreProvider",["Mission","Event","Vehicle","Staff",function(a,b,c,d){return{getStoreByName:function(e){return"mission"==e?a:"event"==e?b:"vehicle"==e?c:"person"==e?d:void 0}}}]),mobileAngular.service("SyncedResourceService",["$q","$rootScope","IDBService","Command",function(a,b,c,d){return{syncedResourceManager:function(b){var e=c.getIDBCrudObject(b);return e.notifyAndRemove=function(c){var f=a.defer();return b.getStore().then(function(a){d.sendIfNeeded(a,c,"delete").then(function(){e.remove(c).then(function(){f.resolve()})})}),f.promise},e.notifyAndSave=function(c){var f=a.defer();return void 0===c.id&&(c.id=Date.now()),b.getStore().then(function(a){d.sendIfNeeded(a,c,"update").then(function(){e.save(c).then(function(){f.resolve()})})}),f.promise},e}}}]),mobileAngular.value("url",window.URL||window.webkitURL),mobileAngular.service("Utils",function(){return{getCurrentDateAndTime:function(){var a=new Date;return{date:a.getFullYear()+"-"+this.toTwoDigits(a.getMonth()+1)+"-"+this.toTwoDigits(a.getDate()),time:this.toTwoDigits(a.getHours())+":"+this.toTwoDigits(a.getMinutes())}},toTwoDigits:function(a){var b=a.toString();return 1==b.length&&(b="0"+b),b},dataURLToBlob:function(a){var b=";base64,";if(-1==a.indexOf(b)){var c=a.split(","),d=c[0].split(":")[1],e=c[1];return new Blob([e],{type:d})}for(var c=a.split(b),d=c[0].split(":")[1],e=window.atob(c[1]),f=e.length,g=new Uint8Array(f),h=0;f>h;++h)g[h]=e.charCodeAt(h);return new Blob([g],{type:d})}}}),mobileAngular.factory("Vehicle",["$q","$rootScope","IDBService",function(a,b,c){var d={store:void 0,getStore:function(){var c=a.defer();return this.store?c.resolve(this.store):new IDBStore({dbVersion:1,storeName:"vehicle",keyPath:"id",autoIncrement:!0,onStoreReady:function(){d.store=this;var a=this;b.$apply(function(){c.resolve(a)})}}),c.promise}};return c.getIDBCrudObject(d)}]),mobileAngular.factory("ClientID",["localStorage",function(a){var b="SMUR_CLIENT_ID";return{get:function(){var c=a.getItem(b);return c?c:(this.set("temporaryClientId"),"temporaryClientId")},set:function(c){a.setItem(b,c)}}}]),mobileAngular.value("localStorage",window.localStorage),mobileAngular.value("persistentStorage",navigator.persistentStorage||navigator.webkitPersistentStorage),mobileAngular.value("requestFileSystem",window.requestFileSystem||window.webkitRequestFileSystem),mobileAngular.factory("transitionEndEvent",function(){var a,b,c=document.createElement("fakeelement"),d={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",msTransition:"MSTransitionEnd",transition:"transitionend"};for(a in d)void 0!==c.style[a]&&(b=d[a]);return c=null,b}),mobileAngular.run(["SocketService","$http","ClientID","CommandUtils","localStorage","Backend","$rootScope",function(a,b,c,d,e,f,g){var h=function(){var a=e.getItem("LAST_CMD"),c="";a&&(c='?{"date": {"$gt":'+a+'},"$sort": {"date": 1}}'),b.get(f.get()+"/commands"+c).success(function(a){var b=function(a,c){if(a>=c.length)return g.$broadcast("dataChanged"),void 0;var e=c[a];d.handleCommand(e,function(){b(++a,c)},!1)};b(0,a)})};a.on("commands:new",function(a){e.setItem("LAST_CMD",a.date);var b=c.get();console.log(a.origin,b),a.origin!=b&&d.handleCommand(a)}),a.on("error",function(){g.$broadcast("offline")}),a.on("disconnect",function(){g.$broadcast("offline")}),a.on("reconnect",function(){g.$broadcast("online")}),a.on("connect",h)}]),mobileAngular.run(["$timeout","$http","Command","Backend",function(a,b,c,d){var e=5e3;a(function f(){c.getNonSentCommands().then(function(a){if(0!=a.length){var e=function(a,f){if(!(f>=a.length)){var g=a[f],h=JSON.parse(JSON.stringify(g));delete h.id,b.post(d.get()+"/commands",h).success(function(){g.status="sent",c.save(g).then(function(){e(a,++f)})})}};e(a,0)}}),a(f,e)},e)
}]),function(a){function b(b){var c,d,e=b.charAt(0).toUpperCase()+b.slice(1),f=["Moz","Webkit","O","ms"],g=document.createElement("div");if(b in g.style)d=b;else for(var h=0;h<f.length;h++)if(c=f[h]+e,c in g.style){d=c;break}return g=null,a.support[b]=d,d}if(!a.cssHooks)throw"jQuery 1.4.3+ is needed for this plugin to work";var c=b("transform");c&&"transform"!==c&&(a.cssHooks.transform={get:function(b){return a.css(b,c)},set:function(a,b){a.style[c]=b}})}(jQuery),mobileAngular.controller("AccelerometerController",["$scope","$rootScope",function(a,b){b.$watch("orientationData",function(b){a.orientationData=b.originalEvent})}]),mobileAngular.controller("BootstrapController",["$scope","$http","ClientID","Backend","localStorage","Command","Vehicle","Staff","$window","StoreProvider","$rootScope","CommandUtils",function(a,b,c,d,e,f,g,h,i,j,k,l){var m="SMUR_BOOSTRAPED";a.boostraped=e.getItem(m),a.progress=0,a.$watch("progress",function(b){b>=100&&(a.ready=!0)}),a.save=function(){a.progress=0,a.alerts=[],c.set(a.clientID),d.set(a.backend),a.progress+=10,b.get(a.backend+"/persons").success(function(b){var c=0;h.clear().then(function(){var d=function(b,c){var e=c[b],f={firstname:e.firstname,lastname:e.lastname,"function":{store:"function",id:e.function}};h.save(f).then(function(){b++,b<c.length?d(b,c):a.progress+=30})};d(c,b)})}).error(function(){a.alerts.push({type:"error",title:"Impossible de récupérer les données. Vérifiez que l'adresse du serveur est bonne et qu'il est lancé"})}),b.get(a.backend+"/vehicles").success(function(b){var c=0;g.clear().then(function(){var d=function(b,c){var e=c[b],f={name:e.name,type:e.type};g.save(f).then(function(){b++,b<c.length?d(b,c):a.progress+=30})};d(c,b)})}).error(function(){a.alerts.push({type:"error",title:"Impossible de récupérer les données. Vérifiez que l'adresse du serveur est bonne et qu'il est lancé"})}),b.get(a.backend+"/commands"+'?{"$sort": {"date": 1}}').success(function(b){if(b.length<=0)return a.progress=100,void 0;var c=30/b.length,d=function(b,e){if(b>=e.length)return a.progress=100,void 0;var f=e[b];l.handleCommand(f,function(){a.progress+=c,d(++b,e)},!1,"read")};d(0,b)})},a.continue=function(){e.setItem(m,!0),i.location.reload()}}]),mobileAngular.controller("CommandController",["$scope","Command",function(a,b){a.commands=[],b.getAllSorted().then(function(b){console.log(b),a.commands=b})}]),mobileAngular.controller("ConnectionController",["$scope","$timeout","$location","$route","Command",function(a){a.offline=!1,a.$on("offline",function(){a.offline=!0}),a.$on("online",function(){a.offline=!1})}]),mobileAngular.controller("EditEventController",["$scope","$http","$location","$routeParams","Mission","Event","Vehicle","Utils",function(a,b,c,d,e,f,g,h){e.get(parseInt(d.missionId)).then(function(b){a.mission=b,d.eventId?f.get(parseInt(d.eventId)).then(function(b){a.event=b}):(a.event={},a.event.start=h.getCurrentDateAndTime(),a.event.end=h.getCurrentDateAndTime(),a.event.missionId=a.mission.id)}),g.getAll().then(function(b){a.vehicles=b}),b.get("/resources/event-types.json").success(function(b){a.types=b}),a.back=function(){c.url("/mission/"+a.mission.id).search({page:"event"})},a.save=function(){f.save(a.event).then(function(){a.back()})}}]),mobileAngular.controller("EventController",["$scope","$location","$window","$routeParams","Event",function(a,b,c,d,e){a.fetchEvents=function(){e.getByMissionId(d.missionId).then(function(b){a.events=b})},a.goToNewEvent=function(){b.url("/mission/"+d.missionId+"/events/new")},a.goToEditEvent=function(a){b.url("/mission/"+d.missionId+"/event/"+a+"/edit")},a.deleteModal=function(b){var d=c.confirm("Êtes vous sûr de vouloir supprimer l'évènement #"+b);d&&e.remove(b).then(function(){a.fetchEvents()})},a.fetchEvents()}]),mobileAngular.controller("FullScreenController",["$scope","$window",function(a){screenfull.enabled&&(a.fullscreenSupport=!0),a.requestFullScreen=function(){screenfull.request()}}]),mobileAngular.controller("GesturesController",["$scope",function(a){a.tapMe=function(){console.log("Tapped")},a.swipeMeLeft=function(){console.log("swiped to the left"),a.swipeLeft=!0},a.swipeMeRight=function(){console.log("swiped to the right"),a.swipeRight=!0},a.end=function(){console.log("Transition end")},a.onThreshold=function(a){console.log("Threshold",a)},a.myFunction=function(){console.log("Fonction métier")},a.moveDraggable=function(){a.dragSwitch=!a.dragSwitch},a.moveDraggable2=function(){a.dragSwitch2=!a.dragSwitch2},a.moveDraggable3=function(){a.dragSwitch3=!a.dragSwitch3},a.releaseMe=function(){a.dragMessage="right"},a.holdMe=function(){a.hold=!a.hold},a.$watch("dragSwitch",function(a){console.log("watch drag",a)}),a.hold=!1,a.dragSwitch=!1,a.dragSwitch2=!1,a.dragSwitch3=!1}]),mobileAngular.controller("MissionContainerController",["$scope","$routeParams","$http","$location","Mission","$window",function(a,b,c,d,e,f){a.getMission=function(){e.get(parseInt(b.missionId)).then(function(b){a.mission=b})},a.includeUrlIs=function(b){return a.includedUrl==b},a.toggleMenu=function(){a.menu=!a.menu},a.navigate=function(b){"back"==b?d.url("/"):(d.url("/mission/"+a.mission.id).search({page:b}),a.menu=!1)},a.getPathFromParams=function(){for(var b=d.search().page,c=0;c<a.menuItems.length;c++)if(a.menuItems[c].id==b)return a.menuItems[c].templateUrl;return""},a.showMenu=function(){a.includedUrl="",d.path("/mission/"+a.mission.id)},a.$on("$routeUpdate",function(){a.includedUrl=a.getPathFromParams(),f.scrollTo(0,0)}),a.$on("dataChanged",function(){a.getMission()}),c.get("/resources/mission-menu.json").success(function(b){a.menuItems=b,a.includedUrl=a.getPathFromParams()}),a.menu=!1,a.getMission()}]),mobileAngular.controller("MissionsController",["$scope","Mission","$location","$window",function(a,b,c,d){console.log("Hello world"),b.getAll().then(function(b){a.missions=b}),a.$on("dataChanged",function(){b.getAll().then(function(b){a.missions=b})}),a.navigateTo=function(a){c.url("/mission/"+a.id).search({page:"mission"})},a.goToNewMission=function(){c.url("/mission/new")},a.deleteModal=function(c){var e=d.confirm("Êtes vous sûr de vouloir supprimer la mission #"+c);e&&b.notifyAndRemove(c).then(function(){b.getAll().then(function(b){a.missions=b})})}}]),mobileAngular.controller("NewMissionController",["$scope","$location","Mission","Vehicle","Staff","Utils","Command",function(a,b,c,d,e,f){a.alerts=[],d.getAll().then(function(b){a.vehicles=b}),e.getAll().then(function(b){a.responsibles=b}),a.add=function(){if("1234"==a.password){var b=f.getCurrentDateAndTime();a.mission.created_at=b.date+" "+b.time,c.notifyAndSave(a.mission).then(function(){a.back()})}else a.alerts.push({type:"error",title:"Mauvais mot de passe",content:"Essayez 1234"})},a.back=function(){b.url("/")}}]),mobileAngular.controller("NewStaffController",["$scope","$http","$location","$routeParams","Mission","Staff","Utils",function(a,b,c,d,e,f,g){a.staff={},a.staff.time=g.getCurrentDateAndTime(),e.get(parseInt(d.missionId)).then(function(b){a.mission=b}),f.getAll().then(function(b){a.persons=b}),b.get("/resources/functions.json").success(function(b){a.functions=b}),a.back=function(){c.url("/mission/"+d.missionId).search({page:"staff"})},a.add=function(){void 0===a.mission.staff&&(a.mission.staff=[]),a.mission.staff.push(a.staff),e.save(a.mission).then(function(){a.back()})}}]),mobileAngular.controller("NewVehicleController",["$scope","$http","$location","$routeParams","Mission","Vehicle","Utils",function(a,b,c,d,e,f,g){e.get(parseInt(d.missionId)).then(function(b){a.mission=b}),f.getAll().then(function(b){a.vehicles=b}),b.get("/resources/vehicle-types.json").success(function(b){a.types=b,a.typeNames=[],a.types.forEach(function(b){a.typeNames.push(b.name)})}),a.back=function(){c.url("/mission/"+a.mission.id).search({page:"vehicle"})},a.add=function(){a.vehicle.store="vehicle",a.vehicle.time=g.getCurrentDateAndTime(),void 0===a.mission.vehicles&&(a.mission.vehicles=[]),a.mission.vehicles.push(a.vehicle),e.save(a.mission).then(function(){a.back()})}}]),mobileAngular.controller("NotificationController",["$scope","$timeout","$location","$route","Command",function(a,b,c,d,e){a.hideArray=[],a.removeArray=[],a.toggleChange=function(){a.change=!0,b(function(){a.change=!1},500)},a.nb=0,a.notificationsVisible=!1,a.$on("dataChanged",function(){a.loadNewCommands()}),a.loadNewCommands=function(){a.hideArray=[],e.getNewCommands().then(function(b){a.commands=b,b.length>a.nb&&a.toggleChange(),a.nb=b.length})},a.loadNewCommands(),a.toggleNotifcations=function(){a.notificationsVisible=!a.notificationsVisible},a.hide=function(b,c){a.hideArray[c]=!0,b.status="read",e.save(b).then(function(){a.nb--})},a.clear=function(){for(var b=0;b<a.commands.length;b++){var c=a.commands[b];c.status="read",e.save(c).then(function(){a.loadNewCommands()})}},a.goToNotification=function(b){if(b.status="read",e.save(b).then(function(){a.loadNewCommands(),a.toggleNotifcations()}),"delete"==b.data.type)c.url("/");else{var f="/mission/"+b.data.id,g=c.path();f==g?d.reload():c.path(f).search({page:"mission"})}},a.goToDetails=function(){c.path("/commands/")},a.$on("$routeChangeStart",function(){a.notificationsVisible&&(a.notificationsVisible=!1)})}]),mobileAngular.controller("StaffController",["$scope","$routeParams","$http","$window","$location","Mission","Staff",function(a,b,c,d,e,f,g){f.get(parseInt(b.missionId)).then(function(b){a.mission=b,a.refreshStaff()}),c.get("/resources/functions.json").success(function(b){a.functions=[],b.forEach(function(b){a.functions[b.id]=b.name})}),a.goToNewStaff=function(){e.url("/mission/"+a.mission.id+"/staff/new")},a.deleteModal=function(b){var c=d.confirm("Êtes vous sûr de vouloir supprimer la personne "+b.firstname+" "+b.lastname);if(c){var e=[];a.mission.staff.forEach(function(a){(a.id!=b.id||a.time.date!=b.time.date||a.time.time!=b.time.time)&&e.push(a)}),a.mission.staff=e,f.save(a.mission).then(function(){a.refreshStaff()})}},a.refreshStaff=function(){void 0!==a.mission.staff&&(a.staff=[],a.mission.staff.forEach(function(b){g.get(parseInt(b.id)).then(function(c){c.time=b.time,a.staff.push(c)})}))}}]),mobileAngular.controller("StorageManagementController",["$scope","$http","Mission","Staff","Event","Vehicle","FileSystem","FileSystemUtils","persistentStorage","Command","localStorage","ClientID","Backend",function(a,b,c,d,e,f,g,h,i,j,k,l,m){a.alerts=[],a.getStorageStats=function(){i?i.queryUsageAndQuota(function(b,c){a.fs={},a.fs.used=b,a.fs.total=c,a.fs.perc=100*(b/c)}):a.fsPolyfill=!0},a.getStorageStats(),a.clientId=l.get(),a.backend=m.get(),a.clearMission=function(){c.clear().then(function(){a.alerts.push({type:"success",title:"Mission cleared"})})},a.clearStaff=function(){d.clear().then(function(){a.alerts.push({type:"success",title:"Staff cleared"})})},a.clearEvent=function(){e.clear().then(function(){a.alerts.push({type:"success",title:"Event cleared"})})},a.clearVehicle=function(){f.clear().then(function(){a.alerts.push({type:"success",title:"Vehicle cleared"})})},a.clearCommand=function(){j.clear().then(function(){a.alerts.push({type:"success",title:"Command cleared"})})},a.populateStaff=function(){b.get(m.get()+"/persons").success(function(b){var c=0;d.clear().then(function(){var e=function(b,c){var f=c[b],g={firstname:f.firstname,lastname:f.lastname,"function":{store:"function",id:f.function}};d.save(g).then(function(){b++,b<c.length?e(b,c):a.alerts.push({type:"success",title:"Personnes ajoutées"})})};e(c,b)})})},a.populateVehicle=function(){b.get(m.get()+"/vehicles").success(function(b){var c=0;f.clear().then(function(){var d=function(b,c){var e=c[b],g={name:e.name,type:e.type};f.save(g).then(function(){b++,b<c.length?d(b,c):a.alerts.push({type:"success",title:"Véhicules ajoutés"})})};d(c,b)})})},a.clearFS=function(){g.getFileSystem().then(function(b){var c=b.root.createReader(),d=[],e=function(){c.readEntries(function(b){b.length?(d=d.concat(Array.prototype.slice.call(b||[],0)),d.forEach(function(b){b.isFile?b.remove(a.getStorageStats,h.errorHandler):b.removeRecursively(a.getStorageStats,h.errorHandler)})):listResults(d.sort())},h.errorHandler)};e()})},a.resetLastCmd=function(){k.setItem("LAST_CMD",0),a.alerts.push({type:"success",title:"ID de la dernière commande reçue remis à zéro."})},a.setClientId=function(){l.set(a.clientId),a.alerts.push({type:"success",title:"Client ID changé."})},a.setClientId=function(){m.set(a.backend),a.alerts.push({type:"success",title:"Backend changé."})}}]),mobileAngular.controller("UpdateMissionController",["$scope","$window","$routeParams","url","Mission","ImageStorage",function(a,b,c,d,e,f){a.$watch("mission",function(b){b&&b.image&&f.getURL(b.image).then(function(b){a.imageUrl=b})}),a.$watch("image",function(b){b&&(a.imageUrl=d.createObjectURL(b[0]))},!0),a.save=function(){if(void 0!==a.image&&a.image.length>0){var c=a.mission.image,d=a.image[0];c&&f.remove(c),f.save(d.name,d),a.mission.image=d.name}e.notifyAndSave(a.mission).then(function(){a.alerts=[],a.alerts.push({type:"success",title:"Succès",content:"Mission mise à jour avec succès"}),b.scrollTo(0,0)})}}]),mobileAngular.controller("VehicleController",["$scope","$routeParams","$window","$location","Mission","Vehicle",function(a,b,c,d,e,f){e.get(parseInt(b.missionId)).then(function(b){a.mission=b,a.refreshVehicles()}),a.goToNewVehicle=function(){d.url("/mission/"+a.mission.id+"/vehicle/new")},a.deleteModal=function(b){var d=c.confirm("Êtes vous sûr de vouloir supprimer le véhicule #"+b.name);if(d){var f=[];a.mission.vehicles.forEach(function(a){(a.id!=b.id||a.time.date!=b.time.date||a.time.time!=b.time.time)&&f.push(a)}),a.mission.vehicles=f,e.save(a.mission).then(function(){a.refreshVehicles()})}},a.refreshVehicles=function(){void 0!==a.mission.vehicles&&(a.vehicles=[],a.mission.vehicles.forEach(function(b){f.get(parseInt(b.id)).then(function(c){c.time=b.time,a.vehicles.push(c)})}))}}]),mobileAngular.directive("cube",["url","Utils",function(){return{restrict:"E",templateUrl:"/partials/directives/cube.html",link:function(a,b){var c=[Hammer.DIRECTION_LEFT,Hammer.DIRECTION_RIGHT],d=b.find("#cube");Hammer(b[0]).on("drag",function(a){a.gesture.preventDefault();var b,e=-a.gesture.angle,f=a.gesture.direction;console.log(c.indexOf(f)),-1!=c.indexOf(f)?(b="Y",e=a.gesture.deltaY):(b="X",e=a.gesture.deltaX),console.log(f,b),d.css("transform","translateZ( -100px ) rotate"+b+"("+a.gesture.angle+"deg)")})}}}]),mobileAngular.directive("loader",["url","Utils",function(){return{restrict:"E",templateUrl:"/partials/directives/loader.html"}}]),mobileAngular.directive("ngDrag",["$parse",function(){return{restrict:"E",scope:{dragSwitch:"=switch",bound:"@",onThreshold:"&",bounded:"@",preventDefault:"@"},link:function(a,b,c){var d=b.parent();a.thresholdExceeded=!1,void 0===c["switch"]&&(a.thresholdExceeded=a.dragSwitch),a.axis="X";var e="dragright dragleft";c.axis&&"Y"==c.axis.toUpperCase()&&(a.axis="Y",e="dragup dragdown"),void 0===a.bound&&(a.threshold=500),a.isAbove=function(a,b){return 0>b?b>=a:a>=b},a.isDeltaAboveBound=function(b){return a.bound<0?a.bound>=b:b>=a.bound},a.switch=function(b){void 0!==c["switch"]&&a.dragSwitch!=b&&(a.dragSwitch=b)},a.move=function(b,c){d.removeClass("animate"),c&&d.addClass("animate");var e;e="Y"==a.axis?"0,"+b+"px, 0":b+"px, 0, 0",d.css("transform","translate3d("+e+") scale3d(1,1,1)")},a.$watch("dragSwitch",function(b){a.thresholdExceeded=b,a.thresholdExceeded?a.move(a.bound,!0):a.move(0,!0)}),Hammer(d[0]).on(e,function(b){a.preventDefault&&b.gesture.preventDefault(),b.stopPropagation();var c=b.gesture["delta"+a.axis];a.thresholdExceeded&&(c+=parseInt(a.bound)),a.bounded&&a.isAbove(c,a.bound)&&(c=a.bound),a.move(c)}),Hammer(d[0]).on("release",function(b){a.preventDefault&&b.gesture.preventDefault(),$this=$(this);var c=b.gesture["delta"+a.axis];a.thresholdExceeded&&(c+=parseInt(a.bound)),a.isAbove(c,a.bound/2)?(a.thresholdExceeded=!0,a.switch(!0),a.$apply(function(){a.onThreshold()}),a.move(a.bound,!0)):a.thresholdExceeded?(a.thresholdExceeded=!1,a.switch(!1),a.$apply(),a.move("0",!0)):a.move("0",!0)})}}}]),mobileAngular.directive("ngFiles",function(){return{restrict:"A",scope:{files:"=ngModel"},link:function(a,b,c){if(void 0===c.ngModel)throw"ngFiles directive : ngModel attribute needed!";var d=angular.element(b);d.bind("change",function(){a.files=this.files,a.$apply()})}}}),mobileAngular.directive("ngTap",function(){return function(a,b,c){var d;d=!1,b.bind("touchstart",function(){b.addClass("active"),d=!0}),b.bind("touchmove",function(){b.removeClass("active"),d=!1}),b.bind("touchend",function(){b.removeClass("active"),d&&a.$apply(c.ngTap,b)})}}),mobileAngular.directive("onTransitionEnd",["$parse","transitionEndEvent",function(a,b){return{restrict:"A",link:function(c,d,e){var f=a(e.onTransitionEnd);d.bind(b,function(a){console.log("transion-end",a),c.$apply(function(){f(c)})})}}}]),mobileAngular.directive("thumbnail",function(){return{restrict:"E",scope:{src:"@"},templateUrl:"/partials/directives/thumbnail.html",link:function(a,b){var c=$("#overlay"),d=$("#lightBox");0==c.length&&($("body").append("<div id='overlay'></div>"),c=$("#overlay")),0==d.length&&($("body").append("<div id='lightBox'><img /></div>"),d=$("#lightBox")),Hammer(c[0]).on("tap",function(){d.hide(),$(this).hide()});var e=$(b).find("img");Hammer(e[0]).on("tap",function(){var a=$(window).height();$lightBoxImg=$("#lightBox>img"),$lightBoxImg.css("max-height",(a-100).toString()+"px"),$lightBoxImg.attr("src",$(this).attr("src")),$lightBoxImg.load(function(){c.show(),d.show(),d.css({"margin-left":-($lightBoxImg.width()/2),"margin-top":-($lightBoxImg.height()/2)})})})}}}),mobileAngular.filter("eventDestination",function(){return function(a){return"intervention"==a?"/partials/mission/events/address.html":"hospitalisation"==a?"/partials/mission/events/service.html":""}}),mobileAngular.filter("missionDestination",function(){return function(a){if(void 0!==a)for(var b=0;b<a.length;b++)if(a[b].type==intervention)return a[b].city}}),mobileAngular.factory("Backend",["localStorage",function(a){var b="SMUR_BACKEND";return{get:function(){return a.getItem(b)},set:function(c){a.setItem(b,c)}}}]),mobileAngular.factory("Command",["$q","$rootScope","$http","$timeout","ClientID","IDBService",function(a,b,c,d,e,f){var g={store:void 0,getStore:function(){var c=a.defer();return this.store?c.resolve(this.store):new IDBStore({dbVersion:2,storeName:"commands",keyPath:"id",autoIncrement:!0,onStoreReady:function(){var a=this;g.store=this,b.$apply(function(){c.resolve(a)})},indexes:[{name:"origin"},{name:"date"},{name:"status"}]}),c.promise}},h=f.getIDBCrudObject(g);return h.sendIfNeeded=function(c,d,f){Date.now();var h=a.defer();if("delete"==f){h.resolve();var i={entity:c.storeName,id:d,type:"delete"},j={};j.date=Date.now(),j.origin=e.get(),j.status="waiting",j.data=i,g.getStore().then(function(a){a.put(j)})}else c.get(d.id,function(a){b.$apply(h.resolve());var f=new Array;if(a)for(var i in d)d[i]!=a[i]&&f.push({attribute:i,new_val:d[i],old_val:a[i]});else for(var i in d)f.push({attribute:i,new_val:d[i],old_val:""});if(f.length>0){var j={entity:c.storeName,id:d.id,type:"update",changes:f},k={};k.date=Date.now(),k.origin=e.get(),k.status="waiting",k.data=j,g.getStore().then(function(a){a.put(k)})}});return h.promise},h.getNonSentCommands=function(){var c=a.defer();return g.getStore().then(function(a){var d=a.makeKeyRange({lower:"waiting",upper:"waiting"});a.query(function(a){b.$apply(function(){c.resolve(a)})},{index:"status",keyRange:d})}),c.promise},h.getNewCommands=function(){var c=a.defer();return g.getStore().then(function(a){var d=a.makeKeyRange({lower:"new",upper:"new"});a.query(function(a){b.$apply(function(){c.resolve(a)})},{index:"status",keyRange:d})}),c.promise},h.getAllSorted=function(){var c=a.defer();return g.getStore().then(function(a){a.query(function(a){b.$apply(function(){c.resolve(a)})},{index:"date",order:"DESC"})}),c.promise},h}]),mobileAngular.service("CommandUtils",["StoreProvider","Command","$rootScope",function(a,b,c){return{handleCommand:function(d,e,f,g){d.status=g?g:"new",void 0===f&&(f=!0),b.save(d),localStorage.setItem("LAST_CMD",d.date);var h=d.data,i=h.entity,j=a.getStoreByName(i);if(!j)return console.log("Unknown entity"),e&&e(),void 0;var k=d.data.type;"delete"==k?j.remove(d.data.id).then(function(){f&&c.$broadcast("dataChanged"),e&&e()}):j.get(h.id).then(function(a){a||(a={},a.id=h.id);var b=h.changes;b.forEach(function(b){a[b.attribute]=b.new_val}),j.save(a).then(function(){f&&c.$broadcast("dataChanged"),e&&e()})})}}}]),mobileAngular.factory("Event",["$q","$rootScope","IDBService",function(a,b,c){var d={store:void 0,getStore:function(){var c=a.defer();return this.store?c.resolve(this.store):new IDBStore({dbVersion:2,storeName:"event",keyPath:"id",autoIncrement:!0,onStoreReady:function(){d.store=this;var a=this;b.$apply(function(){c.resolve(a)})},indexes:[{name:"missionId"}]}),c.promise}},e=c.getIDBCrudObject(d);return e.getByMissionId=function(c){var e=parseInt(c),f=a.defer();return d.getStore().then(function(a){var c=a.makeKeyRange({lower:e,upper:e});a.query(function(a){b.$apply(function(){f.resolve(a)})},{index:"missionId",keyRange:c})}),f.promise},e}]),mobileAngular.factory("FileSystem",["$q","$rootScope","$window","FileSystemUtils","persistentStorage","requestFileSystem",function(a,b,c,d,e,f){var g={getFileSystem:function(){var h=a.defer(),i=function(a){g.fileSystem=a,b.$apply(function(){h.resolve(a)})};return e?e.requestQuota(10485760,function(a){f(window.PERSISTENT,a,i,d.errorHandler)}):c.webkitStorageInfo?window.webkitStorageInfo.requestQuota(PERSISTENT,10485760,function(a){f(PERSISTENT,a,i,d.errorHandler)},function(a){console.log("Error",a)}):f?f(PERSISTENT,10485760,i,d.errorHandler):b.$apply(function(){h.reject("Cannot use FS API")}),h.promise}};return g}]),mobileAngular.factory("FileSystemUtils",["$q","$window",function(){return{errorHandler:function(a){var b="";switch(a.code){case FileError.QUOTA_EXCEEDED_ERR:b="Quota exceeded";break;case FileError.NOT_FOUND_ERR:b="Not found";break;case FileError.SECURITY_ERR:b="Security issue";break;case FileError.INVALID_MODIFICATION_ERR:b="Invalid modification";break;case FileError.INVALID_STATE_ERR:b="Invalid state";break;default:b="Unknown Error"}console.log("Error: "+b),console.log(a)}}}]),mobileAngular.service("IDBService",["$q","$rootScope",function(a,b){return{getIDBCrudObject:function(c){return{getAll:function(){var d=a.defer();return c.getStore().then(function(a){a.getAll(function(a){b.$apply(function(){d.resolve(a)})})}),d.promise},get:function(d){var e=a.defer();return c.getStore().then(function(a){a.get(d,function(a){b.$apply(function(){e.resolve(a)})})}),e.promise},remove:function(d){var e=a.defer();return c.getStore().then(function(a){a.remove(d,function(){b.$apply(function(){e.resolve("Sucess")})})}),e.promise},save:function(d){void 0===d.id&&(d.id=Date.now());var e=a.defer();return c.getStore().then(function(a){a.put(d,function(){b.$apply(function(){e.resolve("Sucess")})})}),e.promise},clear:function(){var d=a.defer();return c.getStore().then(function(a){a.clear(function(){b.$apply(function(){d.resolve("Sucess")})})}),d.promise}}}}}]),mobileAngular.factory("ImageStorage",["$q","$rootScope","FileSystem","FileSystemUtils",function(a,b,c,d){return{save:function(e,f){var g=a.defer();return c.getFileSystem().then(function(a){a.root.getFile(e,{create:!0},function(a){a.createWriter(function(a){a.onwriteend=function(){b.$apply(function(){g.resolve()})},a.onerror=function(a){console.log("Couldn't save image: "+a.toString())},a.write(f)},d.errorHandler)},d.errorHandler)}),g.promise},getURL:function(e){var f=a.defer();return c.getFileSystem().then(function(a){a.root.getFile(e,{},function(a){b.$apply(function(){f.resolve(a.toURL())})},d.errorHandler)}),f.promise},remove:function(a){c.getFileSystem().then(function(b){b.root.getFile(a,{create:!1},function(a){a.remove(function(){},d.errorHandler)},d.errorHandler)})}}}]),mobileAngular.factory("Mission",["$q","$rootScope","SyncedResourceService",function(a,b,c){var d={store:void 0,getStore:function(){var c=a.defer();return this.store?c.resolve(this.store):new IDBStore({dbVersion:1,storeName:"mission",keyPath:"id",autoIncrement:!0,onStoreReady:function(){d.store=this;var a=this;b.$apply(function(){c.resolve(a)})}}),c.promise}};return c.syncedResourceManager(d)}]),mobileAngular.factory("SocketService",["Backend",function(a){return io.connect(a.get())}]),mobileAngular.factory("Staff",["$q","$rootScope","IDBService",function(a,b,c){var d={store:void 0,getStore:function(){var c=a.defer();return this.store?c.resolve(this.store):new IDBStore({dbVersion:2,storeName:"staff",keyPath:"id",autoIncrement:!0,onStoreReady:function(){d.store=this;var a=this;b.$apply(function(){c.resolve(a)})}}),c.promise}};return c.getIDBCrudObject(d)}]),mobileAngular.service("StoreProvider",["Mission","Event","Vehicle","Staff",function(a,b,c,d){return{getStoreByName:function(e){return"mission"==e?a:"event"==e?b:"vehicle"==e?c:"person"==e?d:void 0}}}]),mobileAngular.service("SyncedResourceService",["$q","$rootScope","IDBService","Command",function(a,b,c,d){return{syncedResourceManager:function(b){var e=c.getIDBCrudObject(b);return e.notifyAndRemove=function(c){var f=a.defer();return b.getStore().then(function(a){d.sendIfNeeded(a,c,"delete").then(function(){e.remove(c).then(function(){f.resolve()})})}),f.promise},e.notifyAndSave=function(c){var f=a.defer();return void 0===c.id&&(c.id=Date.now()),b.getStore().then(function(a){d.sendIfNeeded(a,c,"update").then(function(){e.save(c).then(function(){f.resolve()})})}),f.promise},e}}}]),mobileAngular.value("url",window.URL||window.webkitURL),mobileAngular.service("Utils",function(){return{getCurrentDateAndTime:function(){var a=new Date;return{date:a.getFullYear()+"-"+this.toTwoDigits(a.getMonth()+1)+"-"+this.toTwoDigits(a.getDate()),time:this.toTwoDigits(a.getHours())+":"+this.toTwoDigits(a.getMinutes())}},toTwoDigits:function(a){var b=a.toString();return 1==b.length&&(b="0"+b),b},dataURLToBlob:function(a){var b=";base64,";if(-1==a.indexOf(b)){var c=a.split(","),d=c[0].split(":")[1],e=c[1];return new Blob([e],{type:d})}for(var c=a.split(b),d=c[0].split(":")[1],e=window.atob(c[1]),f=e.length,g=new Uint8Array(f),h=0;f>h;++h)g[h]=e.charCodeAt(h);return new Blob([g],{type:d})}}}),mobileAngular.factory("Vehicle",["$q","$rootScope","IDBService",function(a,b,c){var d={store:void 0,getStore:function(){var c=a.defer();return this.store?c.resolve(this.store):new IDBStore({dbVersion:1,storeName:"vehicle",keyPath:"id",autoIncrement:!0,onStoreReady:function(){d.store=this;var a=this;b.$apply(function(){c.resolve(a)})}}),c.promise}};return c.getIDBCrudObject(d)}]),mobileAngular.factory("ClientID",["localStorage",function(a){var b="SMUR_CLIENT_ID";return{get:function(){var c=a.getItem(b);return c?c:(this.set("temporaryClientId"),"temporaryClientId")},set:function(c){a.setItem(b,c)}}}]),mobileAngular.value("localStorage",window.localStorage),mobileAngular.value("persistentStorage",navigator.persistentStorage||navigator.webkitPersistentStorage),mobileAngular.value("requestFileSystem",window.requestFileSystem||window.webkitRequestFileSystem),mobileAngular.factory("transitionEndEvent",function(){var a,b,c=document.createElement("fakeelement"),d={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",msTransition:"MSTransitionEnd",transition:"transitionend"};for(a in d)void 0!==c.style[a]&&(b=d[a]);return c=null,b}),mobileAngular.run(["SocketService","$http","ClientID","CommandUtils","localStorage","Backend","$rootScope",function(a,b,c,d,e,f,g){var h=function(){var a=e.getItem("LAST_CMD"),c="";a&&(c='?{"date": {"$gt":'+a+'},"$sort": {"date": 1}}'),b.get(f.get()+"/commands"+c).success(function(a){var b=function(a,c){if(a>=c.length)return g.$broadcast("dataChanged"),void 0;var e=c[a];d.handleCommand(e,function(){b(++a,c)},!1)};b(0,a)})};a.on("commands:new",function(a){e.setItem("LAST_CMD",a.date);var b=c.get();console.log(a.origin,b),a.origin!=b&&d.handleCommand(a)}),a.on("error",function(){g.$broadcast("offline")}),a.on("disconnect",function(){g.$broadcast("offline")}),a.on("reconnect",function(){g.$broadcast("online")}),a.on("connect",h)}]),mobileAngular.run(["$timeout","$http","Command","Backend",function(a,b,c,d){var e=5e3;a(function f(){c.getNonSentCommands().then(function(a){if(0!=a.length){var e=function(a,f){if(!(f>=a.length)){var g=a[f],h=JSON.parse(JSON.stringify(g));delete h.id,b.post(d.get()+"/commands",h).success(function(){g.status="sent",c.save(g).then(function(){e(a,++f)})})}};e(a,0)}}),a(f,e)},e)}]),function(a){function b(b){var c,d,e=b.charAt(0).toUpperCase()+b.slice(1),f=["Moz","Webkit","O","ms"],g=document.createElement("div");if(b in g.style)d=b;else for(var h=0;h<f.length;h++)if(c=f[h]+e,c in g.style){d=c;break}return g=null,a.support[b]=d,d}if(!a.cssHooks)throw"jQuery 1.4.3+ is needed for this plugin to work";var c=b("transform");c&&"transform"!==c&&(a.cssHooks.transform={get:function(b){return a.css(b,c)},set:function(a,b){a.style[c]=b}})}(jQuery);
mobileAngular.controller('AccelerometerController', 
	function AccelerometerController($scope, $rootScope){
		$rootScope.$watch('orientationData', function(newVal, oldVal){
			$scope.orientationData = newVal.originalEvent;
		});
	});

mobileAngular.controller('BootstrapController', 
	function BootstrapController($scope, $http, ClientID, Backend, localStorage, Command, Vehicle, Staff, $window, StoreProvider, $rootScope, CommandUtils) {
		var boostrapedKey = "SMUR_BOOSTRAPED";
		$scope.boostraped = localStorage.getItem(boostrapedKey);
		$scope.progress = 0;

		$scope.$watch('progress', function(newValue){
			if(newValue >= 100)
				$scope.ready = true;
		});

		$scope.save = function(){
			$scope.progress = 0;
			$scope.alerts = [];
			ClientID.set($scope.clientID);
			Backend.set($scope.backend);
			$scope.progress += 10;
			$http.get($scope.backend+'/persons').
			success(function(data){
				var count = 0;
				Staff.clear().then(function(){
					var recursivePut = function(count, data){
						var element = data[count];
						var dbObject = {
							"firstname": element.firstname,
							"lastname": element.lastname,
							"function": {
								store: "function",
								id: element.function
							}  
						};
						Staff.save(dbObject).then(function(){
							count++;
							if(count < data.length)
								recursivePut(count, data);
							else
								$scope.progress += 30;
						});
					};
					recursivePut(count, data);
				});
			}).
			error(function(){
				$scope.alerts.push({
					"type": "error",
					"title": "Impossible de récupérer les données. Vérifiez que l'adresse du serveur est bonne et qu'il est lancé"
				});
			});

			$http.get($scope.backend+'/vehicles').success(function(data){
				var count = 0;
				Vehicle.clear().then(function(){
					var recursivePut = function(count, data){
						var element = data[count];
						var dbObject = {
							"name": element.name,
							"type": element.type
						}  

						Vehicle.save(dbObject).then(function(){
							count++;
							if(count < data.length)
								recursivePut(count, data);
							else
								$scope.progress += 30;
						});
					};
					recursivePut(count, data);
				});
			}).
			error(function(){
				$scope.alerts.push({
					"type": "error",
					"title": "Impossible de récupérer les données. Vérifiez que l'adresse du serveur est bonne et qu'il est lancé"
				});
			});


			$http.get($scope.backend+'/commands'+'?{"$sort": {"date": 1}}').success(function(commands) {
				if(commands.length <= 0) {
					$scope.progress = 100;
					return;
				}

				var step =  30/commands.length;
				var recursiveFn = function(count, array) {
					if(count >= array.length) {
						$scope.progress = 100;
						return;
					}

					var command = array[count];
					CommandUtils.handleCommand(command, function() {
						$scope.progress += step;
						recursiveFn(++count, array);
					}, false, "read");
				};

				recursiveFn(0, commands);
			});
		};

		$scope.continue = function() {
			localStorage.setItem(boostrapedKey, true);
			$window.location.reload();
		};
	});
mobileAngular.controller('CommandController', 
	function CommandController($scope, Command) {
		$scope.commands = [];
		Command.getAllSorted().then(function(data){
			console.log(data);
			$scope.commands = data;
		});
	});
mobileAngular.controller('ConnectionController', 
	function ConnectionController($scope, $timeout, $location, $route, Command) {
		$scope.offline = false;

		$scope.$on('offline', function() {
			$scope.offline = true;
		});

		$scope.$on('online', function() {
			$scope.offline = false;
		});
	});
mobileAngular.controller('EditEventController', 
	function EditEventController($scope, $http, $location, $routeParams, Mission, Event, Vehicle, Utils) {
		Mission.get(parseInt($routeParams.missionId)).then(function(data) {
			$scope.mission = data;
			if($routeParams.eventId) {
				Event.get(parseInt($routeParams.eventId)).then(function(data){
					$scope.event = data;
				});
			} else {
				$scope.event = {};
				$scope.event.start = Utils.getCurrentDateAndTime();
				$scope.event.end  = Utils.getCurrentDateAndTime();
				$scope.event.missionId = $scope.mission.id;
			}
		});

		Vehicle.getAll().then(function(data) {
			$scope.vehicles = data;
		});

		$http.get("/resources/event-types.json").success(function(data){
			$scope.types = data;
		});

		$scope.back = function() {
			$location.url("/mission/"+$scope.mission.id).search({page: "event"});
		};

		$scope.save = function() {
			Event.save($scope.event).then(function(){
				$scope.back();
			});
		};
	});

mobileAngular.controller("EventController", 
	function EventController($scope, $location, $window, $routeParams, Event){		
		
		$scope.fetchEvents = function() {
			Event.getByMissionId($routeParams.missionId).then(function(data) {
				$scope.events = data;
			});
		};

		$scope.goToNewEvent = function() {
			$location.url("/mission/"+$routeParams.missionId+"/events/new");
		};

		$scope.goToEditEvent = function(id) {
			$location.url("/mission/"+$routeParams.missionId+"/event/"+id+"/edit");
		};

		$scope.deleteModal = function(id) {
			var confirm = $window.confirm("Êtes vous sûr de vouloir supprimer l'évènement #"+id);
			if(confirm) {
				Event.remove(id).then(function() {
					$scope.fetchEvents();
				});
			}
		};

		$scope.fetchEvents();
	});
mobileAngular.controller("FullScreenController", 
	function FullScreenController($scope, $window){
		if(screenfull.enabled)
			$scope.fullscreenSupport = true;

		$scope.requestFullScreen = function(){
			screenfull.request();
		}
	});
mobileAngular.controller('GesturesController', 
	function GesturesController($scope) {
		$scope.tapMe = function(){
			console.log("Tapped");
		};

		$scope.swipeMeLeft = function(){
			console.log("swiped to the left");
			$scope.swipeLeft = true;
		};

		$scope.swipeMeRight = function(){
			console.log("swiped to the right");
			$scope.swipeRight = true;
		};

		$scope.end = function() {
			console.log("Transition end");
		};

		$scope.onThreshold = function(message) {
			console.log("Threshold", message);
		};

		$scope.myFunction = function() {
			console.log("Fonction métier");
		}

		$scope.moveDraggable = function(){
			$scope.dragSwitch = !$scope.dragSwitch;
		};

		$scope.moveDraggable2 = function(){
			$scope.dragSwitch2 = !$scope.dragSwitch2;
		};

		$scope.moveDraggable3 = function(){
			$scope.dragSwitch3 = !$scope.dragSwitch3;
		};

		$scope.releaseMe = function(){
			$scope.dragMessage = "right"
		};

		$scope.holdMe = function(){
			$scope.hold = !$scope.hold;
		};

		$scope.$watch('dragSwitch', function(newValue){
			console.log("watch drag", newValue);
		});

		$scope.hold = false;
		$scope.dragSwitch = false;
		$scope.dragSwitch2 = false;
		$scope.dragSwitch3 = false;
	});

mobileAngular.controller("MissionContainerController", 
	function MissionContainerController($scope, $routeParams, $http, $location, Mission, $window){		
		$scope.getMission = function() {	
			Mission.get(parseInt($routeParams.missionId)).then(function(data){
				$scope.mission = data;
			});
		};

		$scope.includeUrlIs = function(expectedUrl) {
			return $scope.includedUrl == expectedUrl;
		};

		$scope.toggleMenu = function(){
			$scope.menu = !$scope.menu;
		};

		$scope.navigate = function(id) {
			if(id == "back")
				$location.url("/");
			else {
				$location.url("/mission/"+$scope.mission.id).search({page: id});
				$scope.menu = false;
			}
		};

		$scope.getPathFromParams = function() {
			var currentPage = $location.search().page;
			for (var i = 0; i < $scope.menuItems.length; i++) {
				if($scope.menuItems[i].id == currentPage) 
					return $scope.menuItems[i].templateUrl;
			};
			return "";
		};

		$scope.showMenu = function() {
			$scope.includedUrl = "";
			$location.path("/mission/"+$scope.mission.id);
		};

		$scope.$on('$routeUpdate', function() { 
			$scope.includedUrl = $scope.getPathFromParams();
			$window.scrollTo(0,0);
		});

		$scope.$on('dataChanged', function() {
			$scope.getMission();
		});

		$http.get("/resources/mission-menu.json").success(function(data){
			$scope.menuItems = data;
			$scope.includedUrl = $scope.getPathFromParams();
		});

		$scope.menu = false;
		$scope.getMission();
	});

mobileAngular.controller('MissionsController', 
	function MissionsController($scope, Mission, $location, $window){
		Mission.getAll().then(function(data){
			$scope.missions = data;
		});

		$scope.$on('dataChanged', function() {
			Mission.getAll().then(function(data){
				$scope.missions = data;
			});
		});

		$scope.navigateTo = function(mission) {
			$location.url("/mission/"+mission.id).search({page: "mission"});
		};

		$scope.goToNewMission = function(){
			$location.url('/mission/new');
		};

		$scope.deleteModal = function(id) {
			var confirm = $window.confirm("Êtes vous sûr de vouloir supprimer la mission #"+id);
			if(confirm) {
				Mission.notifyAndRemove(id).then(function(){
					Mission.getAll().then(function(data){
						$scope.missions = data;
					});
				});
			}
		};
	});

mobileAngular.controller('NewMissionController', 
	function NewMissionController($scope, $location, Mission, Vehicle, Staff, Utils, Command){
		$scope.alerts = [];

		Vehicle.getAll().then(function(data){
			$scope.vehicles = data;
		});

		Staff.getAll().then(function(data){
			$scope.responsibles = data;
		});

		$scope.add = function(){
			if($scope.password == "1234") {
				var formattedDate = Utils.getCurrentDateAndTime();
				$scope.mission.created_at = formattedDate.date+" "+formattedDate.time;
				Mission.notifyAndSave($scope.mission).then(function(){
					$scope.back();
				});
			} else {
				$scope.alerts.push({
					"type": "error",
					"title": "Mauvais mot de passe",
					"content": "Essayez 1234"
				});
			}
		};

		$scope.back = function() {
			$location.url("/");
		};
	});

mobileAngular.controller("NewStaffController", 
	function NewStaffController($scope, $http, $location, $routeParams, Mission, Staff, Utils) {
		$scope.staff = {};
		$scope.staff.time = Utils.getCurrentDateAndTime();

		Mission.get(parseInt($routeParams.missionId)).then(function(data){
			$scope.mission = data;
		});

		Staff.getAll().then(function(data) {
			$scope.persons = data;
		});
		
		$http.get('/resources/functions.json').success(function(data){
			$scope.functions = data;
		});

		$scope.back = function() {
			$location.url("/mission/"+$routeParams.missionId).search({page: "staff"});
		};

		$scope.add = function() {
			if($scope.mission.staff === undefined)
				$scope.mission.staff = [];
			
			$scope.mission.staff.push($scope.staff);
			Mission.save($scope.mission).then(function(){
				$scope.back();
			});
		};
	});


mobileAngular.controller("NewVehicleController", 
	function NewVehicleController($scope, $http, $location, $routeParams, Mission, Vehicle, Utils) {
		Mission.get(parseInt($routeParams.missionId)).then(function(data) {
			$scope.mission = data;
		});

		Vehicle.getAll().then(function(data) {
			$scope.vehicles = data;
		});

		$http.get('/resources/vehicle-types.json').success(function(data){
			$scope.types = data;
			$scope.typeNames = [];
			$scope.types.forEach(function(element, index, array) {
				$scope.typeNames.push(element.name);
			});
		});

		$scope.back = function() {
			$location.url("/mission/"+$scope.mission.id).search({page: "vehicle"});
		};

		$scope.add = function() {
			$scope.vehicle.store = "vehicle";
			$scope.vehicle.time = Utils.getCurrentDateAndTime();
			if($scope.mission.vehicles === undefined)
				$scope.mission.vehicles = [];
			
			$scope.mission.vehicles.push($scope.vehicle);
			Mission.save($scope.mission).then(function(){
				$scope.back();
			});
		};
	});
mobileAngular.controller('NotificationController', 
	function NotificationController($scope, $timeout, $location, $route, Command) {
		$scope.hideArray = [];
		$scope.removeArray = [];

		$scope.toggleChange = function() {
			$scope.change = true;
			$timeout(function(){
				$scope.change = false;
			}, 500);
		};

		$scope.nb = 0;
		$scope.notificationsVisible = false;

		$scope.$on('dataChanged', function() {
			$scope.loadNewCommands();
		});

		$scope.loadNewCommands = function() {
			$scope.hideArray = [];

			Command.getNewCommands().then(function(data){
				$scope.commands = data;

				if(data.length > $scope.nb )
					$scope.toggleChange();

				$scope.nb = data.length;		
			});
		};

		$scope.loadNewCommands();

		$scope.toggleNotifcations = function() {
			$scope.notificationsVisible = !$scope.notificationsVisible;
		};

		$scope.hide = function(command, index) {
			$scope.hideArray[index] = true;
			command.status = "read";
			Command.save(command).then(function(){
				$scope.nb--;			});
		};

		$scope.clear = function() {
			for(var i = 0; i < $scope.commands.length; i++) {
				var command = $scope.commands[i];
				command.status = "read";
				Command.save(command).then(function(){
					$scope.loadNewCommands();
				});
			}
		};

		$scope.goToNotification = function(command) {
			command.status = "read";

			Command.save(command).then(function(){
				$scope.loadNewCommands();
				$scope.toggleNotifcations();
			});

			if(command.data.type == "delete")
				$location.url("/");
			else {
				var url = "/mission/"+command.data.id;
				var currentPath = $location.path();
				if(url == currentPath)
					$route.reload();
				else
					$location.path(url).search({page: "mission"});
			}
		};

		$scope.goToDetails = function(){
			$location.path('/commands/');
		};

		$scope.$on('$routeChangeStart', function() { 
			if($scope.notificationsVisible)
				$scope.notificationsVisible = false;
		});

	});

mobileAngular.controller("StaffController", 
	function StaffController($scope, $routeParams, $http, $window, $location, Mission, Staff){
		Mission.get(parseInt($routeParams.missionId)).then(function(data) {
			$scope.mission = data;
			$scope.refreshStaff();
		});

		$http.get('/resources/functions.json').success(function(data){
			$scope.functions = [];
			data.forEach(function(element, index, array) {
				$scope.functions[element.id] = element.name;
			});
		});

		$scope.goToNewStaff = function() {
			$location.url("/mission/"+$scope.mission.id+"/staff/new");
		};

		$scope.deleteModal = function(elementToDelete) {
			var confirm = $window.confirm("Êtes vous sûr de vouloir supprimer la personne "+
				elementToDelete.firstname+" "+elementToDelete.lastname);
			if(confirm) {
				var newStaff = [];
				$scope.mission.staff.forEach(function(element, index, array){
					if(element.id != elementToDelete.id || 
						element.time.date != elementToDelete.time.date ||
						element.time.time != elementToDelete.time.time )
						newStaff.push(element);
				});
				$scope.mission.staff = newStaff;
				Mission.save($scope.mission).then(function(){
					$scope.refreshStaff();
				});
			}
		};

		$scope.refreshStaff = function() {
			if($scope.mission.staff === undefined)
				return;

			$scope.staff = [];
			$scope.mission.staff.forEach(function(element, index, array) {
				Staff.get(parseInt(element.id)).then(function(data){
					data.time = element.time;
					$scope.staff.push(data);
				});
			});
		};
	});
mobileAngular.controller("StorageManagementController", 
	function StorageManagementController($scope, $http, Mission, Staff, Event, Vehicle, 
		FileSystem, FileSystemUtils, persistentStorage, Command, localStorage, ClientID, Backend) {

		$scope.alerts = [];

		$scope.getStorageStats = function(){	
			if(persistentStorage) {
				persistentStorage.queryUsageAndQuota(function (usage, quota) {
					$scope.fs = {};
					$scope.fs.used = usage;
					$scope.fs.total = quota;
					$scope.fs.perc = usage/quota*100;
				});
			} else {
				$scope.fsPolyfill = true;
			}
		};

		$scope.getStorageStats();

		$scope.clientId = ClientID.get();
		$scope.backend = Backend.get();

		$scope.clearMission = function() {
			Mission.clear().then(function() {
				$scope.alerts.push({
					"type": "success",
					"title": "Mission cleared"
				});
			});
		};

		$scope.clearStaff = function() {
			Staff.clear().then(function() {
				$scope.alerts.push({
					"type": "success",
					"title": "Staff cleared"
				});
			});
		};

		$scope.clearEvent = function() {
			Event.clear().then(function() {
				$scope.alerts.push({
					"type": "success",
					"title": "Event cleared"
				});
			});
		};

		$scope.clearVehicle = function() {
			Vehicle.clear().then(function() {
				$scope.alerts.push({
					"type": "success",
					"title": "Vehicle cleared"
				});
			});
		};

		$scope.clearCommand = function() {
			Command.clear().then(function() {
				$scope.alerts.push({
					"type": "success",
					"title": "Command cleared"
				});
			});
		};

		$scope.populateStaff = function() {
			$http.get(Backend.get()+'/persons').success(function(data){
				var count = 0;
				Staff.clear().then(function(){
					var recursivePut = function(count, data){
						var element = data[count];
						var dbObject = {
							"firstname": element.firstname,
							"lastname": element.lastname,
							"function": {
								store: "function",
								id: element.function
							}  
						};
						Staff.save(dbObject).then(function(){
							count++;
							if(count < data.length)
								recursivePut(count, data);
							else {
								$scope.alerts.push({
									"type": "success",
									"title": "Personnes ajoutées"
								});
							}
						});
					};
					recursivePut(count, data);
				});
			});
		};

		$scope.populateVehicle = function() {
			$http.get(Backend.get()+'/vehicles').success(function(data){
				var count = 0;
				Vehicle.clear().then(function(){
					var recursivePut = function(count, data){
						var element = data[count];
						var dbObject = {
							"name": element.name,
							"type": element.type
						}  

						Vehicle.save(dbObject).then(function(){
							count++;
							if(count < data.length)
								recursivePut(count, data);
							else {
								$scope.alerts.push({
									"type": "success",
									"title": "Véhicules ajoutés"
								});
							}
						});
					};
					recursivePut(count, data);
				});
			});
		};

		$scope.clearFS = function() {
			FileSystem.getFileSystem().then(function(fs){
				var dirReader = fs.root.createReader();
				var entries = [];

				var readEntries = function() {
					dirReader.readEntries (function(results) {
						if (!results.length) {
							listResults(entries.sort());
						} else {
							entries = entries.concat(Array.prototype.slice.call(results || [], 0));
							entries.forEach(function(entry, i) {
								if(entry.isFile)
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

		$scope.resetLastCmd = function(){
			localStorage.setItem("LAST_CMD", 0);
			$scope.alerts.push({
				"type": "success",
				"title": "ID de la dernière commande reçue remis à zéro."
			});
		};

		$scope.setClientId = function() {
			ClientID.set($scope.clientId);
			$scope.alerts.push({
				"type": "success",
				"title": "Client ID changé."
			});
		};

		$scope.setClientId = function() {
			Backend.set($scope.backend);
			$scope.alerts.push({
				"type": "success",
				"title": "Backend changé."
			});
		};

	});
mobileAngular.controller("UpdateMissionController", 
	function UpdateMissionController($scope, $window, $routeParams, url, Mission, ImageStorage) {

		$scope.$watch('mission', function(value){
			if(!value || !value.image)
				return;

 			ImageStorage.getURL(value.image).then(function(url) {
				$scope.imageUrl = url;
			});
		});

		$scope.$watch('image', function(value) {
			if(!value)
				return;

			$scope.imageUrl = url.createObjectURL(value[0]);
		}, true);

		$scope.save = function() {
			if($scope.image !== undefined && $scope.image.length > 0 ) {
				var imageName = $scope.mission.image;
				var imageFile = $scope.image[0];

				if(imageName) {
					ImageStorage.remove(imageName);
				}

				ImageStorage.save(imageFile.name, imageFile);
				$scope.mission.image = imageFile.name;	
			}
			
			Mission.notifyAndSave($scope.mission).then(function() {
				$scope.alerts = [];
				$scope.alerts.push({
					type: "success",
					title: "Succès",
					content: "Mission mise à jour avec succès"
				});
				$window.scrollTo(0,0);
			});
		};
	});


mobileAngular.controller("VehicleController", 
	function VehicleController($scope, $routeParams, $window, $location, Mission, Vehicle) {		
		Mission.get(parseInt($routeParams.missionId)).then(function(data) {
			$scope.mission = data;
			$scope.refreshVehicles();
		});

		$scope.goToNewVehicle = function() {
			$location.url("/mission/"+$scope.mission.id+"/vehicle/new");
		};

		$scope.deleteModal = function(elementToDelete) {
			var confirm = $window.confirm("Êtes vous sûr de vouloir supprimer le véhicule #"+elementToDelete.name);
			if(confirm) {
				var newVehicles = [];
				$scope.mission.vehicles.forEach(function(element, index, array){
					if(element.id != elementToDelete.id || 
						element.time.date != elementToDelete.time.date ||
						element.time.time != elementToDelete.time.time )
						newVehicles.push(element);
				});
				$scope.mission.vehicles = newVehicles;
				Mission.save($scope.mission).then(function(){
					$scope.refreshVehicles();
				});
			}
		};

		$scope.refreshVehicles = function() {
			if($scope.mission.vehicles === undefined)
				return;

			$scope.vehicles = [];
			$scope.mission.vehicles.forEach(function(element, index, array) {
				Vehicle.get(parseInt(element.id)).then(function(data){
					data.time = element.time;
					$scope.vehicles.push(data);
				});
			});
		};
	});

mobileAngular.directive('cube', function(url, Utils) {
	return {
		restrict: 'E',
		templateUrl: '/partials/directives/cube.html',
		link: function ($scope, element, attrs) {
			var hor = [Hammer.DIRECTION_LEFT, Hammer.DIRECTION_RIGHT];
			var cubeDiv = element.find("#cube");

			Hammer(element[0]).on('drag', function(event){
				event.gesture.preventDefault();
				var angle = -(event.gesture.angle);
				var direction = event.gesture.direction;
				var axis;
				console.log(hor.indexOf(direction));
				if(hor.indexOf(direction) != -1) {
					axis = 'Y';
					angle = event.gesture.deltaY;
				}
				else {
					axis = 'X';
					angle = event.gesture.deltaX;
				}

				console.log(direction, axis);

				cubeDiv.css("transform", "translateZ( -100px ) rotate"+axis+"("+event.gesture.angle+"deg)");
			});
		}
	};
});

mobileAngular.directive('loader', function(url, Utils) {
	return {
		restrict: 'E',
		templateUrl: '/partials/directives/loader.html'
	};
});
mobileAngular.directive('ngDrag', function() {
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
			$scope.thresholdExceeded = false;
			
			if(attrs['switch'] === undefined)
				$scope.thresholdExceeded = $scope.dragSwitch;

			$scope.axis = "X";
			var events = "dragright dragleft";
			if(attrs['axis'] && attrs['axis'].toUpperCase() == "Y") {
				$scope.axis = "Y";
				events = "dragup dragdown";
			}

			if($scope.bound === undefined)
				$scope.threshold = 500;

			$scope.isAbove = function(delta, reference) {
				if(reference < 0) {
					return reference >= delta;
				} else {
					return delta >= reference;
				}
			}

			$scope.isDeltaAboveBound = function(delta) {
				if($scope.bound < 0) {
					return $scope.bound >= delta;
				} else {
					return delta >= $scope.bound;
				}
			};

			$scope.switch = function(value) {
				if(attrs['switch'] === undefined)
					return;
				if($scope.dragSwitch == value)
					return;

				$scope.dragSwitch = value
			};

			$scope.move = function(offset, animate){
				draggable.removeClass('animate');
				
				if(animate)
					draggable.addClass('animate');

				var coordinates;
				if($scope.axis == "Y")
					coordinates = "0,"+offset+"px, 0";
				else
					coordinates = offset+"px, 0, 0";

				draggable.css("transform", "translate3d("+coordinates+") scale3d(1,1,1)");
			};

			$scope.$watch('dragSwitch', function(newValue){
				$scope.thresholdExceeded = newValue;
				
				if($scope.thresholdExceeded)
					$scope.move($scope.bound, true);
				else
					$scope.move(0, true);
			});

			Hammer(draggable[0]).on(events, function(event) {
				if($scope.preventDefault)
					event.gesture.preventDefault();

				event.stopPropagation();

				var delta = event.gesture['delta'+$scope.axis];

				if($scope.thresholdExceeded)
					delta = delta + parseInt($scope.bound);

				if($scope.bounded && $scope.isAbove(delta, $scope.bound))
					delta = $scope.bound;

				$scope.move(delta);
			});

			Hammer(draggable[0]).on('release', function(event){
				if($scope.preventDefault)
					event.gesture.preventDefault();

				$this = $(this);
				var delta = event.gesture['delta'+$scope.axis];
				if($scope.thresholdExceeded)
					delta = delta + parseInt($scope.bound);

				if( $scope.isAbove(delta, $scope.bound/2) ) {
					$scope.thresholdExceeded = true;
					$scope.switch(true);
					$scope.$apply(function(){
						$scope.onThreshold();
					});
					$scope.move($scope.bound, true);
				} else if ($scope.thresholdExceeded) {
					$scope.thresholdExceeded = false;
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
mobileAngular.directive('ngFiles', function() {
	return {
		restrict: 'A',
		scope: { files: "=ngModel" },
		link: function ($scope, element, attrs) {
			if(attrs['ngModel'] === undefined) {
				throw "ngFiles directive : ngModel attribute needed!";
			};

			var input = angular.element(element);
			input.bind('change', function(){
				$scope.files = this.files;
				$scope.$apply();
			});
		}
	};
});
mobileAngular.directive('ngTap', function() {
	return function(scope, element, attrs) {
		var tapping;
		tapping = false;
		element.bind('touchstart', function(e) {
			element.addClass('active');
			tapping = true;
		});
		element.bind('touchmove', function(e) {
			element.removeClass('active');
			tapping = false;
		});
		element.bind('touchend', function(e) {
			element.removeClass('active');
			if (tapping) {
				scope.$apply(attrs['ngTap'], element);
			}
		});
	};
});
mobileAngular.directive('onTransitionEnd', function($parse, transitionEndEvent) {
	return {
		restrict: 'A',
		link: function ($scope, element, attrs) {
			var fn = $parse(attrs["onTransitionEnd"]);
			element.bind(transitionEndEvent, function(event){
				console.log("transion-end", event);
				$scope.$apply(function(){
					fn($scope);
				});
			});
		}
	};
});
mobileAngular.directive('thumbnail', function() {
	return {
		restrict: 'E',
		scope: { src: "@" },
		templateUrl: '/partials/directives/thumbnail.html',
		link: function ($scope, element, attrs) {
			var $overlay = $("#overlay");
			var $lightBox = $("#lightBox");

			if($overlay.length == 0) {
				$("body").append("<div id='overlay'></div>");
				$overlay = $("#overlay");
			}

			if($lightBox.length == 0) {
				$("body").append("<div id='lightBox'><img /></div>");
				$lightBox = $("#lightBox");
			}

			Hammer($overlay[0]).on('tap', function(){
				$lightBox.hide();
				$(this).hide();
			});

			var img = $(element).find("img");
			Hammer(img[0]).on("tap", function(){
				var currentHeight = $(window).height();
				$lightBoxImg = $("#lightBox>img");
				$lightBoxImg.css("max-height", (currentHeight-100).toString()+"px");
				$lightBoxImg.attr("src", $(this).attr("src"));
				$lightBoxImg.load(function(){
					$overlay.show();
					$lightBox.show();
					$lightBox.css({
						"margin-left": -($lightBoxImg.width()/2),
						"margin-top": -($lightBoxImg.height()/2)
					});
				});
			});
		}
	};
});

mobileAngular.filter('eventDestination', function(){
	return function(input) {
		if(input == "intervention")
			return "/partials/mission/events/address.html";
		else if(input == "hospitalisation")
			return "/partials/mission/events/service.html";
		else
			return "";
	};
});
mobileAngular.filter('missionDestination', function(){
	return function(events) {
		if(events === undefined)
			return;

		for(var i = 0; i < events.length; i++) {
			if(events[i].type == intervention)
				return events[i].city;
		}
	};
});
mobileAngular.factory("Backend", function(localStorage){
	var backendKey = "SMUR_BACKEND"
	return {
		get: function() {
			return localStorage.getItem(backendKey);
		},
		set: function(backend) {
			localStorage.setItem(backendKey, backend);
		}
	};
});

mobileAngular.factory("Command", 
	function Command($q, $rootScope, $http, $timeout, ClientID, IDBService){
		var storeWrapper = {
			store: undefined,
			getStore: function() {
				var deferred = $q.defer();
				if(this.store) {
					deferred.resolve(this.store);
				} else {
					new IDBStore({
						dbVersion: 2,
						storeName: 'commands',
						keyPath: 'id',
						autoIncrement: true,
						onStoreReady: function() {
							var storeReady = this;
							storeWrapper.store = this;
							$rootScope.$apply(function(){
								deferred.resolve(storeReady);
							});
						},
						indexes: [
						{ name: "origin" },
						{ name: "date" },
						{ name: "status" }
						]
					});
				}
				return deferred.promise;
			}
		};
		var idbService = IDBService.getIDBCrudObject(storeWrapper);
		idbService.sendIfNeeded = function(store, data, action) {
			var start = Date.now();
			var deferred = $q.defer();

			if(action == "delete") {
				deferred.resolve();
				var removal = {
					entity: store.storeName,
					id: data,
					type: "delete"
				}; 

				var cmd = {}; 
				cmd.date = Date.now();
				cmd.origin = ClientID.get();
				cmd.status = "waiting";
				cmd.data = removal;
				storeWrapper.getStore().then(function(cmdStore){
					cmdStore.put(cmd);
				});
			} else {
				store.get(data.id, function(currentData) {
					$rootScope.$apply(deferred.resolve());
					var cmdData;
					var diffArray = new Array();
					if(!currentData) {
						for(var property in data) {
							diffArray.push({
								attribute: property,
								new_val: data[property],
								old_val: ""
							});
						}
					} else {
						for(var property in data) {
							if(data[property] != currentData[property]) {
								diffArray.push({
									attribute: property,
									new_val: data[property],
									old_val: currentData[property]
								});
							}
						}
					}

					if(diffArray.length > 0) {
						var diff = {
							entity: store.storeName,
							id: data.id,
							type: "update",
							changes : diffArray
						}; 

						var cmd = {}; 
						cmd.date = Date.now();
						cmd.origin = ClientID.get();
						cmd.status = "waiting";
						cmd.data = diff;

						storeWrapper.getStore().then(function(cmdStore){
							cmdStore.put(cmd);
						});
					}
				});
			}
			return deferred.promise;
		};
		idbService.getNonSentCommands = function(){
			var deferred = $q.defer();
			storeWrapper.getStore().then(function(store){
				var keyRange = store.makeKeyRange({
					lower: "waiting",
					upper: "waiting"
				});
				store.query(function(data) {
					$rootScope.$apply(function(){
						deferred.resolve(data);
					});
				}, {
					"index":"status",
					"keyRange":keyRange
				});
			});
			return deferred.promise;
		};
		idbService.getNewCommands = function() {
			var deferred = $q.defer();
			storeWrapper.getStore().then(function(store){
				var keyRange = store.makeKeyRange({
					lower: "new",
					upper: "new"
				});
				store.query(function(data) {
					$rootScope.$apply(function(){
						deferred.resolve(data);
					});
				}, {
					"index":"status",
					"keyRange":keyRange
				});
			});
			return deferred.promise;
		};
		idbService.getAllSorted = function() {
			var deferred = $q.defer();
			storeWrapper.getStore().then(function(store){
				store.query(function(data) {
					$rootScope.$apply(function(){
						deferred.resolve(data);
					});
				}, {
					"index":"date",
					"order":"DESC"
				});
			});
			return deferred.promise;
		};
		return idbService;
	});
 mobileAngular.service("CommandUtils", function CommandUtils(StoreProvider, Command, $rootScope){
 	return {
 		handleCommand: function(command, callback, notify, status) {
 			if(status)
 				command.status = status;
 			else
 				command.status = "new";

 			if(notify === undefined)
 				notify = true;

 			Command.save(command);
 			localStorage.setItem("LAST_CMD", command.date);

 			var data = command.data;
 			var storeName = data.entity;
 			var store = StoreProvider.getStoreByName(storeName);
 			
 			if(!store) {
 				console.log("Unknown entity");
 				if(callback)
 					callback();
 				return;
 			}
 			var action = command.data.type;

 			if(action == "delete") {
 				store.remove(command.data.id).then(function(){
 					if(notify)
 						$rootScope.$broadcast('dataChanged');

 					if(callback)
 						callback();
 				});
 			} else {
 				store.get(data.id).then(function(localData){
 					if(!localData) {
 						localData = {};
 						localData.id = data.id;
 					}

 					var changeArray = data.changes;

 					changeArray.forEach(function(element){
 						localData[element.attribute] = element.new_val;
 					});

 					store.save(localData).then(function(){
 						if(notify)
 							$rootScope.$broadcast('dataChanged');

 						if(callback)
 							callback();
 					});
 				});
 			}
 		}
 	};
 });

mobileAngular.factory("Event", function Event($q, $rootScope, IDBService){
	var storeWrapper = {
		store: undefined,
		getStore: function() {
			var deferred = $q.defer();
			if(this.store)
				deferred.resolve(this.store);
			else
			{
				new IDBStore({
					dbVersion: 2,
					storeName: 'event',
					keyPath: 'id',
					autoIncrement: true,
					onStoreReady: function() {
						storeWrapper.store = this;
						var storeReady = this;
						$rootScope.$apply(function(){
							deferred.resolve(storeReady);
						});
					},
					indexes: [
					{ name: "missionId" }
					]
				});
			}
			return deferred.promise;
		}
	};

	var idbService = IDBService.getIDBCrudObject(storeWrapper);
	idbService.getByMissionId = function(missionId){
		var id = parseInt(missionId);
		var deferred = $q.defer();
		storeWrapper.getStore().then(function(store){
			var keyRange = store.makeKeyRange({
				lower: id,
				upper: id
			});
			store.query(function(data) {
				$rootScope.$apply(function(){
					deferred.resolve(data);
				});
			}, {
				"index":"missionId",
				"keyRange":keyRange
			});
		});
		return deferred.promise;
	};
	return idbService;
});
mobileAngular.factory("FileSystem", 
	function FileSystem($q, $rootScope, $window, FileSystemUtils, persistentStorage, requestFileSystem){
	var fileSystemWrapper = {
		getFileSystem: function() {
			var deferred = $q.defer();

			var onInit = function(fileSystem) {
				fileSystemWrapper.fileSystem = fileSystem;
				$rootScope.$apply(function(){
					deferred.resolve(fileSystem);
				})
			};

			if(persistentStorage) {
				// Last impl in Chrome
				persistentStorage.requestQuota(10*1024*1024 /*10MB*/, function(grantedQuota){
					requestFileSystem(window.PERSISTENT ,grantedQuota , onInit, FileSystemUtils.errorHandler);
				});
			} else if ($window.webkitStorageInfo) {
				// Legacy/mobile chrome support
				window.webkitStorageInfo.requestQuota(PERSISTENT, 10*1024*1024 /*10MB*/, function(grantedBytes) {
					requestFileSystem(PERSISTENT, grantedBytes, onInit, FileSystemUtils.errorHandler);
				}, function(e) {
					console.log('Error', e);
				});
			} else if(requestFileSystem) {
				requestFileSystem(PERSISTENT,  10*1024*1024, onInit, FileSystemUtils.errorHandler);
			} else {
				$rootScope.$apply(function(){
					deferred.reject("Cannot use FS API");
				});
			}		
			return deferred.promise;
		}
	};
	return fileSystemWrapper;
});
mobileAngular.factory("FileSystemUtils", function FileSystemUtils($q, $window){
	return {
		errorHandler: function(e) {
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
			};
			console.log('Error: ' + msg);
			console.log(e);
		}
	};
});
 mobileAngular.service("IDBService", 
 	function IDBService($q, $rootScope){
 		return {
 			getIDBCrudObject: function(storeWrapper) {
 				return {
 					getAll: function() {
 						var deferred = $q.defer();
 						storeWrapper.getStore().then(function(store){
 							store.getAll(function(data){
 								$rootScope.$apply(function(){
 									deferred.resolve(data);
 								});
 							});
 						});
 						return deferred.promise;
 					},
 					get: function(id) {
 						var deferred = $q.defer();
 						storeWrapper.getStore().then(function(store){
 							store.get(id, function(data) {
 								$rootScope.$apply(function(){
 									deferred.resolve(data);
 								});
 							});
 						});
 						return deferred.promise;
 					},
 					remove: function(id) {
 						var deferred = $q.defer();
 						storeWrapper.getStore().then(function(store) {
 							store.remove(id, function(){
 								$rootScope.$apply(function(){
 									deferred.resolve("Sucess");
 								});
 							});
 						});
 						return deferred.promise;
 					},
 					save: function(element) {
 						if(element.id === undefined)
 							element.id = Date.now();

 						var deferred = $q.defer();
 						storeWrapper.getStore().then(function(store){
 							store.put(element, function(){
 								$rootScope.$apply(function(){
 									deferred.resolve("Sucess");
 								});
 							});
 						});
 						return deferred.promise;
 					},
 					clear: function() {
 						var deferred = $q.defer();
 						storeWrapper.getStore().then(function(store){
 							store.clear(function(){
 								$rootScope.$apply(function(){
 									deferred.resolve("Sucess");
 								});
 							});
 						});
 						return deferred.promise;
 					}
 				};
 			}
 		};
 	});

mobileAngular.factory("ImageStorage", function ImageStorage($q, $rootScope, FileSystem, FileSystemUtils){
	return {
		save: function(fileName, blob) {
			var deffered = $q.defer();
			FileSystem.getFileSystem().then(function(fs){
				fs.root.getFile(fileName, {create: true}, function(fileEntry){
					fileEntry.createWriter(function(fileWriter) {
						fileWriter.onwriteend = function(e) {
							$rootScope.$apply(function(){
								deffered.resolve();
							});
						};

						fileWriter.onerror = function(e) {
							console.log("Couldn't save image: " + e.toString());
						};

						fileWriter.write(blob);
					}, FileSystemUtils.errorHandler);
				}, FileSystemUtils.errorHandler);
			});
			return deffered.promise;
		},
		getURL: function(fileName) {
			var deffered = $q.defer();
			FileSystem.getFileSystem().then(function(fs){
				fs.root.getFile(fileName, {}, function(fileEntry) {
					$rootScope.$apply(function(){
						deffered.resolve(fileEntry.toURL());
					});
				}, FileSystemUtils.errorHandler);
			});
			return deffered.promise;
		},
		remove: function(fileName) {
			FileSystem.getFileSystem().then(function(fs){
				fs.root.getFile(fileName, {create: false}, function(fileEntry) {
					fileEntry.remove(function() {}, FileSystemUtils.errorHandler);
				}, FileSystemUtils.errorHandler);
			});
		}
	};	
});

mobileAngular.factory("Mission", function Mission($q, $rootScope, SyncedResourceService){
	var storeWrapper = {
		store: undefined,
		getStore: function() {
			var deferred = $q.defer();
			if(this.store) {
				deferred.resolve(this.store);
			} else {
				new IDBStore({
					dbVersion: 1,
					storeName: 'mission',
					keyPath: 'id',
					autoIncrement: true,
					onStoreReady: function() {
						storeWrapper.store = this;
						var storeReady = this;
						$rootScope.$apply(function(){
							deferred.resolve(storeReady);
						});
					}
				});
			}
			return deferred.promise;
		}
	};

	return SyncedResourceService.syncedResourceManager(storeWrapper);
});
mobileAngular.factory("SocketService", function SocketService(Backend){ 
	return io.connect(Backend.get());
});


mobileAngular.factory("Staff", function Staff($q, $rootScope, IDBService){
	var storeWrapper = {
		store: undefined,
		getStore: function() {
			var deferred = $q.defer();
			if(this.store)
				deferred.resolve(this.store)
			else
			{
				new IDBStore({
					dbVersion: 2,
					storeName: 'staff',
					keyPath: 'id',
					autoIncrement: true,
					onStoreReady: function() {
						storeWrapper.store = this;
						var storeReady = this;
						$rootScope.$apply(function(){
							deferred.resolve(storeReady);
						});
					}
				});
			}
			return deferred.promise;
		}
	};
	return IDBService.getIDBCrudObject(storeWrapper);
});
  mobileAngular.service("StoreProvider", 
 	function StoreProvider(Mission, Event, Vehicle, Staff){
 		return {
 			getStoreByName: function(name) {
 				if(name == "mission")
 					return Mission;
 				else if(name == "event")
 					return Event;
 				else if(name == "vehicle")
 					return Vehicle;
 				else if(name == "person")
 					return Staff;
 				else 
 					return undefined;
 			}
 		};

 	});

 mobileAngular.service("SyncedResourceService", 
 	function SyncedResourceService($q, $rootScope, IDBService, Command){
 		return {
 			syncedResourceManager: function(storeWrapper) {
 				var service = IDBService.getIDBCrudObject(storeWrapper);

 				service.notifyAndRemove = function(id) {
 					var deferred = $q.defer();
 					storeWrapper.getStore().then(function(store){
 						Command.sendIfNeeded(store, id, "delete").then(function(){
 							service.remove(id).then(function(){
 								deferred.resolve();
 							});
 						});
 					});
					return deferred.promise;
 				};

 				service.notifyAndSave= function(element) {
 					var deferred = $q.defer();

 					if(element.id === undefined)
 						element.id = Date.now();

 					storeWrapper.getStore().then(function(store){
 						Command.sendIfNeeded(store, element, "update").then(function(){
 							service.save(element).then(function(){
 								deferred.resolve();
 							});
 						});
 					});
 					return deferred.promise;
 				};

 				return service;
 			}
 		};
 	});

mobileAngular.value("url", window.URL || window.webkitURL);
 mobileAngular.service("Utils", function Utils(){
 	return {
 		getCurrentDateAndTime: function(){
 			var currentTime = new Date();
 			return {
 				date: currentTime.getFullYear()+"-"+
 				this.toTwoDigits(currentTime.getMonth()+1)+"-"+
 				this.toTwoDigits(currentTime.getDate()),
 				time: this.toTwoDigits(currentTime.getHours())+":"+
 				this.toTwoDigits(currentTime.getMinutes())
 			};
 		},
 		toTwoDigits: function(value) {
 			var valueString = value.toString();
 			if(valueString.length == 1) {
 				valueString = "0"+valueString;
 			}
 			return valueString;
 		},
 		dataURLToBlob: function(dataURL) {
 			var BASE64_MARKER = ';base64,';
 			if (dataURL.indexOf(BASE64_MARKER) == -1) {
 				var parts = dataURL.split(',');
 				var contentType = parts[0].split(':')[1];
 				var raw = parts[1];

 				return new Blob([raw], {type: contentType});
 			}

 			var parts = dataURL.split(BASE64_MARKER);
 			var contentType = parts[0].split(':')[1];
 			var raw = window.atob(parts[1]);
 			var rawLength = raw.length;

 			var uInt8Array = new Uint8Array(rawLength);

 			for (var i = 0; i < rawLength; ++i) {
 				uInt8Array[i] = raw.charCodeAt(i);
 			}

 			return new Blob([uInt8Array], {type: contentType});
 		}
 	};
 });

mobileAngular.factory("Vehicle", function Vehicle($q, $rootScope, IDBService){
	var storeWrapper = {
		store: undefined,
		getStore: function() {
			var deferred = $q.defer();
			if(this.store)
				deferred.resolve(this.store)
			else
			{
				new IDBStore({
					dbVersion: 1,
					storeName: 'vehicle',
					keyPath: 'id',
					autoIncrement: true,
					onStoreReady: function() {
						storeWrapper.store = this;
						var storeReady = this;
						$rootScope.$apply(function(){
							deferred.resolve(storeReady);
						});
					}
				});
			}
			return deferred.promise;
		}
	};
	return IDBService.getIDBCrudObject(storeWrapper);
});
mobileAngular.factory("ClientID", function(localStorage){
	var clientIdKey = "SMUR_CLIENT_ID"
	return {
		get: function() {
			var clientId = localStorage.getItem(clientIdKey);
			if(!clientId) {
				this.set("temporaryClientId");
				return "temporaryClientId";
			}
			return clientId;		
		},
		set: function(clientId) {
			localStorage.setItem(clientIdKey, clientId);
		}
	};
});

mobileAngular.value("localStorage", window.localStorage);
mobileAngular.value("persistentStorage", navigator.persistentStorage || navigator.webkitPersistentStorage);
mobileAngular.value("requestFileSystem", window.requestFileSystem || window.webkitRequestFileSystem);
mobileAngular.factory("transitionEndEvent", function (){
	var t;
	var el = document.createElement('fakeelement');
	var result;
	var transEndEventNames = {
		'WebkitTransition' : 'webkitTransitionEnd',
		'MozTransition'    : 'transitionend',
		'OTransition'      : 'oTransitionEnd',
		'msTransition'     : 'MSTransitionEnd',
		'transition'       : 'transitionend'
	};
	for(t in transEndEventNames){
		if( el.style[t] !== undefined ){
			result = transEndEventNames[t];
		}
	}

	el = null;
	return result;
});
mobileAngular.run( function(SocketService, $http, ClientID, CommandUtils, localStorage, Backend, $rootScope) {
	var fetch = function() {	
		var lastCmd = localStorage.getItem("LAST_CMD");
		var getParams = "";
		if(lastCmd) 
			getParams = '?{"date": {"$gt":' + lastCmd +'},"$sort": {"date": 1}}';

		$http.get(Backend.get()+'/commands'+getParams).success(function(commands) {
			var recursiveFn = function(count, array) {
				if(count >= array.length) {
					$rootScope.$broadcast('dataChanged');
					return;
				}

				var command = array[count];
				CommandUtils.handleCommand(command, function() {
					recursiveFn(++count, array)
				}, false);
			};

			recursiveFn(0, commands);
		});
	};

	SocketService.on('commands:new', function(command) {
		localStorage.setItem("LAST_CMD", command.date);
		var clientId = ClientID.get();
		console.log(command.origin, clientId);
		if(command.origin == clientId)
			return;

		CommandUtils.handleCommand(command);
	});

	SocketService.on('error', function(){
		$rootScope.$broadcast('offline');
	});

	SocketService.on('disconnect', function(){
		$rootScope.$broadcast('offline');
	});
	SocketService.on('reconnect', function(){
		$rootScope.$broadcast('online');
	});

	SocketService.on('connect', fetch);
});

mobileAngular.run(function($timeout, $http, Command, Backend) {
	var pollingInterval = 5000;
	$timeout(function sendingFunction(){
		Command.getNonSentCommands().then(function(data){
			if(data.length == 0) {
				return;
			}

			var send = function(data, count) {
				if(count >= data.length)
					return;

				var cmd = data[count];
				var postData = JSON.parse(JSON.stringify(cmd));
				delete postData["id"];
				$http.post(Backend.get()+'/commands', postData).success(function(){
					cmd.status = "sent";
					Command.save(cmd).then(function(){
						send(data, ++count);
					});
				})
			};
			send(data, 0);
		});
		$timeout(sendingFunction, pollingInterval);
	}, pollingInterval);
});
(function($) {
	if ( !$.cssHooks ) {
		throw("jQuery 1.4.3+ is needed for this plugin to work");
		return;
	}

	function styleSupport( prop ) {
		var vendorProp, supportedProp,
		capProp = prop.charAt(0).toUpperCase() + prop.slice(1),
		prefixes = [ "Moz", "Webkit", "O", "ms" ],
		div = document.createElement( "div" );
		if ( prop in div.style ) {
			supportedProp = prop;
		} else {
			for ( var i = 0; i < prefixes.length; i++ ) {
				vendorProp = prefixes[i] + capProp;
				if ( vendorProp in div.style ) {
					supportedProp = vendorProp;
					break;
				}
			}
		}
		div = null;
		$.support[ prop ] = supportedProp
		return supportedProp;
	}

	var transform = styleSupport( "transform" );
	
	if ( transform && transform !== "transform" ) {
		$.cssHooks.transform = {
			get: function( elem, computed, extra ) {
				return $.css( elem, transform );
			},
			set: function( elem, value) {
				elem.style[ transform ] = value;
			}
		};
	}
})(jQuery);
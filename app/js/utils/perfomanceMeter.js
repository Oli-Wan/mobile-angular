var benchmarking = false;
var started = false;
var results = [];

function showFPS(event) {
    $("#fps-counter").text(event.fps);
    if (benchmarking)
        results.push(event.fps);
}

document.addEventListener("fps", showFPS, false);

// Framerate benchmark

$(document).on("click", "#bench-runner", function () {
    console.log("Starting benchmark");
    goBackHome();
    if (!started) {
        FPSMeter.run(0.5);
        started = true;
        $("#fps-counter").show();
    }
    $("#fps-counter").css("background-color", "red");
    setTimeout(scenario, 1000);
});

$(document).on("click", "#toggle-counter", function () {
    console.log(started);
    if (started) {
        FPSMeter.stop();
        started = true;
        $("#fps-counter").hide()
    }
    else {
        FPSMeter.run(0.5);
        started = true;
        $("#fps-counter").show();
    }
});

function scenario() {
    benchmarking = true;
    var actions = [clickMission, openMissionMenu, closeMissionMenu, goBackHome];
    var currentAction = 0;
    var numberOfValues = 30;

    var doBench = function () {
        console.log("doBench");
        if (results.length >= numberOfValues) {
            submitResults();
            return;
        }

        if (currentAction >= actions.length)
            currentAction = 0;

        actions[currentAction]();
        currentAction++;
        setTimeout(doBench, 1000);
    }
    setTimeout(doBench, 1000);
}

function clickMission() {
    console.log("clickMission");
    var element = $("#missions-table>tbody>tr:first-child>td:first-child")[0];
    console.log(element);
    triggerEvent("tap", element);
}

function openMissionMenu() {
    var element = $(".menu-button")[0];
    triggerEvent("tap", element);
}

function closeMissionMenu() {
    var element = $(".menu-button")[0];
    triggerEvent("tap", element);
}

function goBackHome() {
    $(".brand").click();
}

function submitResults() {
    benchmarking = false;
    $("#fps-counter").css("background-color", "black");

    var submitResults = {
        results: results.toString(),
        numberOfValues: results.length
    }

    $.post("http://192.168.100.51:2403/bench-results", submitResults);
    results = [];
}

function triggerEvent(eventName, element) {
    var event;
    if (document.createEvent) {
        event = document.createEvent("HTMLEvents");
        event.initEvent(eventName, true, true);
    } else {
        event = document.createEventObject();
        event.eventType = eventName;
    }

    event.eventName = eventName;
    event.memo = { };

    if (document.createEvent) {
        element.dispatchEvent(event);
    } else {
        element.fireEvent("on" + event.eventType, event);
    }
}

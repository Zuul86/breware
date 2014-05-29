var moment = require('moment');

module.exports = (function () {
    var steps = [];
    var currentStep = 0;
    var mashStartTime = null;
    var mashComplete = false;
    var mashStarted = false;

    var hasSteps = function () {
        return steps.length === 0 ? false : true;
    };

    var startMashTimer = function () {
        if (steps[currentStep].mashStepStartTime === undefined) {
            steps[currentStep].mashStepStartTime = moment();
        }
    };

    var aboveStepTemp = function (currentTemperature) {
        var rtnVal = currentTemperature > steps[currentStep].steptemp;
        if (rtnVal) {
            startMashTimer(steps[currentStep]);
        }
        return rtnVal;
    };

    var currentStepTime = function () {
        return moment().diff(steps[currentStep].mashStepStartTime, 'seconds') / 60;
    };

    var currentMashTime = function () {
        return moment().diff(mashStartTime, 'seconds') / 60;
    };

    var isMachComplete = function () {
        var expired = currentStepTime() > steps[currentStep].steptime;
        if (expired) {
            if (currentStep + 1 === steps.length) {
                mashComplete = true;
                mashStarted = false;
                steps = [];
            } else {
                currentStep++;
                console.log('Next Step')
            }
        }

        return mashComplete;
    };

    var startMash = function () {
        mashStarted = true;
        mashStartTime = moment();
    };

    return {
        steps: steps,
        hasSteps: hasSteps,
        aboveStepTemp: aboveStepTemp,
        currentMashTime: currentMashTime,
        mashStarted: mashStarted,
        isMachComplete: isMachComplete,
        startMash: startMash
    };
})()
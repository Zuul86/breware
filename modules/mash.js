var moment = require('moment');

module.exports = function () {
    var steps,
        currentStep,
        mashStartTime,
        mashStarted;

    var initializeMash = function () {
        steps = [];
        currentStep = 0;
        mashStartTime = null;
        mashStarted = false;
    };

    var setMashStartTime = function () {
        if (steps[currentStep].mashStepStartTime === undefined) {
            steps[currentStep].mashStepStartTime = moment();
        }
    };   

    var currentStepTime = function () {
        return moment().diff(steps[currentStep].mashStepStartTime, 'seconds') / 60;
    };   

    var hasSteps = function () {
        return steps.length === 0 ? false : true;
    };

    var canStartMash = function () {
        return !mashStarted && hasSteps();
    };

    var isExpired = function () {
        return currentStepTime() > steps[currentStep].steptime;
    };

    var isLastStep = function () {
        return currentStep + 1 === steps.length;
    };

    var addStep = function (step) {
        steps.push(step);
    };

    var aboveStepTemp = function (currentTemperature) {
        var rtnVal = currentTemperature > steps[currentStep].steptemp;
        if (rtnVal) {
            setMashStartTime(steps[currentStep]);
        }
        return rtnVal;
    };

    var currentMashTime = function () {
        return moment().diff(mashStartTime, 'seconds') / 60;
    };

    var isMachComplete = function () {
        mashComplete = false;
        if (isExpired()) {
            if (isLastStep()) {
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
        if (canStartMash()) {
            mashStarted = true;
            mashStartTime = moment();
            return true;
        }
        return false;
    };

    initializeMash();

    return {
        addStep: addStep,
        aboveStepTemp: aboveStepTemp,
        currentMashTime: currentMashTime,
        isMachComplete: isMachComplete,
        startMash: startMash
    };
};
const moment = require('moment');
const commandSwitch = require('commandSwitch')

module.exports = () => {  
    const steps = [];
    let currentStep,
        mashStartTime,
        mashStarted;

    var initializeMash = () => {
        currentStep = 0;
        mashStartTime = null;
        mashStarted = false;
    };

    var setMashStartTime = () => {
        if (steps[currentStep].mashStepStartTime === undefined) {
            steps[currentStep].mashStepStartTime = moment();
        }
    };   

    var currentStepTime = () => {
        return moment().diff(steps[currentStep].mashStepStartTime, 'seconds') / 60;
    };   

    var hasSteps = () => {
        return steps.length === 0;
    };

    var canStartMash = () => {
        return !mashStarted && hasSteps();
    };

    var isExpired = () => {
        return currentStepTime() > steps[currentStep].steptime;
    };

    var isLastStep = () => {
        return currentStep + 1 === steps.length;
    };

    var addStep = (step) => {
        steps.push(step);
    };

    var aboveStepTemp = (currentTemperature) => {
        var rtnVal = currentTemperature > steps[currentStep].steptemp;
        if (rtnVal) {
            setMashStartTime(steps[currentStep]);
        }
        rtnVal ? commandSwitch.turnOn() : commandSwitch.turnOff();
        
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
                steps.length = 0;
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
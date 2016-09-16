'use strict';
const moment = require('moment');
const commandSwitch = require('./commandSwitch')()

module.exports = () => {  
    const steps = [];
    var currentStep,
        mashStartTime,
        mashStarted;

    function initializeMash() {
        currentStep = 0;
        mashStartTime = null;
        mashStarted = false;
    }

    function setMashStartTime () {
        if (steps[currentStep].mashStepStartTime === undefined) {
            steps[currentStep].mashStepStartTime = moment();
        }
    } 

    function currentStepTime () {
        return moment().diff(steps[currentStep].mashStepStartTime, 'seconds') / 60;
    }

    function hasSteps () {
        return steps.length > 0;
    }

    function canStartMash() {
        return !mashStarted && hasSteps();
    }

    function isExpired() {
        return currentStepTime() > steps[currentStep].steptime;
    }

    function isLastStep () {
        return currentStep + 1 === steps.length;
    }

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
        let mashComplete = false;
        if (isExpired()) {
            if (isLastStep()) {
                mashComplete = true;
                mashStarted = false;
                steps.length = 0;
            } else {
                currentStep++;
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
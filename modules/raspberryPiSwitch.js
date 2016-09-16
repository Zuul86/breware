'use strict';
const piGpio = require('pi-gpio');

let gpioInitialized = false;

if (!gpioInitialized) {
    piGpio.open(18, 'output', (err) => {
        if (err) {
            console.log(`Error ${err}`);
        } else {
            gpioInitialized = true;
        }

    });
}

function writeGpio(value) {
    piGpio.write(18, value, (err) => {
        if (err) {
            console.log(err);
        }
    })
}

var turnOn = () => {
    writeGpio(1);
};

var turnOff = () => {
    writeGpio(0);
};

module.exports = {
    turnOn: turnOn,
    turnOff: turnOff
};
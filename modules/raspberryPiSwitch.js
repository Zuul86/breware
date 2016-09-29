'use strict';
const gpio = require('rpi-gpio');

let gpioInitialized = false;

if (!gpioInitialized) {
    gpio.setup(18, gpio.DIR_OUT, (err) => {
        if (err) {
            throw err;
        } else {
            gpioInitialized = true;
        }

    });
}

function writeGpio(value) {
    gpio.write(18, value, (err) => {
        if (err) {
            throw err;
        }
    })
}

var turnOn = () => {
    writeGpio(true);
};

var turnOff = () => {
    writeGpio(false);
};

var close = () => {
    gpio.destroy()
};

module.exports = {
    turnOn: turnOn,
    turnOff: turnOff,
    close: close
};
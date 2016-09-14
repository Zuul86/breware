'use strict';
const temperatureSensor = require('../modules/temperatureSensor')();
const mashModule = require('../modules/mash');

module.exports = function (io) {

    io.sockets.on('connection', function (socket) {

        const mash = mashModule();
        let interval = null;

        let currentFlameState = null

        function changeFlameState(flameState) {
            if (flameState !== currentFlameState) {
                currentFlameState = flameState;
                socket.emit('flamestate', flameState);
            }
        }
        
        function endInterval() {
            clearInterval(interval);
            changeFlameState('off');
        }

        socket.on('message', function (msg) {
            const message = JSON.parse(msg);        
            if (message.command === 'startmash') {

                if (!mash.startMash()) { 
                    return 
                }   

                interval = setInterval(() => {

                    if (mash.isMachComplete()) {
                        endInterval();
                        return;
                    }

                    temperatureSensor.getTemperature(function (temperature) {
                        mash.aboveStepTemp(temperature) ? changeFlameState('off') : changeFlameState('on');
                        socket.emit('temp', [mash.currentMashTime(), temperature]);
                    }, 'f');

                }, 5000);

            } else if (message.command === 'stopmash') {
                endInterval(interval);
            } else if (message.command === 'addstep') {
                mash.addStep(message.payload);
            }
        });
    });
};
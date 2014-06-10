var moment = require('moment');
var temperatureSensor = require('../modules/TemperatureSensorMock');
//var temperatureSensor = require('../modules/bw_ds18b20');
var mashModule = require('../modules/mash');

module.exports = function (io) {

    io.sockets.on('connection', function (socket) {

        var mash = mashModule();
        var inteval = null;

        var currentFlameState = null

        var changeFlameState = function (flameState) {
            if (flameState !== currentFlameState) {
                currentFlameState = flameState;
                console.log('Flame ' + flameState);
                socket.emit('flamestate', flameState);
            }
        };
        
        var endInterval = function () {
            clearInterval(interval);
            changeFlameState('off');
        }

        socket.on('message', function (msg) {
            var message = JSON.parse(msg);         
            if (message.command === 'startmash') {

                if (!mash.startMash()) { return };      

                interval = setInterval(function () {

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
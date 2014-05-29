var moment = require('moment');
var temperatureSensor = require('../modules/TemperatureSensorMock');
var mash = require('../modules/mash');

module.exports = function (io) {

    

    io.sockets.on('connection', function (socket) {

        var changeFlameState = function (flameState) {
            console.log('Flame ' + flameState);
            socket.emit('flamestate', flameState);
        };

        socket.on('message', function (msg) {
            var message = JSON.parse(msg);         
            if (message.command === 'startmash') {
                if (!mash.mashStarted && mash.hasSteps()) {

                    mash.startMash();
                    var endInterval = function() {
                        clearInterval(interval);
                    }

                    var interval = setInterval(function () {

                        if (mash.isMachComplete()) {
                            changeFlameState('off');
                            endInterval();
                            return;
                        }
                        var temperature = temperatureSensor.getTemperature();

                        mash.aboveStepTemp(temperature) ? changeFlameState('off') : changeFlameState('on');

                        socket.emit('temp', [mash.currentMashTime(), temperature]);
                    }, 5000);
                }
            } else if (message.command === 'addstep') {
                mash.steps.push(message.payload);
            }
        });
    });
};
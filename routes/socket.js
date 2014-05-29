var moment = require('moment');
var temperatureSensor = require('../modules/TemperatureSensorMock');
var mash = require('../modules/mash');

module.exports = function (io) {

    io.sockets.on('connection', function (socket) {
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
                            console.log('Flame off');
                            endInterval();
                            return;
                        }
                        var temperature = temperatureSensor.getTemperature();

                        if (mash.aboveStepTemp(temperature)) {
                            console.log('Flame off');
                        } else {
                            console.log('Flame on');
                        }

                        socket.emit("temp", [mash.currentMashTime(), temperature]);
                    }, 5000);
                }
            } else if (message.command === 'addstep') {
                mash.steps.push(message.payload);
            }
        });
    });
};
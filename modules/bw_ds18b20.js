var spawn = require('child_process').spawn;
spawn('modprobe w1-gpio');
spawn('modprobe w1-therm');

module.exports = {
    getTemperature: function () {

    }
};
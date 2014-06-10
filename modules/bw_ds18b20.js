var exec = require('child_process').exec;
var fs = require('fs');

var driversLoaded = false;

var executeCommand = function (cmd) {
    exec(cmd, function (error, stdout, stderr) {
        if (stderr) {
            console.log('error: ' + stderr);
        }
        if (error) {
            console.log('exec error: ' + error);
        }
    });
};

if (!driversLoaded) {
    executeCommand('modprobe w1-gpio');
    executeCommand('modprobe w1-therm');
}

var calculateCelcius = function (temperatureData) {
    return parseFloat(temperatureData) / 1000.0;
};

var calculateFarenheit = function (temperatureCelcius) {
    return temperatureCelcius * 9.0 / 5.0 + 32.0;
};

var convertDataToTemperature = function (unit, data) {
    var c = calculateCelcius(data);

    if (unit === 'c') {
        return c;
    }

    return calculateFarenheit(c);
};

var getTemperature = function (callback, unit) {
    fs.readFile('/sys/bus/w1/devices/28-0000043a8b50/w1_slave', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            var output = data.match(/t=(-?(\d+))/);
            if (output) {
                callback(convertDataToTemperature(unit, output[1]));
            } else {
                console.log('Can not read temperature for sensor.');
            }
        }
    });
};

module.exports = {
    getTemperature: getTemperature
};

angular.module('breware')
    .factory('temperatureService', function () {

        var socket = io.connect('http://localhost:3000');
        socket.on('connect', function () {
            console.log('connected');
        });

        var temperatureData = [];
        var startYear = 2004;
        socket.on('temp', function (data) {
            //console.log(data);
            startYear++;
            temperatureData.push([startYear, data]);
        });

        return {
            data: [temperatureData]
        };
    });
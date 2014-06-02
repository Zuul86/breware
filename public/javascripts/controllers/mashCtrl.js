angular.module('breware')
	.controller('mashCtrl', ['$scope', 'socket', 'stepService', function($scope, socket, stepService){
	    $scope.title = 'Mash';
	    $scope.steps = stepService.steps;
	    $scope.currentTemperature = '--';
	    $scope.currentMashTime = '--:--';
	    $scope.flamestate = false;

	    var formatCurrentMashTime = function (mashTime) {
	        var mintues = Math.round(mashTime % 1 * 60);
            var formatMinutes = (mintues < 10) ? ("0" + mintues) : mintues;
            return Math.floor(mashTime) + ':' + formatMinutes;
	    };

	    socket.on('temp', function (data) {
	        $scope.temperatureData = data;
	        $scope.currentTemperature = data[1].toFixed(2);
	        $scope.currentMashTime = formatCurrentMashTime(data[0]);
	    });

	    socket.on('flamestate', function (data) {
	        $scope.flamestate = data === 'on' ? true : false;
	    });

	    $scope.startMash = function () {
	        socket.send(JSON.stringify({'command': 'startmash'}));
	    }

	    $scope.addStep = function () {
	        $scope.steps.push({ time: $scope.stepTime, temp: $scope.stepTemp });
	        stepService.steps = $scope.steps;
	        socket.send(JSON.stringify({
	            'command': 'addstep',
	            'payload': {
	                'steptime': $scope.stepTime,
	                'steptemp': $scope.stepTemp
	            }
	        }));
	    }
	}]);
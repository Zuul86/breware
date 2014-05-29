angular.module('breware')
	.controller('mashCtrl', ['$scope', 'socket', function($scope, socket){
	    $scope.title = 'Mash';
	    $scope.steps = [];

	    socket.on('temp', function (data) {
	        $scope.temperatureData = data;
	    });

	    $scope.startMash = function () {
	        socket.send(JSON.stringify({'command': 'startmash'}));
	    }

	    $scope.addStep = function () {
	        $scope.steps.push({ time: $scope.stepTime, temp: $scope.stepTemp });
	        socket.send(JSON.stringify({
	            'command': 'addstep',
	            'payload': {
	                'steptime': $scope.stepTime,
	                'steptemp': $scope.stepTemp
	            }
	        }));
	    }
	}]);
'use strict';

angular.module('breware')
	.directive('bwGoogleChart', function () {
	    return {
	        restrict: 'E',
	        link: function (scope, elem, attr, ctrl) {
	            
	            var data = new google.visualization.DataTable();
                //TODO: Move column defs out of directive
	            data.addColumn('number', 'Minutes');
	            data.addColumn('number', 'Temperature');
	            
	            var chart = new google.visualization[attr.type](angular.element(elem[0]).parent()[0]);
                //TODO: Move options out of directive
	            var options = {
	                hAxis: { ticks: [0, 5, 10, 15, 20] },
	                vAxis: { ticks: [40, 60, 80, 100, 120, 140, 160, 180, 200] },
	                width: '100%',
	                height: '100%',
	                animation: { duration: 500 },
	                axisTitlesPosition: 'none',
	                legend: { position: 'none' },
	                chartArea: {
	                    left: 30,
                        top: 15,
                        width: '100%',
                        height: '90%'
	                },
	            };
	            chart.draw(data, options);

	            scope.$watch('temperatureData', function (newValue, oldValue) {
	                if (angular.isDefined(newValue)) {
	                    data.addRow(newValue);
	                    chart.draw(data, options);
	                }
	            });
	        }
	    };
	});
'use strict';

angular.module('breware')
	.directive('bwGoogleChart', ['chartDataService', function (chartDataService) {
	    return {
	        restrict: 'E',
	        link: function (scope, elem, attr, ctrl) {

	            //TODO: Move column defs out of directive
	            if (!chartDataService.data) {
	                chartDataService.data = new google.visualization.DataTable();
	                chartDataService.data.addColumn('number', 'Minutes');
	                chartDataService.data.addColumn('number', 'Temperature');
	            }
                
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
	            chart.draw(chartDataService.data, options);

	            scope.$watch('temperatureData', function (newValue, oldValue) {
	                if (angular.isDefined(newValue)) {
	                    chartDataService.data.addRow(newValue);
	                    chart.draw(chartDataService.data, options);
	                }
	            });
	        }
	    };
	}]);
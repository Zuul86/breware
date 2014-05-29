'use strict';

angular.module('breware')
    .directive('bwMashStepTable', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: './javascripts/views/mashStepTable.html'
        };
    });
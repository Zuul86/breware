'use strict';

angular.module('breware')
    .directive('bwMashInfo', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: './javascripts/views/mashInfo.html'
        };
    });
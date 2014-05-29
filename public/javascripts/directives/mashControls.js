'use strict';

angular.module('breware')
    .directive('bwMashControls', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: './javascripts/views/mashControls.html'
        };
    });
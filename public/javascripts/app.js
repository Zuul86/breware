angular.module('breware', [])
	.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

		$routeProvider
			.when('/', {
				templateUrl: 'javascripts/views/mash.html',
				controller: 'mashCtrl'
			})
            .when('/calculator', {
                templateUrl: 'javascripts/views/calculator.html',
            })
			.otherwise({
                template : "<div>Not Found</div>"
            });
	}]);

google.setOnLoadCallback(function () {
    angular.bootstrap(document.body, ['breware']);
});
google.load('visualization', '1', { packages: ['corechart'] });
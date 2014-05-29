angular.module('breware', [])
	.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	    $locationProvider.html5Mode(true);

		$routeProvider
			.when('/', {
					templateUrl: 'javascripts/views/mash.html',
					controller: 'mashCtrl'
			})
			.otherwise({
                template : "<div>Not Found</div>"
            });
	}]);

google.setOnLoadCallback(function () {
    angular.bootstrap(document.body, ['breware']);
});
google.load('visualization', '1', { packages: ['corechart'] });
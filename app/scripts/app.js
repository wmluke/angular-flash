(function () {
    'use strict';

    angular.module('App', ['angular-flash.flash-alert-directive', 'App.main-ctrl'])
        .config(function ($routeProvider, $locationProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/main.html',
                    controller: 'MainCtrl'
                })
                .otherwise({
                    redirectTo: '/'
                });
            $locationProvider.html5Mode(true);
        })
        .run();
}());
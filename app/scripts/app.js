(function () {
    'use strict';

    angular.module('App', ['ngRoute', 'angular-flash.flash-alert-directive', 'App.main-ctrl'])
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
        .config(function (flashProvider) {
            // Support bootstrap 3.0 "alert-danger" class with error flash types
            flashProvider.errorClassnames.push('alert-danger');

            /**
             * Also have...
             *
             * flashProvider.warnClassnames
             * flashProvider.infoClassnames
             * flashProvider.successClassnames
             */

        })
        .run();
}());

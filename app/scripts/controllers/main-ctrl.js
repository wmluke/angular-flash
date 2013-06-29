(function () {
    'use strict';

    var MainCtrl = function ($scope, flash, $timeout) {

        $scope.all = function () {
            $scope.info();
            $scope.warn();
            $scope.success();
            $scope.error();
        };

        $scope.info = function () {
            flash.info = 'info message';
        };

        $scope.warn = function () {
            flash.warn = 'warn message';
        };

        $scope.success = function () {
            flash.success = 'success message';
        };

        $scope.error = function () {
            flash.error = 'error message';
        };

        // Workaround until I fix https://github.com/wmluke/angular-flash/issues/2
        $timeout($scope.all, 100);
    };

    angular.module('App.main-ctrl', [])
        .controller('MainCtrl', ['$scope', 'flash', '$timeout', MainCtrl]);
}());
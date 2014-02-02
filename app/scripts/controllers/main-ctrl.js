(function () {
    'use strict';

    var MainCtrl = function ($scope, flash) {


        $scope.all = function () {
            $scope.info();
            $scope.warn();
            $scope.success();
            $scope.error();
        };

        $scope.info = function () {
            flash.info = 'info message';
        };

        $scope.info1 = function () {
            flash.to('alert-1').info = 'info message';
        };

        $scope.warn = function () {
            flash.warn = 'warn message';
        };

        $scope.warn1 = function () {
            flash.to('alert-1').warn = 'warn message';
        };

        $scope.success = function () {
            flash.success = 'success message';
        };

        $scope.success1 = function () {
            flash.to('alert-1').success = 'success message';
        };

        $scope.error = function () {
            flash.error = 'error message';
        };

        $scope.error1 = function () {
            flash.to('alert-1').error = 'error message';
        };

        $scope.dismissAlert1 = function () {
            flash.to('alert-1').error = false;
        };

        $scope.all();
    };

    angular.module('App.main-ctrl', [])
        .controller('MainCtrl', ['$scope', 'flash', MainCtrl]);
}());

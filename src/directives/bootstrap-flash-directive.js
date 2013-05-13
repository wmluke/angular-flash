/* global angular */

(function () {
    'use strict';

    function isBlank(str) {
        if (str === null || str === undefined) {
            str = '';
        }
        return (/^\s*$/).test(str);
    }


    function flashDirective(flash, $timeout) {
        return function ($scope, element) {
            $scope.flash = {};

            var headings = {
                success: 'Congrats!',
                info: 'FYI:',
                warn: 'Heads up!',
                error: 'Oh Snap!'
            };

            function hide(type) {
                element.fadeOut('slow', 'linear', function () {
                    $scope.flash = {};
                    element.removeClass('alert-' + type);
                });
            }

            function show(message, type) {
                $scope.flash.heading = headings[type];
                $scope.flash.message = message;
                element.addClass('alert-' + type);

                element.fadeIn('slow', 'linear', function () {
                    $timeout(function () {
                        hide(type);
                    }, 5000);
                });
            }

            flash.subscribe(function (message, type) {
                if (isBlank(message)) {
                    hide(type);
                } else {
                    show(message, type);
                }
            });
        };
    }


    angular.module('angular-flash.bootstrap-directive', ['angular-flash.service'])
        .directive('flash', ['flash', '$timeout', flashDirective]);

}());
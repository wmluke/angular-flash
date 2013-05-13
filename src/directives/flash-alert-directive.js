/* global angular */

(function () {
    'use strict';

    function isBlank(str) {
        if (str === null || str === undefined) {
            str = '';
        }
        return (/^\s*$/).test(str);
    }

    function flashAlertDirective(flash, $timeout) {
        return function ($scope, element, attr) {
            $scope.flash = {};

            function hide(type) {
                $scope.flash = {};
                element.removeClass('alert-' + type);
                if (!isBlank(attr.activeClass)) {
                    element.removeClass(attr.activeClass);
                }
            }

            function show(message, type) {
                $scope.flash.type = type;
                $scope.flash.message = message;
                element.addClass('alert-' + type);
                if (!isBlank(attr.activeClass)) {
                    element.addClass(attr.activeClass);
                }

                $timeout(function () {
                    hide(type);
                }, 5000);
            }

            flash.subscribe(function (message, type) {
                if (!isBlank(attr.flashAlert) && attr.flashAlert !== type) {
                    return;
                }
                if (isBlank(message)) {
                    hide(type);
                } else {
                    show(message, type);
                }
            });
        };
    }

    angular.module('angular-flash.flash-alert-directive', ['angular-flash.service'])
        .directive('flashAlert', ['flash', '$timeout', flashAlertDirective]);

}());
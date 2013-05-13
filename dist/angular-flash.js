/**! 
 * @license angular-flash v0.1.0
 * Copyright (c) 2013 William L. Bunselmeyer. https://github.com/wmluke/angular-flash
 * License: MIT
 */
/* global angular */

(function () {
    'use strict';

    var Flash = function () {
        var _subscribers = [];
        var _success;
        var _info;
        var _warn;
        var _error;

        this.subscribe = function (subscriber) {
            _subscribers.push(subscriber);
        };

        Object.defineProperty(this, 'success', {
            get: function () {
                return _success;
            },
            set: function (message) {
                _success = message;
                angular.forEach(_subscribers, function (subscriber) {
                    subscriber(message, 'success');
                });
            }
        });

        Object.defineProperty(this, 'info', {
            get: function () {
                return _info;
            },
            set: function (message) {
                _info = message;
                angular.forEach(_subscribers, function (subscriber) {
                    subscriber(message, 'info');
                });
            }
        });

        Object.defineProperty(this, 'warn', {
            get: function () {
                return _warn;
            },
            set: function (message) {
                _warn = message;
                angular.forEach(_subscribers, function (subscriber) {
                    subscriber(message, 'warn');
                });
            }
        });

        Object.defineProperty(this, 'error', {
            get: function () {
                return _error;
            },
            set: function (message) {
                _error = message;
                angular.forEach(_subscribers, function (subscriber) {
                    subscriber(message, 'error');
                });
            }
        });
    };

    function flashProvider() {
        return new Flash();
    }

    angular.module('angular-flash.service', []).factory('flash', [flashProvider]);

}());
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
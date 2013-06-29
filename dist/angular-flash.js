/**! 
 * @license angular-flash v0.1.4
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

    function flashAlertDirective(flash, $timeout) {
        return function ($scope, element, attr) {
            $scope.flash = {};

            function removeAlertClasses() {
                element.removeClass('alert-info');
                element.removeClass('alert-warn');
                element.removeClass('alert-error');
                element.removeClass('alert-success');
            }

            function hide() {
                $scope.flash = {};
                removeAlertClasses();
                if (!isBlank(attr.activeClass)) {
                    element.removeClass(attr.activeClass);
                }
            }

            function show(message, type) {
                $scope.flash.type = type;
                $scope.flash.message = message;
                removeAlertClasses();
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
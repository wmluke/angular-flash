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
/* global angular */

(function () {
    'use strict';

    var Flash = function () {
        var _self = this;
        var _subscribers = [];
        var _success;
        var _info;
        var _warn;
        var _error;
        var _type;

        function _notify(type, message) {
            angular.forEach(_subscribers, function (subscriber) {
                if (!subscriber.type || subscriber.type === type) {
                    subscriber.cb(message, type);
                }
            });
        }

        this.clean = function () {
            _subscribers = [];
            _success = null;
            _info = null;
            _warn = null;
            _error = null;
            _type = null;
        };

        this.subscribe = function (subscriber, type) {
            _subscribers.push({
                cb: subscriber,
                type: type
            });
        };

        Object.defineProperty(this, 'success', {
            get: function () {
                return _success;
            },
            set: function (message) {
                _success = message;
                _type = 'success';
                _notify(_type, message);
            }
        });

        Object.defineProperty(this, 'info', {
            get: function () {
                return _info;
            },
            set: function (message) {
                _info = message;
                _type = 'info';
                _notify(_type, message);
            }
        });

        Object.defineProperty(this, 'warn', {
            get: function () {
                return _warn;
            },
            set: function (message) {
                _warn = message;
                _type = 'warn';
                _notify(_type, message);
            }
        });

        Object.defineProperty(this, 'error', {
            get: function () {
                return _error;
            },
            set: function (message) {
                _error = message;
                _type = 'error';
                _notify(_type, message);
            }
        });

        Object.defineProperty(this, 'type', {
            get: function () {
                return _type;
            }
        });

        Object.defineProperty(this, 'message', {
            get: function () {
                return _type ? _self[_type] : null;
            }
        });
    };

    function flashProvider() {
        return new Flash();
    }

    angular.module('angular-flash.service', []).factory('flash', [flashProvider]);

}());
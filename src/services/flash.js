(function (angular, _) {
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

        this.__defineGetter__("success", function () {
            return _success;
        });

        this.__defineSetter__("success", function (message) {
            _success = message;
            _.each(_subscribers, function (subscriber) {
                subscriber(message, "success");
            });
        });

        this.__defineGetter__("info", function () {
            return _info;
        });

        this.__defineSetter__("info", function (message) {
            _info = message;
            _.each(_subscribers, function (subscriber) {
                subscriber(message, "info");
            });
        });

        this.__defineGetter__("warn", function () {
            return _warn;
        });

        this.__defineSetter__("warn", function (message) {
            _warn = message;
            _.each(_subscribers, function (subscriber) {
                subscriber(message, "warn");
            });
        });


        this.__defineGetter__("error", function () {
            return _error;
        });

        this.__defineSetter__("error", function (message) {
            _error = message;
            _.each(_subscribers, function (subscriber) {
                subscriber(message, "error");
            });
        });
    };

    function flashProvider() {
        return new Flash();
    }


    angular.module('angular-common.flash-service', [])
        .factory('flash', [flashProvider]);

}(window.angular || {}, window._ || {}));
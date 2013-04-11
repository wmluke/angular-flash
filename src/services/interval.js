(function (angular) {
    'use strict';

    var Interval = function ($timeout, callback, delay) {
        var _run = false;
        var _count = 0;

        function _poll() {
            if (_run) {
                callback(_count, _count * delay);
                _count += 1;
                $timeout(_poll, delay);
            }
        }

        Object.defineProperty(this, 'run', {
            get: function () {
                return _run;
            },
            set: function (run) {
                _run = run;
                $timeout(_poll, delay);
            }
        });

        Object.defineProperty(this, 'count', {
            get: function () {
                return _count;
            }
        });

        Object.defineProperty(this, 'elapsed', {
            get: function () {
                return _count * delay;
            }
        });
    };

    Interval.createInterval = function ($timeout) {
        return function (callback, delay) {
            var interval = new Interval($timeout, callback, delay);
            interval.run = true;
            return interval;
        };
    };


    function startIntervalProvider($timeout) {
        return Interval.createInterval($timeout);
    }

    angular.module('angular-common.interval-service', [])
        .factory('startInterval', ['$timeout', startIntervalProvider]);

}(window.angular || {}));
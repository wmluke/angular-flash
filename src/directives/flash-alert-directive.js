/* global angular */

(function () {
    'use strict';

    var regex = /^([\-\+]?[0-9]+(\.[0-9]+)?)(m?s)$/;

    // https://github.com/philbooth/css-time.js/blob/master/src/css-time.js#L22
    function from(cssTime) {
        var matches = regex.exec(cssTime);

        if (matches === null) {
            throw new Error('Invalid CSS time');
        }

        return parseFloat(matches[1]) * (matches[3] === 's' ? 1000 : 1);
    }

    function isBlank(str) {
        if (str === null || str === undefined) {
            str = '';
        }
        return (/^\s*$/).test(str);
    }

    function flashAlertDirective(flash, $timeout) {
        return {
            scope: true,
            link: function ($scope, element, attr) {
                var timeoutHandle, subscribeHandle;

                $scope.flash = {};

                $scope.hide = function () {
                    if (!isBlank(attr.activeClass)) {
                        element.removeClass(attr.activeClass);
                    }
                    var transitionDurationString = element.css('transition-duration');
                    var transitionDuration = from(transitionDurationString);
                    //console.log('adding delay of transition-duration=[%s] prior to initializing flash...', transitionDuration);
                    $timeout(function () {
                        $scope.flash = {};
                        removeAlertClasses();
                    }, transitionDuration);
                };

                $scope.$on('$destroy', function () {
                    flash.clean();
                    flash.unsubscribe(subscribeHandle);
                });

                function removeAlertClasses() {
                    var classnames = [].concat(flash.classnames.error, flash.classnames.warn, flash.classnames.info, flash.classnames.success);
                    angular.forEach(classnames, function (clazz) {
                        element.removeClass(clazz);
                    });
                }

                function show(message, type) {
                    if (timeoutHandle) {
                        $timeout.cancel(timeoutHandle);
                    }

                    $scope.flash.type = type;
                    $scope.flash.message = message;
                    removeAlertClasses();
                    angular.forEach(flash.classnames[type], function (clazz) {
                        element.addClass(clazz);
                    });

                    if (!isBlank(attr.activeClass)) {
                        element.addClass(attr.activeClass);
                    }

                    var delay = Number(attr.duration || 5000);
                    if (delay > 0) {
                        timeoutHandle = $timeout($scope.hide, delay);
                    }
                }

                subscribeHandle = flash.subscribe(show, attr.flashAlert, attr.id);

                /**
                 * Fixes timing issues: display the last flash message sent before this directive subscribed.
                 */

                if (attr.flashAlert && flash[attr.flashAlert]) {
                    show(flash[attr.flashAlert], attr.flashAlert);
                }

                if (!attr.flashAlert && flash.message) {
                    show(flash.message, flash.type);
                }

            }
        };
    }

    angular.module('angular-flash.flash-alert-directive', ['angular-flash.service'])
        .directive('flashAlert', ['flash', '$timeout', flashAlertDirective]);

}());

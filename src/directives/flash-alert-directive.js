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
        return {
            scope: true,
            link: function ($scope, element, attr) {
                var handle;

                $scope.flash = {};

                $scope.hide = function () {
                    $scope.flash = {};
                    removeAlertClasses();
                    if (!isBlank(attr.activeClass)) {
                        element.removeClass(attr.activeClass);
                    }
                };

                $scope.$on('$destroy', function () {
                    flash.clean();
                });

                function removeAlertClasses() {
                    element.removeClass('alert-info');
                    element.removeClass('alert-warn');
                    element.removeClass('alert-error');
                    element.removeClass('alert-success');
                }

                function show(message, type) {
                    if (handle) {
                        $timeout.cancel(handle);
                    }

                    $scope.flash.type = type;
                    $scope.flash.message = message;
                    removeAlertClasses();
                    element.addClass('alert-' + type);
                    if (!isBlank(attr.activeClass)) {
                        element.addClass(attr.activeClass);
                    }

                    var delay = Number(attr.duration || 5000);
                    if (delay > 0) {
                        handle = $timeout($scope.hide, delay);
                    }
                }

                flash.subscribe(show, attr.flashAlert);

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
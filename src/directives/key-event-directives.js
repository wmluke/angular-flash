(function (angular) {
    'use strict';

    function keyEnter($parse) {
        return function (scope, element, attr) {
            var fn = $parse(attr['keyEnter']);
            element.keydown(function (event) {
                var keycode = event.keyCode || event.which;
                if (keycode === 13) {
                    scope.$apply(function () {
                        fn(scope, {$event: event});
                    });
                }
            });
        };
    }

    function keyUpArrow($parse) {
        return function (scope, element, attr) {
            var fn = $parse(attr['keyUpArrow']);
            element.keyup(function (event) {
                var keycode = event.keyCode || event.which;
                if (keycode === 38) {
                    scope.$apply(function () {
                        fn(scope, {$event: event});
                    });
                }
            });
        };
    }

    function keyDownArrow($parse) {
        return function (scope, element, attr) {
            var fn = $parse(attr['keyDownArrow']);
            element.keyup(function (event) {
                var keycode = event.keyCode || event.which;
                if (keycode === 40) {
                    scope.$apply(function () {
                        fn(scope, {$event: event});
                    });
                }
            });
        };
    }

    angular.module('angular-common.key-event-directives', [])
        .directive('keyEnter', ['$parse', keyEnter])
        .directive('keyUpArrow', ['$parse', keyUpArrow])
        .directive('keyDownArrow', ['$parse', keyDownArrow]);

}(window.angular || {}));
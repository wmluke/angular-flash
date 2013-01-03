/*! angular-common - v0.0.1 - 2013-01-02
* https://github.com/wmluke/angular-common
* Copyright (c) 2013 William Bunselmeyer 
* License http://www.apache.org/licenses/LICENSE-2.0.html */

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

        this.__defineGetter__("run", function () {
            return _run;
        });

        this.__defineSetter__("run", function (run) {
            _run = run;
            $timeout(_poll, delay);
        });

        this.__defineGetter__("count", function () {
            return _count;
        });

        this.__defineGetter__("elapsed", function () {
            return _count * delay;
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
(function (angular, _, moment, $) {
    'use strict';

    function navCollapse() {
        return function (scope, element) {
            element.collapse();
        };
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
                if (_.string.isBlank(message)) {
                    hide(type);
                } else {
                    show(message, type);
                }
            });
        };
    }

    function typeahead($parse) {
        return function (scope, element, attr) {
            var ngModel = $parse(attr.ngModel),
                ngUpdate = $parse(attr.ngUpdate),
                source = attr['source'];

            element.change(function (evt) {
                scope.$apply(function () {
                    if (ngModel) {
                        ngModel.assign(scope, evt.target.value);
                    }
                    if (ngUpdate) {
                        ngUpdate(scope);
                    }
                });
            });

            scope.$watch(source, function (data) {
                if (_.isEmpty(data)) {
                    return;
                }
                element.typeahead({
                    source: data
                });

            }, true);
        };
    }

    function datePicker($parse) {
        return function (scope, element, attr) {
            var getter = $parse(attr.ngModel);
            var setter = getter.assign;

            element.datepicker({
                autoclose: true
            });

            element.on('changeDate', function (event) {
                scope.$apply(function () {
                    setter(scope, element.data('datepicker').getDate());
                });
            });

            scope.$watch(attr.ngModel, function (value) {
                if (value) {
                    element.datepicker('setDate', moment(value).toDate());
                }
            }, true);
        };
    }

    function navToggle() {
        return function (scope, element, attr) {
            element.click(function (evt) {
                $(evt.target).closest('li').addClass('active').siblings().removeClass('active');
            });
        };
    }

    function transition($timeout) {
        return function (scope, element, attr) {
            $timeout(function () {
                element.addClass('in');
            }, 50);
        };
    }

    function tooltip() {
        return function (scope, element, attr) {
            $(element).tooltip({
                title: attr.title
            });
            scope.$on('$destroy', function () {
                $(element).tooltip('destroy');
                console.info('$destroy');
            });
            scope.$on('$routeChangeStart', function () {
                $(element).tooltip('destroy');
                console.info('$routeChangeStart');
            });

        };
    }

    var confirmId = 1;

    function confirm($parse) {
        return function (scope, element, attr) {

            var action = $parse(attr.confirm);

            var html = [
                '<form id="confirm' + confirmId + '" class="confirm-form">',
                '  <p>' + attr.message + '</p>',
                '  <br/>',
                '  <div class="form-actions">',
                '    <a class="btn btn-cancel">Never mind</a>',
                '    <button type="button" class="btn btn-primary btn-ok">Do it!</button>',
                '  </div>',
                '</form>'
            ];


            element.popover({
                content: html.join('\n'),
                html: true,
                title: attr.title + '?',
                placement: attr.confirmPlacement || 'top'
            });

            element.click(function () {
                element.popover('show');
            });

            $(document).on('click', '#confirm' + confirmId + ' .btn-cancel', function () {
                element.popover('hide');
            });

            $(document).on('click', '#confirm' + confirmId + ' .btn-ok', function () {
                element.popover('hide');
                if (action) {
                    action(scope);
                }
            });

            confirmId += 1;
        };
    }

    angular.module('angular-common.bootstrap-directives', ['angular-common.flash-service'])
        .directive('flash', ['flash', '$timeout', flashDirective])
        .directive('datePicker', ['$parse', datePicker])
        .directive('transition', ['$timeout', transition])
        .directive('tooltip', ['$timeout', tooltip])
        .directive('confirm', ['$parse', confirm])
        .directive('navToggle', [navToggle])
        .directive('navCollapse', [navCollapse])
        .directive('typeahead', ['$parse', typeahead]);

}(window.angular || {}, window.underscore || {}, window.moment || {}, window.$ || {}));
(function (angular, marked, _, CodeMirror) {
    'use strict';

    function compile($compile) {
        // directive factory creates a link function
        return function (scope, element, attrs) {
            scope.$watch(
                function (scope) {
                    // watch the 'compile' expression for changes
                    return scope.$eval(attrs.compile);
                },
                function (value) {
                    // when the 'compile' expression changes
                    // assign it into the current DOM
                    element.html(value);

                    // compile the new DOM and link it to the current
                    // scope.
                    // NOTE: we only compile .childNodes so that
                    // we don't get into infinite loop compiling ourselves
                    $compile(element.contents())(scope);
                }
            );
        };
    }

    function googlePretty($window) {
        return function (scope, elm, attrs) {
            $window.prettyPrint();
        };
    }

    function markdown() {
        marked.setOptions({
            gfm: true,
            pedantic: false,
            sanitize: true
        });

        return function (input) {
            if (_.string.isBlank(input)) {
                return input;
            }
            return marked(input);
        };
    }

    function codeEditor($parse, $timeout) {
        return function (scope, element, attr) {
            var getter = $parse(attr.ngModel);
            var setter = getter.assign;
            var codeMirror;

            var opts = _.extend({
                mode: 'text',
                theme: 'neat',
                lineNumbers: true,
                autofocus: false,
                matchBrackets: true,
                lineWrapping: true
            }, $parse(attr.codeEditor)(scope));


            opts.value = getter(scope);
            opts.onUpdate = function (editor, info) {
                $timeout(function () {
                    scope.$apply(function () {
                        setter(scope, codeMirror.getValue());
                    });
                });
            };

            codeMirror = CodeMirror.fromTextArea(element.get(0), opts);

            scope.$watch(attr.ngModel, function (value) {
                if (value && value !== codeMirror.getValue()) {
                    codeMirror.setValue(value);
                    setTimeout(function () {
                        codeMirror.refresh();
                    }, 200);
                }
            }, true);

            element.focus(function () {
                codeMirror.focus();
            });
        };
    }


    function inlineEdit() {
        return function (scope, element, attr) {
            function display() {
                element.children('.value').show();
                element.children('input').hide();
            }

            function edit() {
                element.children('.value').hide().tooltip('hide');
                element.children('input').show();
            }

            element.on('click', '.value', edit);

            element.children('input').keyup(function (event) {
                var keycode = event.keyCode || event.which;
                if (keycode === 13) {
                    display();
                }
            });
        };
    }

    function contenteditable() {
        return {
            restrict: 'A', // only activate on element attribute
            require: '?ngModel', // get a hold of NgModelController
            link: function (scope, element, attrs, ngModel) {
                if (!ngModel) {
                    return; // do nothing if no ng-model
                }

                function read() {
                    ngModel.$setViewValue(element.text());
                }

                // Specify how UI should be updated
                ngModel.$render = function () {
                    element.text(ngModel.$viewValue || '');
                };

                // Listen for change events to enable binding
                element.bind('blur keyup change', function () {
                    scope.$apply(read);
                });
                read(); // initialize


            }
        };
    }

    angular.module('angular-common.content-directives', [])
        .directive('codeEditor', ['$parse', '$timeout', codeEditor])
        .directive('inlineEdit', [inlineEdit])
        .directive('contenteditable', [contenteditable])
        .directive('compile', ['$compile', compile])
        .directive('prettyprint', ['$window', googlePretty])
        .filter('markdown', [markdown]);

}(window.angular || {}, window.marked || {}, window.underscore || {}, window.CodeMirror || {}));
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
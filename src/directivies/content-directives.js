(function (angular) {
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
        }
    }

    function googlePretty($window) {
        return function (scope, elm, attrs) {
            $window.prettyPrint();
        }
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

            var codeMirror = CodeMirror.fromTextArea(element.get(0), opts);

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
                var keycode = (event.keyCode ? event.keyCode : event.which);
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
                if (!ngModel) return; // do nothing if no ng-model

                // Specify how UI should be updated
                ngModel.$render = function () {
                    element.text(ngModel.$viewValue || '');
                };

                // Listen for change events to enable binding
                element.bind('blur keyup change', function () {
                    scope.$apply(read);
                });
                read(); // initialize

                // Write data to the model
                function read() {
                    ngModel.$setViewValue(element.text());
                }
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

}(window.angular || {}));
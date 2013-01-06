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

}(window.angular || {}, window._ || {}, window.moment || {}, window.$ || {}));
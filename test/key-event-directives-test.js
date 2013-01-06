describe('FlashService', function () {
    'use strict';

    var scope, $sandbox, $compile, $timeout;

    beforeEach(module('angular-common.key-event-directives'));

    beforeEach(inject(function ($injector, $rootScope, _$compile_, _$timeout_) {
        scope = $rootScope;
        $compile = _$compile_;
        $timeout = _$timeout_;

        $sandbox = $('<div id="sandbox"></div>').appendTo($('body'));
        scope.model = {};
    }));

    afterEach(function () {
        $sandbox.remove();
        scope.$destroy();
    });

    function compileDirective(template) {
        template = $(template).appendTo($sandbox);
        return $compile(template)(scope);
    }

    describe('key-enter directive', function () {

        it('should run the passed expression on enter keydown event', function () {
            scope.onEnter = jasmine.createSpy('onEnter');

            var elm = compileDirective('<div key-enter="onEnter()"></div>');

            var keydownEnter = jQuery.Event("keydown");
            keydownEnter.which = 13;
            elm.trigger(keydownEnter);

            var keypressEnter = jQuery.Event("keypress");
            keypressEnter.which = 13;
            elm.trigger(keypressEnter);

            var e = jQuery.Event("keydown");
            e.which = 50;
            elm.trigger(e);

            expect(scope.onEnter).toHaveBeenCalled();
            expect(scope.onEnter.callCount).toBe(1);
        });

    });

    describe('key-up-arrow directive', function () {

        it('should run the passed expression on up-arrow keyup event', function () {
            scope.onUp = jasmine.createSpy('onUp');

            var elm = compileDirective('<div key-up-arrow="onUp()"></div>');

            var keyupUpArrow = jQuery.Event("keyup");
            keyupUpArrow.which = 38;
            elm.trigger(keyupUpArrow);

            var keypressUpArrow = jQuery.Event("keypress");
            keypressUpArrow.which = 38;
            elm.trigger(keypressUpArrow);

            var e = jQuery.Event("keydown");
            e.which = 50;
            elm.trigger(e);

            expect(scope.onUp).toHaveBeenCalled();
            expect(scope.onUp.callCount).toBe(1);
        });

    });

    describe('key-down-arrow directive', function () {

        it('should run the passed expression on down-arrow keyup event', function () {
            scope.onDown = jasmine.createSpy('onDown');

            var elm = compileDirective('<div key-down-arrow="onDown()"></div>');

            var keyupDownArrow = jQuery.Event("keyup");
            keyupDownArrow.which = 40;
            elm.trigger(keyupDownArrow);

            var keypressDownArrow = jQuery.Event("keypress");
            keypressDownArrow.which = 40;
            elm.trigger(keypressDownArrow);

            var e = jQuery.Event("keydown");
            e.which = 50;
            elm.trigger(e);

            expect(scope.onDown).toHaveBeenCalled();
            expect(scope.onDown.callCount).toBe(1);
        });

    });
});
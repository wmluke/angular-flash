describe('flash-directive', function () {
    'use strict';

    var _flash, scope, $sandbox, $compile, $timeout;

    beforeEach(module('angular-flash.bootstrap-directive'));

    beforeEach(inject(function (flash) {
        _flash = flash;
    }));

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


    it('meh', function () {

//        var template = ['<div flash class="alert" style="display: none;">',
//                        '<strong class="alert-heading">{{flash.heading}}</strong>',
//                        '<span class="alert-message">{{flash.message}}</span>',
//                        '</div>'];

        //var elm = compileDirective(template.join('\n'));

        expect(element('alert-error').count()).toBe(1);
        expect(binding('flash.heading')).toBe(null);
        expect(binding('flash.message')).toBe(null);

        _flash.errror = ':error-message';

        expect(element('alert-error').count()).toBe(1);
        expect(binding('flash.heading')).toBe('Oh Snap!');
        expect(binding('flash.message')).toBe(':error-message');

        $timeout.flush();

        expect(element('alert-error').count()).toBe(1);
        expect(binding('flash.heading')).toBe(null);
        expect(binding('flash.message')).toBe(null);

    });

});
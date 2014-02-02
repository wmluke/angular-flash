describe('flash-alert-directive', function () {
    'use strict';

    beforeEach(function () {
        module('angular-flash.service', 'angular-flash.flash-alert-directive');

        module(function ($provide, flashProvider) {

            flashProvider.errorClassnames.push('alert-danger');

            $provide.decorator('$timeout', function ($delegate, $browser) {
                var spy = jasmine.createSpy('$timeout').andCallFake($delegate);
                spy.flush = function () {
                    $browser.defer.flush();
                };
                spy.cancel = $delegate.cancel;
                return  spy;
            });
        });

    });


    it('should display all flash messages', inject(function ($rootScope, $compile, $timeout, flash) {

        var template = [
            '<div flash-alert active-class="in" class="alert fade">',
            '<strong class="alert-heading">{{flash.type}}</strong>',
            '<span class="alert-message">{{flash.message}}</span>',
            '</div>'
        ];

        var element = angular.element(template.join('\n'));
        $compile(element)($rootScope);
        $rootScope.$digest();

        expect(element.find('.alert-heading').text()).toBe('');
        expect(element.find('.alert-message').text()).toBe('');
        expect(element.hasClass('alert-error')).toBe(false);
        expect(element.hasClass('alert-danger')).toBe(false);
        expect(element.hasClass('in')).toBe(false);

        flash.error = ':error-message';
        $rootScope.$digest();

        expect(element.find('.alert-heading').text()).toBe('error');
        expect(element.find('.alert-message').text()).toBe(':error-message');
        expect(element.hasClass('alert-error')).toBe(true);
        expect(element.hasClass('alert-danger')).toBe(true);
        expect(element.hasClass('in')).toBe(true);

        $timeout.flush();

        expect(element.find('.alert-heading').text()).toBe('error');
        expect(element.find('.alert-message').text()).toBe(':error-message');
        expect(element.hasClass('alert-error')).toBe(false);
        expect(element.hasClass('in')).toBe(false);

        flash.success = ':success-message';
        $rootScope.$digest();


        expect(element.find('.alert-heading').text()).toBe('success');
        expect(element.find('.alert-message').text()).toBe(':success-message');
        expect(element.hasClass('alert-success')).toBe(true);
        expect(element.hasClass('in')).toBe(true);

        $timeout.flush();

        expect(element.find('.alert-heading').text()).toBe('success');
        expect(element.find('.alert-message').text()).toBe(':success-message');
        expect(element.hasClass('alert-success')).toBe(false);
        expect(element.hasClass('in')).toBe(false);

    }));

    it('should display only error flash messages', inject(function ($rootScope, $compile, $timeout, flash) {

        var template = [
            '<div flash-alert="error" active-class="in" class="alert fade">',
            '<strong class="alert-heading">{{flash.type}}</strong>',
            '<span class="alert-message">{{flash.message}}</span>',
            '</div>'
        ];

        var element = angular.element(template.join('\n'));
        $compile(element)($rootScope);
        $rootScope.$digest();

        expect(element.find('.alert-heading').text()).toBe('');
        expect(element.find('.alert-message').text()).toBe('');
        expect(element.hasClass('alert-error')).toBe(false);
        expect(element.hasClass('alert-danger')).toBe(false);
        expect(element.hasClass('in')).toBe(false);

        flash.error = ':error-message';
        $rootScope.$digest();

        expect(element.find('.alert-heading').text()).toBe('error');
        expect(element.find('.alert-message').text()).toBe(':error-message');
        expect(element.hasClass('alert-error')).toBe(true);
        expect(element.hasClass('alert-danger')).toBe(true);
        expect(element.hasClass('in')).toBe(true);

        $timeout.flush();

        expect(element.find('.alert-heading').text()).toBe('error');
        expect(element.find('.alert-message').text()).toBe(':error-message');
        expect(element.hasClass('alert-error')).toBe(false);
        expect(element.hasClass('alert-danger')).toBe(false);
        expect(element.hasClass('in')).toBe(false);

        flash.success = ':success-message';
        $rootScope.$digest();

        expect(element.find('.alert-heading').text()).toBe('error');
        expect(element.find('.alert-message').text()).toBe(':error-message');
        expect(element.hasClass('alert-success')).toBe(false);
        expect(element.hasClass('in')).toBe(false);

    }));

    it('should only display the most recent flash message', inject(function ($rootScope, $compile, $timeout, flash) {
        var template = [
            '<div flash-alert active-class="in" class="alert fade">',
            '<strong class="alert-heading">{{flash.type}}</strong>',
            '<span class="alert-message">{{flash.message}}</span>',
            '</div>'
        ];

        var element = angular.element(template.join('\n'));
        $compile(element)($rootScope);
        $rootScope.$digest();

        expect(element.find('.alert-heading').text()).toBe('');
        expect(element.find('.alert-message').text()).toBe('');
        expect(element.hasClass('alert-error')).toBe(false);
        expect(element.hasClass('alert-danger')).toBe(false);
        expect(element.hasClass('alert-success')).toBe(false);
        expect(element.hasClass('alert-info')).toBe(false);
        expect(element.hasClass('alert-warning')).toBe(false);
        expect(element.hasClass('in')).toBe(false);

        flash.info = ':info-message';
        flash.success = ':success-message';
        $rootScope.$digest();

        expect(element.find('.alert-heading').text()).toBe('success');
        expect(element.find('.alert-message').text()).toBe(':success-message');
        expect(element.hasClass('alert-error')).toBe(false);
        expect(element.hasClass('alert-danger')).toBe(false);
        expect(element.hasClass('alert-success')).toBe(true);
        expect(element.hasClass('alert-info')).toBe(false);
        expect(element.hasClass('alert-warning')).toBe(false);
        expect(element.hasClass('in')).toBe(true);

        $timeout.flush();

        expect(element.find('.alert-heading').text()).toBe('success');
        expect(element.find('.alert-message').text()).toBe(':success-message');
        expect(element.hasClass('alert-error')).toBe(false);
        expect(element.hasClass('alert-danger')).toBe(false);
        expect(element.hasClass('alert-success')).toBe(false);
        expect(element.hasClass('alert-info')).toBe(false);
        expect(element.hasClass('alert-warning')).toBe(false);
        expect(element.hasClass('in')).toBe(false);

    }));

    it('should appear for 5 seconds with no duration attribute', inject(function ($rootScope, $compile, $timeout, flash) {
        var template = [
            '<div flash-alert active-class="in" class="alert fade" >',
            '<strong class="alert-heading">{{flash.type}}</strong>',
            '<span class="alert-message">{{flash.message}}</span>',
            '</div>'
        ];

        var element = angular.element(template.join('\n'));
        $compile(element)($rootScope);

        flash.success = ':success-message';
        $rootScope.$digest();

        expect($timeout).toHaveBeenCalledWith(jasmine.any(Function), 5000);
    }));

    it('should appear for the number of msec specified by the duration attribute', inject(function ($rootScope, $compile, $timeout, flash) {
        var template = [
            '<div flash-alert active-class="in" class="alert fade" duration="3000">',
            '<strong class="alert-heading">{{flash.type}}</strong>',
            '<span class="alert-message">{{flash.message}}</span>',
            '</div>'
        ];

        var element = angular.element(template.join('\n'));
        $compile(element)($rootScope);

        flash.success = ':success-message';
        $rootScope.$digest();

        expect($timeout).toHaveBeenCalledWith(jasmine.any(Function), 3000);
    }));


    it('should not fade away with duration set to 0', inject(function ($rootScope, $compile, $timeout, flash) {
        var template = [
            '<div flash-alert active-class="in" class="alert fade" duration="0">',
            '<strong class="alert-heading">{{flash.type}}</strong>',
            '<span class="alert-message">{{flash.message}}</span>',
            '</div>'
        ];

        var element = angular.element(template.join('\n'));
        $compile(element)($rootScope);

        flash.success = ':success-message';
        $rootScope.$digest();

        expect($timeout.wasCalled).toBe(false);

    }));

    it('should should display the error message even if the message was set before the directive subscribed', inject(function ($rootScope, $compile, flash) {
        var template = [
            '<div flash-alert="error" active-class="in" class="alert fade">',
            '<strong class="alert-heading">{{flash.type}}</strong>',
            '<span class="alert-message">{{flash.message}}</span>',
            '</div>'
        ];

        flash.error = ':error-message';

        var element = angular.element(template.join('\n'));

        $compile(element)($rootScope);
        $rootScope.$digest();

        expect(element.find('.alert-heading').text()).toBe('error');
        expect(element.find('.alert-message').text()).toBe(':error-message');
        expect(element.hasClass('alert-error')).toBe(true);
        expect(element.hasClass('alert-danger')).toBe(true);
        expect(element.hasClass('in')).toBe(true);
    }));

    it('should should display the any message even if the message was set before the directive subscribed', inject(function ($rootScope, $compile, flash) {
        var template = [
            '<div flash-alert active-class="in" class="alert fade">',
            '<strong class="alert-heading">{{flash.type}}</strong>',
            '<span class="alert-message">{{flash.message}}</span>',
            '</div>'
        ];

        flash.error = ':error-message';

        var element = angular.element(template.join('\n'));

        $compile(element)($rootScope);
        $rootScope.$digest();

        expect(element.find('.alert-heading').text()).toBe('error');
        expect(element.find('.alert-message').text()).toBe(':error-message');
        expect(element.hasClass('alert-error')).toBe(true);
        expect(element.hasClass('alert-danger')).toBe(true);
        expect(element.hasClass('in')).toBe(true);
    }));

    it('should display the error message even if the error message was not the last message', inject(function ($rootScope, $compile, flash) {
        var template = [
            '<div flash-alert="error" active-class="in" class="alert fade">',
            '<strong class="alert-heading">{{flash.type}}</strong>',
            '<span class="alert-message">{{flash.message}}</span>',
            '</div>'
        ];

        flash.error = ':error-message';
        flash.success = ':success-message';

        var element = angular.element(template.join('\n'));

        $compile(element)($rootScope);
        $rootScope.$digest();

        expect(element.find('.alert-heading').text()).toBe('error');
        expect(element.find('.alert-message').text()).toBe(':error-message');
        expect(element.hasClass('alert-error')).toBe(true);
        expect(element.hasClass('alert-danger')).toBe(true);
        expect(element.hasClass('in')).toBe(true);
    }));

    it('should hide the alert if the flash message is falsey', inject(function ($rootScope, $compile, flash) {
        var template = [
            '<div flash-alert="error" active-class="in" class="alert fade" duration="0">',
            '<strong class="alert-heading">{{flash.type}}</strong>',
            '<span class="alert-message">{{flash.message}}</span>',
            '</div>'
        ];

        var element = angular.element(template.join('\n'));
        $compile(element)($rootScope);
        $rootScope.$digest();

        expect(element.find('.alert-heading').text()).toBe('');
        expect(element.find('.alert-message').text()).toBe('');
        expect(element.hasClass('alert-error')).toBe(false);
        expect(element.hasClass('alert-danger')).toBe(false);
        expect(element.hasClass('in')).toBe(false);

        flash.error = ':error-message';
        $rootScope.$digest();

        expect(element.find('.alert-heading').text()).toBe('error');
        expect(element.find('.alert-message').text()).toBe(':error-message');
        expect(element.hasClass('alert-error')).toBe(true);
        expect(element.hasClass('alert-danger')).toBe(true);
        expect(element.hasClass('in')).toBe(true);

        flash.error = '';
        $rootScope.$digest();

        expect(element.find('.alert-heading').text()).toBe('error');
        expect(element.find('.alert-message').text()).toBe('');
        expect(element.hasClass('alert-error')).toBe(false);
        expect(element.hasClass('alert-danger')).toBe(false);
        expect(element.hasClass('in')).toBe(false);

    }));

    describe('scope destroy', function () {

        it('should clean the flash service when the directive scope is destroyed', inject(function ($rootScope, $compile, flash) {
            var template = [
                '<div flash-alert="error" active-class="in" class="alert fade">',
                '<strong class="alert-heading">{{flash.type}}</strong>',
                '<span class="alert-message">{{flash.message}}</span>',
                '</div>'
            ];

            flash.error = ':error-message';
            flash.success = ':success-message';

            var element = angular.element(template.join('\n'));

            var $scope = $rootScope.$new();

            spyOn(flash, 'clean').andCallThrough();
            spyOn(flash, 'unsubscribe').andCallThrough();

            $compile(element)($scope);
            $scope.$digest();

            expect(element.find('.alert-heading').text()).toBe('error');
            expect(element.find('.alert-message').text()).toBe(':error-message');
            expect(element.hasClass('alert-error')).toBe(true);
            expect(element.hasClass('alert-danger')).toBe(true);
            expect(element.hasClass('in')).toBe(true);

            $scope.$destroy();

            expect(flash.clean).toHaveBeenCalled();
            expect(flash.unsubscribe).toHaveBeenCalledWith(jasmine.any(Number));
            expect(flash.message).toBeNull();

        }));

        it('should not unsubscribe subscribers when the directive scope is destroyed', inject(function ($rootScope, $compile, flash) {
            var template = [
                '<div flash-alert active-class="in" class="alert fade">',
                '<strong class="alert-heading">{{flash.type}}</strong>',
                '<span class="alert-message">{{flash.message}}</span>',
                '</div>'
            ];

            var element1 = angular.element(template.join('\n'));
            var element2 = angular.element(template.join('\n'));

            var $scope1 = $rootScope.$new();
            var $scope2 = $rootScope.$new();

            spyOn(flash, 'clean').andCallThrough();
            spyOn(flash, 'unsubscribe').andCallThrough();

            $compile(element1)($scope1);
            $compile(element2)($scope2);

            flash.success = ':success-message';

            $scope1.$digest();
            $scope2.$digest();

            $scope1.$destroy();

            flash.error = ':error-message';

            $scope1.$digest();
            $scope2.$digest();

            expect(flash.clean.calls.length).toEqual(1);
            expect(flash.unsubscribe.calls.length).toEqual(1);

            expect(element1.find('.alert-heading').text()).toBe('success');
            expect(element1.find('.alert-message').text()).toBe(':success-message');
            expect(element1.hasClass('alert-success')).toBe(true);
            expect(element1.hasClass('in')).toBe(true);

            expect(element2.find('.alert-heading').text()).toBe('error');
            expect(element2.find('.alert-message').text()).toBe(':error-message');
            expect(element2.hasClass('alert-error')).toBe(true);
            expect(element2.hasClass('alert-danger')).toBe(true);
            expect(element2.hasClass('in')).toBe(true);
        }));
    });


});

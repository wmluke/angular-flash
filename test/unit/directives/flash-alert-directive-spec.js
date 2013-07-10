describe('flash-alert-directive', function () {
    'use strict';

    beforeEach(module('angular-flash.service', 'angular-flash.flash-alert-directive'));


    it('should display all flash messages', inject(function ($rootScope, $compile, $timeout, flash) {

        var template = [
            '<div flash-alert active-class="in" class="alert fade" style="display: none;">',
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
        expect(element.hasClass('in')).toBe(false);

        flash.error = ':error-message';
        $rootScope.$digest();

        expect(element.find('.alert-heading').text()).toBe('error');
        expect(element.find('.alert-message').text()).toBe(':error-message');
        expect(element.hasClass('alert-error')).toBe(true);
        expect(element.hasClass('in')).toBe(true);

        $timeout.flush();

        expect(element.find('.alert-heading').text()).toBe('');
        expect(element.find('.alert-message').text()).toBe('');
        expect(element.hasClass('alert-error')).toBe(false);
        expect(element.hasClass('in')).toBe(false);

        flash.success = ':success-message';
        $rootScope.$digest();


        expect(element.find('.alert-heading').text()).toBe('success');
        expect(element.find('.alert-message').text()).toBe(':success-message');
        expect(element.hasClass('alert-success')).toBe(true);
        expect(element.hasClass('in')).toBe(true);

        $timeout.flush();

        expect(element.find('.alert-heading').text()).toBe('');
        expect(element.find('.alert-message').text()).toBe('');
        expect(element.hasClass('alert-success')).toBe(false);
        expect(element.hasClass('in')).toBe(false);

    }));

    it('should display only error flash messages', inject(function ($rootScope, $compile, $timeout, flash) {

        var template = [
            '<div flash-alert="error" active-class="in" class="alert fade" style="display: none;">',
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
        expect(element.hasClass('in')).toBe(false);

        flash.error = ':error-message';
        $rootScope.$digest();

        expect(element.find('.alert-heading').text()).toBe('error');
        expect(element.find('.alert-message').text()).toBe(':error-message');
        expect(element.hasClass('alert-error')).toBe(true);
        expect(element.hasClass('in')).toBe(true);

        $timeout.flush();

        expect(element.find('.alert-heading').text()).toBe('');
        expect(element.find('.alert-message').text()).toBe('');
        expect(element.hasClass('alert-error')).toBe(false);
        expect(element.hasClass('in')).toBe(false);

        flash.success = ':success-message';
        $rootScope.$digest();

        expect(element.find('.alert-heading').text()).toBe('');
        expect(element.find('.alert-message').text()).toBe('');
        expect(element.hasClass('alert-success')).toBe(false);
        expect(element.hasClass('in')).toBe(false);

    }));

    it('should only display the most recent flash message', inject(function ($rootScope, $compile, $timeout, flash) {
        var template = [
            '<div flash-alert active-class="in" class="alert fade" style="display: none;">',
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
        expect(element.hasClass('alert-success')).toBe(true);
        expect(element.hasClass('alert-info')).toBe(false);
        expect(element.hasClass('alert-warning')).toBe(false);
        expect(element.hasClass('in')).toBe(true);

        $timeout.flush();

        expect(element.find('.alert-heading').text()).toBe('');
        expect(element.find('.alert-message').text()).toBe('');
        expect(element.hasClass('alert-error')).toBe(false);
        expect(element.hasClass('alert-success')).toBe(false);
        expect(element.hasClass('alert-info')).toBe(false);
        expect(element.hasClass('alert-warning')).toBe(false);
        expect(element.hasClass('in')).toBe(false);

    }));

    it('should should display the error message even if the message was set before the directive subscribed', inject(function ($rootScope, $compile, $timeout, flash) {
        var template = [
            '<div flash-alert="error" active-class="in" class="alert fade" style="display: none;">',
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
        expect(element.hasClass('in')).toBe(true);
    }));

    it('should should display the any message even if the message was set before the directive subscribed', inject(function ($rootScope, $compile, $timeout, flash) {
        var template = [
            '<div flash-alert active-class="in" class="alert fade" style="display: none;">',
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
        expect(element.hasClass('in')).toBe(true);
    }));

    it('should display the error message even if the error message was not the last message', inject(function ($rootScope, $compile, $timeout, flash) {
        var template = [
            '<div flash-alert="error" active-class="in" class="alert fade" style="display: none;">',
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
        expect(element.hasClass('in')).toBe(true);
    }));

    it('should clean the flash service when the directive scope is destroyed', inject(function ($rootScope, $compile, $timeout, flash) {
        var template = [
            '<div flash-alert="error" active-class="in" class="alert fade" style="display: none;">',
            '<strong class="alert-heading">{{flash.type}}</strong>',
            '<span class="alert-message">{{flash.message}}</span>',
            '</div>'
        ];

        flash.error = ':error-message';
        flash.success = ':success-message';

        var element = angular.element(template.join('\n'));

        var $scope = $rootScope.$new();

        spyOn(flash, 'clean').andCallThrough();

        $compile(element)($scope);
        $scope.$digest();

        expect(element.find('.alert-heading').text()).toBe('error');
        expect(element.find('.alert-message').text()).toBe(':error-message');
        expect(element.hasClass('alert-error')).toBe(true);
        expect(element.hasClass('in')).toBe(true);

        $scope.$destroy();

        expect(flash.clean).toHaveBeenCalled();
        expect(flash.message).toBeNull();

    }));

});
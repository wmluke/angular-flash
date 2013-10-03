describe('FlashService', function () {
    'use strict';

    var _flash;

    beforeEach(module('angular-flash.service'));

    beforeEach(inject(function (flash) {
        _flash = flash;
    }));

    it('it should send flash messages to subscribers', function () {
        var subscriber1 = jasmine.createSpy('subscriber1');
        var subscriber2 = jasmine.createSpy('subscriber2');

        _flash.subscribe(subscriber1);
        _flash.subscribe(subscriber2);

        _flash.error = ':error-message';
        _flash.warn = ':warn-message';
        _flash.info = ':info-message';
        _flash.success = ':success-message';

        expect(subscriber1).toHaveBeenCalledWith(':error-message', 'error');
        expect(subscriber1).toHaveBeenCalledWith(':warn-message', 'warn');
        expect(subscriber1).toHaveBeenCalledWith(':info-message', 'info');
        expect(subscriber1).toHaveBeenCalledWith(':success-message', 'success');

        expect(subscriber2).toHaveBeenCalledWith(':error-message', 'error');
        expect(subscriber2).toHaveBeenCalledWith(':warn-message', 'warn');
        expect(subscriber2).toHaveBeenCalledWith(':info-message', 'info');
        expect(subscriber2).toHaveBeenCalledWith(':success-message', 'success');

    });

    it('it should send flash messages to subscribers of the right type of flash', function () {
        var errorSubscriber = jasmine.createSpy('errorSubscriber');
        var warnSubscriber = jasmine.createSpy('warnSubscriber');
        var infoSubscriber = jasmine.createSpy('infoSubscriber');
        var successSubscriber = jasmine.createSpy('successSubscriber');

        _flash.subscribe(errorSubscriber, 'error');
        _flash.subscribe(warnSubscriber, 'warn');
        _flash.subscribe(infoSubscriber, 'info');
        _flash.subscribe(successSubscriber, 'success');

        _flash.error = ':error-message';
        _flash.warn = ':warn-message';
        _flash.info = ':info-message';
        _flash.success = ':success-message';

        expect(errorSubscriber).toHaveBeenCalledWith(':error-message', 'error');
        expect(errorSubscriber.calls.length).toEqual(1);

        expect(warnSubscriber).toHaveBeenCalledWith(':warn-message', 'warn');
        expect(warnSubscriber.calls.length).toEqual(1);

        expect(infoSubscriber).toHaveBeenCalledWith(':info-message', 'info');
        expect(infoSubscriber.calls.length).toEqual(1);

        expect(successSubscriber).toHaveBeenCalledWith(':success-message', 'success');
        expect(successSubscriber.calls.length).toEqual(1);
    });

    it('it should send flash messages to the right subscribers', function () {
        var subscriber1 = jasmine.createSpy('subscriber1');
        var subscriber2 = jasmine.createSpy('subscriber2');

        _flash.subscribe(subscriber1, null, 'foo');
        _flash.subscribe(subscriber2, null, 'bar');

        _flash.to('foo').error = 'error 1';

        _flash.to('bar').error = 'error 2';

        _flash.error = ':error-message';

        expect(_flash.id).toBeNull();
        expect(_flash.to('foo').id).toEqual('foo');
        expect(_flash.to('bar').id).toEqual('bar');

        expect(subscriber1).toHaveBeenCalledWith('error 1', 'error');
        expect(subscriber1.calls.length).toEqual(1);

        expect(subscriber2).toHaveBeenCalledWith('error 2', 'error');
        expect(subscriber2.calls.length).toEqual(1);
    });

    it('the flash getters should return the right message', function () {
        _flash.error = ':error-message';
        _flash.warn = ':warn-message';
        _flash.info = ':info-message';
        _flash.success = ':success-message';

        expect(_flash.error).toBe(':error-message');
        expect(_flash.warn).toBe(':warn-message');
        expect(_flash.info).toBe(':info-message');
        expect(_flash.success).toBe(':success-message');
    });

    it('flash.type and flash.message should return the last flash', function () {
        _flash.error = ':error-message';
        _flash.warn = ':warn-message';

        expect(_flash.type).toBe('warn');
        expect(_flash.message).toBe(':warn-message');
    });

});

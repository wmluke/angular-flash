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

});
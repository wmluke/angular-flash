describe('startInterval', function () {
    'use strict';

    var _startInterval, $timeout;

    beforeEach(module('angular-common.interval-service'));

    beforeEach(inject(function (startInterval, _$timeout_) {
        _startInterval = startInterval;
        $timeout = _$timeout_;
    }));

    it('should create and start an interval', function () {
        var callback = jasmine.createSpy('callback');

        var interval = _startInterval(callback, 100);

        expect(interval.count).toBe(0);
        expect(interval.elapsed).toBe(0);

        $timeout.flush();
        expect(interval.count).toBe(1);
        expect(interval.elapsed).toBe(100);

        $timeout.flush();
        expect(interval.count).toBe(2);
        expect(interval.elapsed).toBe(200);

        $timeout.flush();
        expect(interval.count).toBe(3);
        expect(interval.elapsed).toBe(300);

        interval.run = false;

        $timeout.flush();
        expect(interval.count).toBe(3);
        expect(interval.elapsed).toBe(300);

        interval.run = true;

        $timeout.flush();
        expect(interval.count).toBe(4);
        expect(interval.elapsed).toBe(400);

        expect(callback).toHaveBeenCalledWith(0, 0);
        expect(callback).toHaveBeenCalledWith(1, 100);
        expect(callback).toHaveBeenCalledWith(2, 200);
        expect(callback).toHaveBeenCalledWith(3, 300);
    });


});
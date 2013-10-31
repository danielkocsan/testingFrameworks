/*global jasmine,describe,beforeEach,afterEach,it,expect,EventPublisher*/
describe(
    'eventPublisher',
    function () {
        var alphaInstanceUnderTest,
            bravoInstanceUnderTest,
            charlieInstanceUnderTest;

        beforeEach(function () {
            jasmine.Clock.useMock();
            alphaInstanceUnderTest = new EventPublisher('alphaModule');
            bravoInstanceUnderTest = new EventPublisher('bravoModule');
            charlieInstanceUnderTest = new EventPublisher('charlieModule');
        });

        afterEach(function () {
            alphaInstanceUnderTest = null;
            bravoInstanceUnderTest = null;
            charlieInstanceUnderTest = null;
        });

        it('calls the callback function when fired', function () {
            var eventName = 'testEventName',
                mySpy = jasmine.createSpy('mySpy');

            alphaInstanceUnderTest.subscribe(eventName, 'alphaModule', mySpy);

            alphaInstanceUnderTest.publish(eventName);
            jasmine.Clock.tick(1);
            expect(mySpy.calls.length).toEqual(1);
        });

        it('is able to specify subscribing to events by module names', function () {
            var eventName = 'testEvent',
                mySpy = jasmine.createSpy('mySpy');

            alphaInstanceUnderTest.subscribe(eventName, 'alphaModule', mySpy);

            alphaInstanceUnderTest.publish(eventName);
            bravoInstanceUnderTest.publish(eventName);
            jasmine.Clock.tick(1);
            expect(mySpy.calls.length).toEqual(1);
        });

        it('is able to subscribe to events by event name only', function () {
            var eventName = 'testEvent',
                mySpy = jasmine.createSpy('mySpy');

            alphaInstanceUnderTest.subscribe(eventName, null, mySpy);

            alphaInstanceUnderTest.publish(eventName);
            bravoInstanceUnderTest.publish(eventName);
            jasmine.Clock.tick(1);
            expect(mySpy.calls.length).toEqual(2);
        });

        it('is able to subscribe to events by module name only', function () {
            var eventName = 'testEvent',
                mySpy = jasmine.createSpy('mySpy');

            alphaInstanceUnderTest.subscribe(null, 'alphaModule', mySpy);

            alphaInstanceUnderTest.publish(eventName);
            bravoInstanceUnderTest.publish(eventName);
            jasmine.Clock.tick(1);
            expect(mySpy.calls.length).toEqual(1);
        });

        it('is able to subscribe multiple times to events', function () {
            var eventName = 'testEvent',
                mySpy = jasmine.createSpy('mySpy');

            alphaInstanceUnderTest.subscribe(eventName, null, mySpy);
            alphaInstanceUnderTest.subscribe(eventName, null, mySpy);
            bravoInstanceUnderTest.subscribe(eventName, null, mySpy);

            charlieInstanceUnderTest.publish(eventName);
            jasmine.Clock.tick(1);
            expect(mySpy.calls.length).toEqual(3);
        });

        it('should execute callback on publish', function () {
            var eventName = 'testEvent',
                mySpy = jasmine.createSpy('mySpy');

            alphaInstanceUnderTest.subscribe(eventName, 'charlieModule', function () {});

            charlieInstanceUnderTest.publish(eventName, mySpy);

            expect(mySpy.calls.length).toBe(0);
            jasmine.Clock.tick(1);
            expect(mySpy.calls.length).toBe(1);
        });

        it('should be asynchronous', function () {
            var eventName = 'testEvent',
                mySpy = jasmine.createSpy('mySpy');

            alphaInstanceUnderTest.subscribe(eventName, 'charlieModule', mySpy);

            charlieInstanceUnderTest.publish(eventName);

            expect(mySpy).not.toHaveBeenCalled();
            jasmine.Clock.tick(1);
            expect(mySpy).toHaveBeenCalled();
        });

        it('should pass moduleName to event handler',function(){
            var eventName = 'testEventName',
                mySpy = jasmine.createSpyObj('mySpy', ['myCallback']);

            alphaInstanceUnderTest.subscribe(eventName, 'charlieModule', mySpy.myCallback);

            charlieInstanceUnderTest.publish(eventName);

            jasmine.Clock.tick(1);
            expect(mySpy.myCallback).toHaveBeenCalledWith('charlieModule');

        });
    }
);
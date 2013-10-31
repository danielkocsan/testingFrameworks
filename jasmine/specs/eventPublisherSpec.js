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
                mySpy = jasmine.createSpy('mySpy');

            alphaInstanceUnderTest.subscribe(eventName, 'charlieModule', mySpy);
            charlieInstanceUnderTest.publish(eventName);
            jasmine.Clock.tick(1);
            expect(mySpy.mostRecentCall.args[0]).toEqual('charlieModule');

        });

        it('should pass eventName to event handler',function(){
            var eventName = 'testEventName',
                mySpy = jasmine.createSpy('mySpy');

            alphaInstanceUnderTest.subscribe(eventName, 'charlieModule', mySpy);
            charlieInstanceUnderTest.publish(eventName);
            jasmine.Clock.tick(1);
            expect(mySpy.mostRecentCall.args[1]).toEqual('testEventName');

        });

        it('should pass additional parameters to event handler',function(){
            var eventName = 'testEventName',
                mySpy = jasmine.createSpy('mySpy');

            alphaInstanceUnderTest.subscribe(eventName, 'charlieModule', mySpy);
            charlieInstanceUnderTest.publish(eventName,'param1','param2','param3');
            jasmine.Clock.tick(1);
            expect(mySpy.mostRecentCall.args[2]).toEqual('param1');
            expect(mySpy.mostRecentCall.args[3]).toEqual('param2');
            expect(mySpy.mostRecentCall.args[4]).toEqual('param3');

        });

        it('should not call event handlers on unsubscribed modules',function(){
            var eventName = 'testEventName',
                mySpy = jasmine.createSpy('mySpy');

            alphaInstanceUnderTest.subscribe(eventName, 'charlieModule', mySpy);
            alphaInstanceUnderTest.subscribe(eventName, 'charlieModule', mySpy);
            charlieInstanceUnderTest.publish(eventName);
            jasmine.Clock.tick(1);
            expect(mySpy.calls.length).toBe(2);

            alphaInstanceUnderTest.unsubscribe(eventName, 'charlieModule');
            charlieInstanceUnderTest.publish(eventName);
            jasmine.Clock.tick(1);
            expect(mySpy.calls.length).toBe(2);
        });
    }
);
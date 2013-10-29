/*global jasmine,describe,beforeEach,afterEach,it,expect,EventPublisher*/
describe(
    'eventPublisher tests',
    function () {
        var alphaInstanceUnderTest,
            bravoInstanceUnderTest,
            charlieInstanceUnderTest;

        beforeEach(
            function () {
                alphaInstanceUnderTest = new EventPublisher('alphaModule');
                bravoInstanceUnderTest = new EventPublisher('bravoModule');
                charlieInstanceUnderTest = new EventPublisher('charlieModule');
            }
        );

        afterEach(
            function () {
                alphaInstanceUnderTest = null;
                bravoInstanceUnderTest = null;
                charlieInstanceUnderTest = null;
            }
        );

        it(
            'calls the callback function when fired',
            function () {
                var eventName = 'testEventName',
                    mySpy = jasmine.createSpyObj('mySpy', ['myCallback']);

                alphaInstanceUnderTest.subscribe(eventName, 'alphaModule', mySpy.myCallback);

                alphaInstanceUnderTest.publish(eventName);

                expect(mySpy.myCallback).toHaveBeenCalled();
            }
        );

        it(
            'is able to specify subscribing to events by module names',
            function () {
                var eventName = 'testEvent',
                    mySpy = jasmine.createSpyObj('mySpy', ['myCallback']);

                alphaInstanceUnderTest.subscribe(eventName, 'alphaModule', mySpy.myCallback);

                alphaInstanceUnderTest.publish(eventName);
                bravoInstanceUnderTest.publish(eventName);

                expect(mySpy.myCallback.calls.length).toEqual(1);
            }
        );

        it(
            'is able to subscribe to events by event name only',
            function () {
                var eventName = 'testEvent',
                    mySpy = jasmine.createSpyObj('mySpy', ['myCallback']);

                alphaInstanceUnderTest.subscribe(eventName, null, mySpy.myCallback);

                alphaInstanceUnderTest.publish(eventName);
                bravoInstanceUnderTest.publish(eventName);

                expect(mySpy.myCallback.calls.length).toEqual(2);
            }
        );

        it(
            'is able to subscribe to events by module name only',
            function () {
                var eventName = 'testEvent',
                    mySpy = jasmine.createSpyObj('mySpy', ['myCallback']);

                alphaInstanceUnderTest.subscribe(null, 'alphaModule', mySpy.myCallback);

                alphaInstanceUnderTest.publish(eventName);
                bravoInstanceUnderTest.publish(eventName);

                expect(mySpy.myCallback.calls.length).toEqual(1);
            }
        );

        it(
            'is able to subscribe multiple times to events',
            function () {
                var eventName = 'testEvent',
                    mySpy = jasmine.createSpyObj('mySpy', ['myCallback']);

                alphaInstanceUnderTest.subscribe(eventName, null, mySpy.myCallback);
                alphaInstanceUnderTest.subscribe(eventName, null, mySpy.myCallback);
                bravoInstanceUnderTest.subscribe(eventName, null, mySpy.myCallback);

                charlieInstanceUnderTest.publish(eventName);

                expect(mySpy.myCallback.calls.length).toEqual(2);
            }
        );
    }
);
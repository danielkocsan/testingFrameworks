/*global jasmine,describe,beforeEach,afterEach,it,expect,EventPublisher*/
describe(
    'eventPublisher',
    function () {
        var alphaInstanceUnderTest,
            bravoInstanceUnderTest,
            charlieInstanceUnderTest;

        beforeEach(function () {
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
                mySpy = jasmine.createSpyObj('mySpy', ['myCallback']);

            alphaInstanceUnderTest.subscribe(eventName, 'alphaModule', mySpy.myCallback);

            alphaInstanceUnderTest.publish(eventName, function () {
                expect(mySpy.myCallback).toHaveBeenCalled();
            });
        });

        it('is able to specify subscribing to events by module names', function () {
            var eventName = 'testEvent',
                mySpy = jasmine.createSpyObj('mySpy', ['myCallback'])
            cb = function () {
                expect(mySpy.myCallback.calls.length).toEqual(1);
            };

            alphaInstanceUnderTest.subscribe(eventName, 'alphaModule', mySpy.myCallback);

            alphaInstanceUnderTest.publish(eventName, cb);
            bravoInstanceUnderTest.publish(eventName, cb);
        });

        it('is able to subscribe to events by event name only', function () {
            var eventName = 'testEvent',
                mySpy = jasmine.createSpyObj('mySpy', ['myCallback']),
                cb = function(){
                    expect(mySpy.myCallback.calls.length).toEqual(2);
                };

            alphaInstanceUnderTest.subscribe(eventName, null, mySpy.myCallback);

            alphaInstanceUnderTest.publish(eventName,cb);
            bravoInstanceUnderTest.publish(eventName,cb);
        });

        it('is able to subscribe to events by module name only', function () {
            var eventName = 'testEvent',
                mySpy = jasmine.createSpyObj('mySpy', ['myCallback']),
                cb = function(){
                    expect(mySpy.myCallback.calls.length).toEqual(1);
                };

            alphaInstanceUnderTest.subscribe(null, 'alphaModule', mySpy.myCallback);

            alphaInstanceUnderTest.publish(eventName,cb);
            bravoInstanceUnderTest.publish(eventName,cb);
        });

        it('is able to subscribe multiple times to events', function () {
            var eventName = 'testEvent',
                mySpy = jasmine.createSpyObj('mySpy', ['myCallback']);

            alphaInstanceUnderTest.subscribe(eventName, null, mySpy.myCallback);
            alphaInstanceUnderTest.subscribe(eventName, null, mySpy.myCallback);
            bravoInstanceUnderTest.subscribe(eventName, null, mySpy.myCallback);

            charlieInstanceUnderTest.publish(eventName, function () {
                expect(mySpy.myCallback.calls.length).toEqual(3);
            });
        });

        it('should execute callback on publish', function () {
            var eventName = 'testEvent',
                callBackExecuted = false;

            alphaInstanceUnderTest.subscribe(eventName, 'alphaModule', function () {
            });

            alphaInstanceUnderTest.publish(eventName, function () {
                callBackExecuted = true;
            });

            setTimeout(function () {
                expect(callBackExecuted).toBeTruthy();
            }, 10);
        });

        it('should be asynchronous', function () {
            var eventName = 'testEvent',
                mySpy = jasmine.createSpyObj('mySpy', ['myCallback']);

            alphaInstanceUnderTest.subscribe(eventName, null, mySpy.myCallback);
            alphaInstanceUnderTest.subscribe(eventName, null, mySpy.myCallback);
            bravoInstanceUnderTest.subscribe(eventName, null, mySpy.myCallback);

            charlieInstanceUnderTest.publish(eventName);

            expect(mySpy.myCallback.calls.length).toBeLessThan(3);
        });
    }
);
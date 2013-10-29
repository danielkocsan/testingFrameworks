/*global jasmine,describe,beforeEach,afterEach,it,expect, MyModule*/
describe(
    'This is my test suite',
    function () {
        var instanceUnderTest;

        instanceUnderTest = new MyModule();

        it(
            'must work',
            function () {
                instanceUnderTest.myMethod();
            }
        );
    }
);
describe(
    'This is my test suite',
    function () {
        var instanceUnderTest;

        instanceUnderTest = new myModule();

        it(
            'musts work',
            function () {
                instanceUnderTest.myMethod();
            }
        );
    }
);
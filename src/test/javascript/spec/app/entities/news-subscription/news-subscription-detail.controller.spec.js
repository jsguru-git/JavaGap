'use strict';

describe('Controller Tests', function() {

    describe('NewsSubscription Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockNewsSubscription;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockNewsSubscription = jasmine.createSpy('MockNewsSubscription');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'NewsSubscription': MockNewsSubscription
            };
            createController = function() {
                $injector.get('$controller')("NewsSubscriptionDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'javagapApp:newsSubscriptionUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});

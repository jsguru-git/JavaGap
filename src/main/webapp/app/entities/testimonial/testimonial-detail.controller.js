(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('TestimonialDetailController', TestimonialDetailController);

    TestimonialDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Testimonial'];

    function TestimonialDetailController($scope, $rootScope, $stateParams, previousState, entity, Testimonial) {
        var vm = this;

        vm.testimonial = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('javagapApp:testimonialUpdate', function(event, result) {
            vm.testimonial = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();

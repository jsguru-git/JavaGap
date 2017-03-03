(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('TestimonialController', TestimonialController);

    TestimonialController.$inject = ['$scope', '$state', 'Testimonial'];

    function TestimonialController ($scope, $state, Testimonial) {
        var vm = this;

        vm.testimonials = [];

        loadAll();

        function loadAll() {
            Testimonial.query(function(result) {
                vm.testimonials = result;
                vm.searchQuery = null;
            });
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('TestimonialDeleteController',TestimonialDeleteController);

    TestimonialDeleteController.$inject = ['$uibModalInstance', 'entity', 'Testimonial'];

    function TestimonialDeleteController($uibModalInstance, entity, Testimonial) {
        var vm = this;

        vm.testimonial = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Testimonial.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();

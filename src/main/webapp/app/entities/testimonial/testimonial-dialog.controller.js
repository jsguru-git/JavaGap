(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('TestimonialDialogController', TestimonialDialogController);

    TestimonialDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Testimonial'];

    function TestimonialDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Testimonial) {
        var vm = this;

        vm.testimonial = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.testimonial.id !== null) {
                Testimonial.update(vm.testimonial, onSaveSuccess, onSaveError);
            } else {
                Testimonial.save(vm.testimonial, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('javagapApp:testimonialUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.createdOn = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();

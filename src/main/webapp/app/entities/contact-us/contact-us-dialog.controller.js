(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('ContactUsDialogController', ContactUsDialogController);

    ContactUsDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'ContactUs'];

    function ContactUsDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, ContactUs) {
        var vm = this;

        vm.contactUs = entity;
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
            if (vm.contactUs.id !== null) {
                ContactUs.update(vm.contactUs, onSaveSuccess, onSaveError);
            } else {
                ContactUs.save(vm.contactUs, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('javagapApp:contactUsUpdate', result);
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

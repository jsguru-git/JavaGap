(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('ContactUsDeleteController',ContactUsDeleteController);

    ContactUsDeleteController.$inject = ['$uibModalInstance', 'entity', 'ContactUs'];

    function ContactUsDeleteController($uibModalInstance, entity, ContactUs) {
        var vm = this;

        vm.contactUs = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            ContactUs.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();

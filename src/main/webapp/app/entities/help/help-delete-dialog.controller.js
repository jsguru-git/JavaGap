(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('HelpDeleteController',HelpDeleteController);

    HelpDeleteController.$inject = ['$uibModalInstance', 'entity', 'Help'];

    function HelpDeleteController($uibModalInstance, entity, Help) {
        var vm = this;

        vm.help = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Help.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('DisableLoggedUserPopupController', DisableLoggedUserPopupController);

    DisableLoggedUserPopupController.$inject = ['$uibModalInstance', 'entity', 'Auth', '$window', 'DisableLoggedUser'];

    function DisableLoggedUserPopupController ($uibModalInstance, entity, Auth, $window, DisableLoggedUser) {
        var vm = this;

        vm.user = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (login) {
            DisableLoggedUser.disable({},
                function () {
                    $uibModalInstance.close(true);
                    Auth.logout();
                    $window.location.href = '';
                });
        }
    }
})();

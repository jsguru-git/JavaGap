(function() {
    'use strict';

    angular
        .module('javagapApp')
        .factory('DisableLoggedUserPopupService',['$uibModal', 'Principal', function($uibModal, Principal){
            var service = {
                open: open
            };

            var currentAccount = null;
            Principal.identity().then(function(account) {
                currentAccount = account;
            });
            var modalInstance = null;
            var resetModal = function () {
                modalInstance = null;
            };

            return service;

            function open () {
                if (modalInstance !== null) return;
                modalInstance = $uibModal.open({
                    templateUrl: 'app/components/disable-logged-user-popup/disable-logged-user-popup.html',
                    controller: 'DisableLoggedUserPopupController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        // entity: ['User', function(User) {
                        //     return User.get({login : currentAccount.login});
                        // }]
                        entity: currentAccount
                    }
                });
                modalInstance.result.then(
                    resetModal,
                    resetModal
                );
            }
        }]);
})();

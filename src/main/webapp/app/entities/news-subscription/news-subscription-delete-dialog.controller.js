(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('NewsSubscriptionDeleteController',NewsSubscriptionDeleteController);

    NewsSubscriptionDeleteController.$inject = ['$uibModalInstance', 'entity', 'NewsSubscription'];

    function NewsSubscriptionDeleteController($uibModalInstance, entity, NewsSubscription) {
        var vm = this;

        vm.newsSubscription = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            NewsSubscription.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();

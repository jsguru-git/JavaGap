(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('NewsSubscriptionController', NewsSubscriptionController);

    NewsSubscriptionController.$inject = ['$scope', '$state', 'NewsSubscription'];

    function NewsSubscriptionController ($scope, $state, NewsSubscription) {
        var vm = this;

        vm.newsSubscriptions = [];

        loadAll();

        function loadAll() {
            NewsSubscription.query(function(result) {
                vm.newsSubscriptions = result;
                vm.searchQuery = null;
            });
        }
    }
})();

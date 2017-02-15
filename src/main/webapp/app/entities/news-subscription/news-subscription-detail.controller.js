(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('NewsSubscriptionDetailController', NewsSubscriptionDetailController);

    NewsSubscriptionDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'NewsSubscription'];

    function NewsSubscriptionDetailController($scope, $rootScope, $stateParams, previousState, entity, NewsSubscription) {
        var vm = this;

        vm.newsSubscription = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('javagapApp:newsSubscriptionUpdate', function(event, result) {
            vm.newsSubscription = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();

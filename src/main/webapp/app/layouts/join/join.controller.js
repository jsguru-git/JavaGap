(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('JoinController', JoinController);

    JoinController.$inject = ['$scope', 'NewsSubscription'];

    function JoinController ($scope, NewsSubscription) {
        var vm = this;
        vm.save = save;
        
        vm.joinInfo = new NewsSubscription();

        function onSaveSuccess (result) {
            $scope.$emit('javagapApp:newsSubscriptionUpdate', result);  
        }

        function onSaveError () {
        }

        function save () {
            NewsSubscription.save(vm.joinInfo, onSaveSuccess, onSaveError);
        }
    }
})();

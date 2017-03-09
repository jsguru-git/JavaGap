(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('JoinSectionController', JoinSectionController);

    JoinSectionController.$inject = ['$scope', 'NewsSubscription'];

    function JoinSectionController ($scope, NewsSubscription) {
        var vm = this;
        vm.save = save;
        
        vm.joinInfo = null;

        function onSaveSuccess (result) {
            alertify.notify('New Subscription is created', 'success', 5, function(){  console.log('success'); });
        }

        function onSaveError () {
            alertify.notify('New Subscription failed. Try again later', 'error', 5, function(){  console.log('failed'); });
        }

        function save () {
            NewsSubscription.save(vm.joinInfo, onSaveSuccess, onSaveError);
        }
    }
})();

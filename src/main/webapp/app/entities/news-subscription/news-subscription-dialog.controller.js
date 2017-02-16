(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('NewsSubscriptionDialogController', NewsSubscriptionDialogController);

    NewsSubscriptionDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'NewsSubscription'];

    function NewsSubscriptionDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, NewsSubscription) {
        var vm = this;

        vm.newsSubscription = entity;
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
            if (vm.newsSubscription.id !== null) {
                NewsSubscription.update(vm.newsSubscription, onSaveSuccess, onSaveError);
            } else {
                NewsSubscription.save(vm.newsSubscription, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('javagapApp:newsSubscriptionUpdate', result);
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

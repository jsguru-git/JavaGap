(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('NewsDialogController', NewsDialogController);

    NewsDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'News'];

    function NewsDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, News) {
        var vm = this;

        vm.news = entity;
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
            if (vm.news.id !== null) {
                News.update(vm.news, onSaveSuccess, onSaveError);
            } else {
                News.save(vm.news, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('javagapApp:newsUpdate', result);
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

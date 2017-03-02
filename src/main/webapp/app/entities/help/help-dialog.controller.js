(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('HelpDialogController', HelpDialogController);

    HelpDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Help'];

    function HelpDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Help) {
        var vm = this;

        vm.help = entity;
        vm.clear = clear;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.help.id !== null) {
                Help.update(vm.help, onSaveSuccess, onSaveError);
            } else {
                Help.save(vm.help, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('javagapApp:helpUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();

(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('ReportIssuePopupController', ReportIssuePopupController);

    ReportIssuePopupController.$inject = ['$scope', '$window', '$state', '$timeout', '$uibModalInstance', 'ReportIssue'];

    function ReportIssuePopupController ($scope, $window, $state, $timeout, $uibModalInstance, ReportIssue) {
        var vm = this;

        vm.submitError = false;
        vm.save = save;
        vm.cancel = cancel;
        vm.reportIssueInfo = new ReportIssue();

        $timeout(function (){angular.element('#fullName').focus();});

        function cancel () {
            $uibModalInstance.dismiss('cancel');
        }

        function onSaveSuccess (result) {
            vm.submitError = false;
            alertify.notify('New report is created', 'success', 5, function(){  console.log('dismissed'); });
        }

        function onSaveError () {
            vm.submitError = true;
            alertify.notify('New report failed. Try again after login', 'error', 5, function(){  console.log('dismissed'); });
        }

        function save () {
            ReportIssue.save(vm.reportIssueInfo, onSaveSuccess, onSaveError);
        }
    }
})();

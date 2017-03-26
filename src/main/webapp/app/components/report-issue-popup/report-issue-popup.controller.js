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
        vm.reportIssueInfo = null;

        $timeout(function (){angular.element('#fullName').focus();});

        function cancel () {
            $uibModalInstance.dismiss('cancel');
        }

        function onSaveSuccess (result) {
            vm.submitError = false;
            alertify.notify('New issue report is created', 'success', 5, function(){  console.log('success'); });
            $uibModalInstance.close(true);
        }

        function onSaveError () {
            vm.submitError = true;
            alertify.notify('New issue report failed. Try again later', 'error', 5, function(){  console.log('failed'); });
        }

        function save () {
            ReportIssue.save(vm.reportIssueInfo, onSaveSuccess, onSaveError);
        }
    }
})();

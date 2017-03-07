(function() {
    'use strict';

    angular
        .module('javagapApp')
        .factory('ReportIssuePopupService', ReportIssuePopupService);

    ReportIssuePopupService.$inject = ['$uibModal'];

    function ReportIssuePopupService ($uibModal) {
        var service = {
            open: open
        };

        var modalInstance = null;
        var resetModal = function () {
            modalInstance = null;
        };

        return service;

        function open () {
            if (modalInstance !== null) return;
            modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/components/report-issue-popup/report-issue-popup.html',
                controller: 'ReportIssuePopupController',
                controllerAs: 'vm',
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('login');
                        return $translate.refresh();
                    }]
                }
            });
            modalInstance.result.then(
                resetModal,
                resetModal
            );
        }
    }
})();

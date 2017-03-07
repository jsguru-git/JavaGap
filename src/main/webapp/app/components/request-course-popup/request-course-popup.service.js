(function() {
    'use strict';

    angular
        .module('javagapApp')
        .factory('RequestCoursePopupService', RequestCoursePopupService);

    RequestCoursePopupService.$inject = ['$uibModal'];

    function RequestCoursePopupService ($uibModal) {
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
                templateUrl: 'app/components/request-course-popup/request-course-popup.html',
                controller: 'RequestCoursePopupController',
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

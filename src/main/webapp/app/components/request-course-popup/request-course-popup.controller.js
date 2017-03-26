(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('RequestCoursePopupController', RequestCoursePopupController);

    RequestCoursePopupController.$inject = ['$scope', '$window', '$state', '$timeout', '$uibModalInstance', 'RequestCourse'];

    function RequestCoursePopupController ($scope, $window, $state, $timeout, $uibModalInstance, RequestCourse) {
        var vm = this;

        vm.submitError = false;
        vm.save = save;
        vm.cancel = cancel;
        vm.requestCourseInfo = null;

        $timeout(function (){angular.element('#fullName').focus();});

        function cancel () {
            $uibModalInstance.dismiss('cancel');
        }

        function onSaveSuccess (result) {
            vm.submitError = false;
            alertify.notify('New course request is created', 'success', 5, function(){  console.log('success'); });
            $uibModalInstance.close(true);
        }

        function onSaveError () {
            vm.submitError = true;
            alertify.notify('New course request failed. Try again later', 'error', 5, function(){  console.log('failed'); });
        }

        function save () {
            RequestCourse.save(vm.requestCourseInfo, onSaveSuccess, onSaveError);
        }
    }
})();

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
        vm.requestCourseInfo = new RequestCourse();

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
            RequestCourse.save(vm.requestCourseInfo, onSaveSuccess, onSaveError);
        }
    }
})();

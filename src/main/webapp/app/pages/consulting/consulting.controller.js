(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('ConsultingController', ConsultingController);

    ConsultingController.$inject = ['$scope', 'Consult'];

    function ConsultingController ($scope, Consult) {
        var vm = this;
        vm.save = save;

        vm.contactInfo = null;

        function onSaveSuccess (result) {
            alertify.notify('New Subscription is created', 'success', 5, function(){  console.log('success'); });
        }

        function onSaveError () {
            alertify.notify('New Subscription failed. Try again later', 'error', 5, function(){  console.log('failed'); });
        }

        function save () {
            Consult.save(vm.contactInfo, onSaveSuccess, onSaveError);
        }

    }
})();
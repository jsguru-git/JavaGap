(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('ContactSectionController', ContactSectionController);

    ContactSectionController.$inject = ['$scope', 'ContactUs'];

    function ContactSectionController ($scope, ContactUs) {
        var vm = this;
        vm.save = save;

        vm.contactInfo = null;

        function onSaveSuccess (result) {
            alertify.notify('New Contact is created', 'success', 5, function(){  console.log('success'); });
        }

        function onSaveError () {
            alertify.notify('New Contact failed. Try again later', 'error', 5, function(){  console.log('failed'); });
        }

        function save () {
            ContactUs.save(vm.contactInfo, onSaveSuccess, onSaveError);
        }

    }
})();

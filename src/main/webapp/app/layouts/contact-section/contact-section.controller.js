(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('ContactSectionController', ContactSectionController);

    ContactSectionController.$inject = ['$scope', 'ContactUs'];

    function ContactSectionController ($scope, ContactUs) {
        var vm = this;
        vm.save = save;

        vm.contactInfo = new ContactUs();

        function onSaveSuccess (result) {
            alertify.notify('New Contact is created', 'success', 5, function(){  console.log('dismissed'); });
        }

        function onSaveError () {
            alertify.notify('New Contact failed. Try again after login', 'error', 5, function(){  console.log('dismissed'); });
        }

        function save () {
            ContactUs.save(vm.contactInfo, onSaveSuccess, onSaveError);
        }

    }
})();

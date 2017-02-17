(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('ContactController', ContactController);

    ContactController.$inject = ['$scope', 'ContactUs'];

    function ContactController ($scope, ContactUs) {
        var vm = this;
        vm.save = save;

        vm.contactInfo = new ContactUs();

        function onSaveSuccess (result) {
            $scope.$emit('javagapApp:contactUsUpdate', result);
        }

        function onSaveError () {
        }

        function save () {

            ContactUs.save(vm.contactInfo, onSaveSuccess, onSaveError);
        }

    }
})();

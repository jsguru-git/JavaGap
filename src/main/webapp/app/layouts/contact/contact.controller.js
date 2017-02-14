(function() {
    'use strict';

    angular
        .module('javagapApp')
        .factory('Contact', Contact)
        .controller('ContactController', ContactController);

    Contact.$inject = ['$resource'];

    function Contact ($resource) {
        return $resource('api/contactus/:id');
    }

    ContactController.$inject = ['Contact'];

    function ContactController (Contact) {
        var vm = this;

        vm.save = save;

        vm.contactInfo = new Contact();

        function onSaveSuccess (result) {
            alert('contact success');
        }

        function onSaveError () {
            alert('contact failure');
        }

        function save () {
            Contact.save(vm.contactInfo, onSaveSuccess, onSaveError);
        }

    }
})();

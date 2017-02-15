(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('ContactUsController', ContactUsController);

    ContactUsController.$inject = ['$scope', '$state', 'ContactUs'];

    function ContactUsController ($scope, $state, ContactUs) {
        var vm = this;

        vm.contactus = [];

        loadAll();

        function loadAll() {
            ContactUs.query(function(result) {
                vm.contactus = result;
                vm.searchQuery = null;
            });
        }
    }
})();

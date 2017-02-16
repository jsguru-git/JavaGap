(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('ContactUsController', ContactUsController);

    ContactUsController.$inject = ['$scope', '$state', 'ContactUs'];

    function ContactUsController ($scope, $state, ContactUs) {
        var vm = this;

        vm.contactuses = [];

        loadAll();

        function loadAll() {
            ContactUs.query(function(result) {
                vm.contactuses = result;
                vm.searchQuery = null;
            });
        }
    }
})();

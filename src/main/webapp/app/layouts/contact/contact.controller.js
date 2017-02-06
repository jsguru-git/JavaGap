(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('ContactController', ContactController);

    ContactController.$inject = ['RegisterformService'];

    function ContactController (RegisterformService) {
        var vm = this;
        vm.isNavbarCollapsed = true;

        vm.register = register;
        vm.toggleNavbar = toggleNavbar;
        vm.collapseNavbar = collapseNavbar;
        
        function register() {
            collapseNavbar();
            RegisterformService.open();
        }

        function toggleNavbar() {
            vm.isNavbarCollapsed = !vm.isNavbarCollapsed;
        }

        function collapseNavbar() {
            vm.isNavbarCollapsed = true;
        }
    }
})();

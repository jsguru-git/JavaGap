(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('BannerController', BannerController);

    BannerController.$inject = ['RegisterformService', 'Principal'];

    function BannerController (RegisterformService, Principal) {
        var vm = this;

        vm.register = register;
        vm.isAuthenticated = Principal.isAuthenticated;
        
        function register() {
            var isAuthenticated = vm.isAuthenticated();
            if(!isAuthenticated) {
                RegisterformService.open();    
            }
        }
    }
})();

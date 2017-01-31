(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('BannerController', BannerController);

    BannerController.$inject = ['RegisterformService'];

    function BannerController (RegisterformService) {
        var vm = this;

        vm.register = register;
        
        function register() {
            RegisterformService.open();
        }
    }
})();

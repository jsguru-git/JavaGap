(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('HelpController', HelpController);

    HelpController.$inject = ['$scope', '$state', 'Help'];

    function HelpController ($scope, $state, Help) {
        var vm = this;

        vm.helps = [];

        loadAll();

        function loadAll() {
            Help.query(function(result) {
                vm.helps = result;
                vm.searchQuery = null;
            });
        }
    }
})();

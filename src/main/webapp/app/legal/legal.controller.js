(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('LegalController', LegalController);

    LegalController.$inject = ['$state', 'target'];

    function LegalController ($state, target) {
        var vm = this;
        this.target = target;
    }
})();

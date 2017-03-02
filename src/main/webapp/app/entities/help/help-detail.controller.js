(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('HelpDetailController', HelpDetailController);

    HelpDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Help'];

    function HelpDetailController($scope, $rootScope, $stateParams, previousState, entity, Help) {
        var vm = this;

        vm.help = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('javagapApp:helpUpdate', function(event, result) {
            vm.help = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();

(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('tac', {
            parent: 'entity',
            url: '/tac',
            data: {
                
            },
            views: {
                'content': {
                    templateUrl: 'app/entities/TAC/tac.html',
                    controller: 'TacController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
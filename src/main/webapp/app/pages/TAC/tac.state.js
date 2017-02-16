(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('tac', {
            parent: 'pages',
            url: '/tac',
            data: {
                
            },
            views: {
                'content': {
                    templateUrl: 'app/pages/TAC/tac.html',
                    controller: 'TacController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
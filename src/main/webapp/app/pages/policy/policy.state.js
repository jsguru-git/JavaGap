(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('policy', {
            parent: 'pages',
            url: '/policy',
            data: {
                
            },
            views: {
                'content': {
                    templateUrl: 'app/pages/policy/policy.html',
                    controller: 'PolicyController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('policy', {
            parent: 'entity',
            url: '/policy',
            data: {
                
            },
            views: {
                'content': {
                    templateUrl: 'app/entities/policy/policy.html',
                    controller: 'PolicyController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
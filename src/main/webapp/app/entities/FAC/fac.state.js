(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('fac', {
            parent: 'entity',
            url: '/fac',
            data: {
                
            },
            views: {
                'content': {
                    templateUrl: 'app/entities/FAC/fac.html',
                    controller: 'FacController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
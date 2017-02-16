(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('fac', {
            parent: 'pages',
            url: '/fac',
            data: {
                
            },
            views: {
                'content': {
                    templateUrl: 'app/pages/FAC/fac.html',
                    controller: 'FacController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
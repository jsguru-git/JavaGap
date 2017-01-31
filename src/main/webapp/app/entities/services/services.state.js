(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('services', {
            parent: 'entity',
            url: '/services',
            data: {
                
            },
            views: {
                'content': {
                    templateUrl: 'app/entities/services/services.html',
                    controller: 'ServicesController',
                    controllerAs: 'vm'
                }
            }
            // ,
            // resolve: {
            //     translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
            //         //$translatePartialLoader.addPart('about');
            //         return $translate.refresh();
            //     }]
            // }
        });
    }
})();
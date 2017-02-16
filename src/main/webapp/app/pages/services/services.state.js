(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('services', {
            parent: 'pages',
            url: '/services',
            data: {
                
            },
            views: {
                'content': {
                    templateUrl: 'app/pages/services/services.html',
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
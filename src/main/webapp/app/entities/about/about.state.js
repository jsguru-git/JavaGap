(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('about', {
            parent: 'entity',
            url: '/aboutus',
            data: {
                
            },
            views: {
                'content': {
                    templateUrl: 'app/entities/about/about.html',
                    controller: 'AboutController',
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
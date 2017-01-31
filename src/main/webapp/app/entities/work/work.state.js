(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('work', {
            parent: 'entity',
            url: '/works',
            data: {
                
            },
            views: {
                'content': {
                    templateUrl: 'app/entities/work/work.html',
                    controller: 'WorkController',
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
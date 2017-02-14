(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('careers', {
            parent: 'entity',
            url: '/careers',
            data: {
                
            },
            views: {
                'content': {
                    templateUrl: 'app/entities/careers/careers.html',
                    controller: 'CareersController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
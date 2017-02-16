(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('careers', {
            parent: 'pages',
            url: '/careers',
            data: {
                
            },
            views: {
                'content': {
                    templateUrl: 'app/pages/careers/careers.html',
                    controller: 'CareersController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('copyright', {
            parent: 'pages',
            url: '/copyright',
            data: {
                
            },
            views: {
                'content': {
                    templateUrl: 'app/pages/copyright/copyright.html',
                    controller: 'CopyrightController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
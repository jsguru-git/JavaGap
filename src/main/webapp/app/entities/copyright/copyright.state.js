(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('copyright', {
            parent: 'entity',
            url: '/copyright',
            data: {
                
            },
            views: {
                'content': {
                    templateUrl: 'app/entities/copyright/copyright.html',
                    controller: 'CopyrightController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
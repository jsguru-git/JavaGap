(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('help', {
            parent: 'entity',
            url: '/help',
            data: {
                
            },
            views: {
                'content': {
                    templateUrl: 'app/entities/help/help.html',
                    controller: 'HelpController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('cs', {
            parent: 'entity',
            url: '/cs',
            data: {
                
            },
            views: {
                'content': {
                    templateUrl: 'app/entities/CS/cs.html',
                    controller: 'CsController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('cs', {
            parent: 'pages',
            url: '/cs',
            data: {
                
            },
            views: {
                'content': {
                    templateUrl: 'app/pages/CS/cs.html',
                    controller: 'CsController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
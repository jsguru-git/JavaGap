(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('work', {
            parent: 'pages',
            url: '/works',
            data: {
                
            },
            views: {
                'content': {
                    templateUrl: 'app/pages/work/work.html',
                    controller: 'WorkController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('consulting', {
            parent: 'pages',
            url: '/consulting',
            data: {
                
            },
            views: {
                'content': {
                    templateUrl: 'app/pages/consulting/consulting.html',
                    controller: 'ConsultingController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
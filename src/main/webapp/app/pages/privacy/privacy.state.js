(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('privacy', {
            parent: 'pages',
            url: '/privacy',
            data: {
                
            },
            views: {
                'content': {
                    templateUrl: 'app/pages/privacy/privacy.html',
                    controller: 'PrivacyController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
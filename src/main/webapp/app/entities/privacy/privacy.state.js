(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('privacy', {
            parent: 'entity',
            url: '/privacy',
            data: {
                
            },
            views: {
                'content': {
                    templateUrl: 'app/entities/privacy/privacy.html',
                    controller: 'PrivacyController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
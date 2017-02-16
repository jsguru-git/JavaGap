(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('help', {
            parent: 'pages',
            url: '/help',
            data: {
                
            },
            views: {
                'content': {
                    templateUrl: 'app/pages/help/help.html',
                    controller: 'HelpController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
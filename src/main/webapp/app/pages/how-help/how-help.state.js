(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('how-help', {
            parent: 'pages',
            url: '/how-help',
            data: {
                
            },
            views: {
                'content': {
                    templateUrl: 'app/pages/how-help/how-help.html',
                    controller: 'HowHelpController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('training', {
            parent: 'pages',
            url: '/training',
            data: {
                
            },
            views: {
                'content': {
                    templateUrl: 'app/pages/training/training.html'
                }
            }
        });
    }
})();
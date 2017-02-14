(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('training', {
            parent: 'entity',
            url: '/training',
            data: {
                
            },
            views: {
                'content': {
                    templateUrl: 'app/entities/training/training.html'
                }
            }
        });
    }
})();
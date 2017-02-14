(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('websphere_mq', {
            parent: 'courses',
            url: '/websphere_mq',
            data: {
                
            },
            views: {
                'content': {
                    templateUrl: 'app/courses/messaging_middleware/websphere_mq/websphere_mq.html'
                }
            }
        });
    }
})();
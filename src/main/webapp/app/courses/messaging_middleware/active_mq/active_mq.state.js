(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('active_mq', {
            parent: 'courses',
            url: '/active_mq',
            data: {
                
            },
            views: {
                'content': {
                    templateUrl: 'app/courses/messaging_middleware/active_mq/active_mq.html'
                }
            }
        });
    }
})();
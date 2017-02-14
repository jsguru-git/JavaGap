(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('jms', {
            parent: 'courses',
            url: '/jms',
            data: {
                
            },
            views: {
                'content': {
                    templateUrl: 'app/courses/messaging_middleware/jms/jms.html'
                }
            }
        });
    }
})();
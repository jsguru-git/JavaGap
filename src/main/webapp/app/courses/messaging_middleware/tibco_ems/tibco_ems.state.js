(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('tibco_ems', {
            parent: 'courses',
            url: '/tibco_ems',
            data: {
                
            },
            views: {
                'content': {
                    templateUrl: 'app/courses/messaging_middleware/tibco_ems/tibco_ems.html'
                }
            }
        });
    }
})();
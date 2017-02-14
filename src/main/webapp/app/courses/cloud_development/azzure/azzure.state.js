(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('azzure', {
            parent: 'courses',
            url: '/azzure',
            data: {
                
            },
            views: {
                'content': {
                    templateUrl: 'app/courses/cloud_development/azzure/azzure.html'
                }
            }
        });
    }
})();
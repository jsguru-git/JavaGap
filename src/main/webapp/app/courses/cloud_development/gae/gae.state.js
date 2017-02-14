(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('gae', {
            parent: 'courses',
            url: '/gae',
            data: {
                
            },
            views: {
                'content': {
                    templateUrl: 'app/courses/cloud_development/gae/gae.html'
                }
            }
        });
    }
})();
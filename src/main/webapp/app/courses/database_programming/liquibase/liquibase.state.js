(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('liquibase', {
            parent: 'courses',
            url: '/liquibase',
            data: {
                
            },
            views: {
                'content': {
                    templateUrl: 'app/courses/database_programming/liquibase/liquibase.html'
                }
            }
        });
    }
})();
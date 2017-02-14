(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('nosql', {
            parent: 'courses',
            url: '/nosql',
            data: {
                
            },
            views: {
                'content': {
                    templateUrl: 'app/courses/database_programming/nosql/nosql.html'
                }
            }
        });
    }
})();
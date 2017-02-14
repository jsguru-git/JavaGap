(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('jpa', {
            parent: 'courses',
            url: '/jpa',
            data: {
                
            },
            views: {
                'content': {
                    templateUrl: 'app/courses/database_programming/jpa/jpa.html'
                }
            }
        });
    }
})();
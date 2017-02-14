(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('mysql', {
            parent: 'courses',
            url: '/mysql',
            data: {
                
            },
            views: {
                'content': {
                    templateUrl: 'app/courses/database_programming/mysql/mysql.html'
                }
            }
        });
    }
})();
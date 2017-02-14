(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('orm', {
            parent: 'courses',
            url: '/orm',
            data: {
                
            },
            views: {
                'content': {
                    templateUrl: 'app/courses/database_programming/orm/orm.html'
                }
            }
        });
    }
})();
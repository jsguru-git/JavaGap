(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('news', {
            parent: 'entity',
            url: '/news',
            data: {
                
            },
            views: {
                'content': {
                    templateUrl: 'app/entities/news/news.html',
                    controller: 'NewsController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
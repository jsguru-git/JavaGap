(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('news', {
            parent: 'pages',
            url: '/news',
            data: {
                
            },
            views: {
                'content': {
                    templateUrl: 'app/pages/news/news.html',
                    controller: 'NewsController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
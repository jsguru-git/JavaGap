(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('blog', {
            parent: 'pages',
            url: '/blog',
            data: {
                
            },
            views: {
                'content': {
                    templateUrl: 'app/pages/blog/blog.html'
                }
            }
        });
    }
})();
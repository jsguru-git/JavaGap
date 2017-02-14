(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('blog', {
            parent: 'entity',
            url: '/blog',
            data: {
                
            },
            views: {
                'content': {
                    templateUrl: 'app/entities/blog/blog.html'
                }
            }
        });
    }
})();
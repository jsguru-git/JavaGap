(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('chef', {
            parent: 'courses',
            url: '/chef',
            data: {
                
            },
            views: {
                'content': {
                    templateUrl: 'app/courses/devops/chef/chef.html'
                }
            }
        });
    }
})();
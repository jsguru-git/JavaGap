(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('ansible', {
            parent: 'courses',
            url: '/ansible',
            data: {
                
            },
            views: {
                'content': {
                    templateUrl: 'app/courses/devops/ansible/ansible.html'
                }
            }
        });
    }
})();
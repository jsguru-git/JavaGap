(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('aws', {
            parent: 'courses',
            url: '/aws',
            data: {
                
            },
            views: {
                'content': {
                    templateUrl: 'app/courses/cloud_development/aws/aws.html',
                    controller: 'AwsController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
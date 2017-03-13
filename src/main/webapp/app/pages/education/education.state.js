(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('education', {
            parent: 'pages',
            url: '/education',
            data: {
                
            },
            views: {
                'content': {
                    templateUrl: 'app/pages/education/education.html',
                    controller: 'EducationController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('report', {
            parent: 'pages',
            url: '/report',
            data: {
                
            },
            views: {
                'content': {
                    templateUrl: 'app/pages/report/report.html',
                    controller: 'ReportController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
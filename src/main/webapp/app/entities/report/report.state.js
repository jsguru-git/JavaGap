(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('report', {
            parent: 'entity',
            url: '/report',
            data: {
                
            },
            views: {
                'content': {
                    templateUrl: 'app/entities/report/report.html',
                    controller: 'ReportController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
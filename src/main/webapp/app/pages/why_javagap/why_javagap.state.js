(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('why_javagap', {
            parent: 'pages',
            url: '/why_javagap',
            data: {
                
            },
            views: {
                'content': {
                    templateUrl: 'app/pages/why_javagap/why_javagap.html'
                }
            }
        });
    }
})();
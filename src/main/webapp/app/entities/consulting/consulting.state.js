(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('consulting', {
            parent: 'entity',
            url: '/consulting',
            data: {
                
            },
            views: {
                'content': {
                    templateUrl: 'app/entities/consulting/consulting.html'
                }
            }
        });
    }
})();
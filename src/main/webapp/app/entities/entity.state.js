(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('entity', {
            abstract: true,
            parent: 'app',
            url: '/entities',
            views: {
                '@': {
                    templateUrl: 'app/layouts/content.html'
                },
                'header@entity': {
                    templateUrl: 'app/layouts/header/header.html',
                    controller: 'NavbarController',
                    controllerAs: 'vm'
                },
                'footer@entity': {
                    templateUrl: 'app/layouts/footer/footer.html',
                    controller: 'NavbarController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();

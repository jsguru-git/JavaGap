(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('account', {
            abstract: true,
            parent: 'app',
            views: {
                '@': {
                    templateUrl: 'app/layouts/content.html'
                },
                'header@account': {
                    templateUrl: 'app/layouts/header/header.html',
                    controller: 'NavbarController',
                    controllerAs: 'vm'
                },
                'footer@account': {
                    templateUrl: 'app/layouts/footer/footer.html'
                }
            }
        });
    }
})();

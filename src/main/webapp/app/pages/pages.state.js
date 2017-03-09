(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('pages', {
            abstract: true,
            parent: 'app',
            url: '/pages',
            views: {
                '@': {
                    templateUrl: 'app/layouts/content.html'
                },
                'header@pages': {
                    templateUrl: 'app/layouts/header/header.html',
                    controller: 'NavbarController',
                    controllerAs: 'vm'
                },
                'footer@pages': {
                    templateUrl: 'app/layouts/footer/footer.html',
                    controller: 'FooterController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();

(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('courses', {
            abstract: true,
            parent: 'app',
            url: '/courses',
            data: {
                HiddenSearchBox: true
            },
            views: {
                '@': {
                    templateUrl: 'app/layouts/content.html'
                },
                'header@courses': {
                    templateUrl: 'app/layouts/header/header.html',
                    controller: 'NavbarController',
                    controllerAs: 'vm'
                },
                'footer@courses': {
                    templateUrl: 'app/layouts/footer/footer.html',
                    controller: 'FooterController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();

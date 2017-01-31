(function () {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig ($stateProvider) {
        $stateProvider.state('admin', {
            abstract: true,
            parent: 'app',
            views: {
                '@': {
                    templateUrl: 'app/layouts/content.html'
                },
                'header@admin': {
                    templateUrl: 'app/layouts/header/header.html',
                    controller: 'NavbarController',
                    controllerAs: 'vm'
                },
                'footer@admin': {
                    templateUrl: 'app/layouts/footer/footer.html'
                }
            }
        });
    }
})();

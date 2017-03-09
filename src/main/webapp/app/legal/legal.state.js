(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('legal', {
            parent: 'app',
            url: '/legal/:scrollTo',
            views: {
                '@': {
                    templateUrl: 'app/layouts/content.html'
                },
                'content@legal': {
                    templateUrl: 'app/legal/legal.html',
                    controller: 'LegalController',
                    controllerAs: 'vm',
                    resolve: {
                        target: ['$stateParams', function($stateParams) {
                            return $stateParams.scrollTo;
                        }]
                    }
                },
                'header@legal': {
                    templateUrl: 'app/layouts/header/header.html',
                    controller: 'NavbarController',
                    controllerAs: 'vm'
                },
                'footer@legal': {
                    templateUrl: 'app/layouts/footer/footer.html',
                    controller: 'FooterController',
                    controllerAs: 'vm'
                }
            },
            onEnter: scrollTo
        });

        scrollTo.$inject = ['$location', '$stateParams', '$anchorScroll', '$timeout'];
        function scrollTo($location, $stateParams, $anchorScroll, $timeout) {
            $timeout(function() { 
                $location.hash($stateParams.scrollTo);
                $anchorScroll();
            }, 100);
        }
    }
})();
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
            onEnter: scrollToFunc
        });

        scrollToFunc.$inject = ['$stateParams', '$timeout', '$document'];
        function scrollToFunc($stateParams, $timeout, $document) {
            var offset = 100;
            var duration = 0;
            $timeout(function() {
                var destElement = angular.element(document.getElementById($stateParams.scrollTo));
                $document.scrollToElement(destElement, offset, duration);
            }, 100);
        }
    }
})();

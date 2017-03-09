(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('app', {
            //abstract: true,
            data: {
                
            },
            views: {
                '': {
                    templateUrl: 'app/layouts/home.html'
                },
                'header@app': {
                    templateUrl: 'app/layouts/header/header.html',
                    controller: 'NavbarController',
                    controllerAs: 'vm'
                },
                'banner@app': {
                    templateUrl: 'app/layouts/banner/banner.html',
                    controller: 'BannerController',
                    controllerAs: 'vm'
                },
                'services@app': {
                    templateUrl: 'app/layouts/services-section/services-section.html',
                    controller: 'ServicesSectionController',
                    controllerAs: 'vm'
                },
                'testimonials@app': {
                    templateUrl: 'app/layouts/testimonials-section/testimonials-section.html',
                    controller: 'TestimonialsSectionController',
                    controllerAs: 'vm'
                },
                'about-us@app': {
                    templateUrl: 'app/layouts/about-us-section/about-us-section.html'
                },
                'join@app': {
                    templateUrl: 'app/layouts/join-section/join-section.html',
                    controller: 'JoinSectionController',
                    controllerAs: 'vm'
                },
                'contact@app': {
                    templateUrl: 'app/layouts/contact-section/contact-section.html',
                    controller: 'ContactSectionController',
                    controllerAs: 'vm'
                },
                'footer@app': {
                    templateUrl: 'app/layouts/footer/footer.html',
                    controller: 'FooterController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                authorize: ['Auth',
                    function (Auth) {
                        return Auth.authorize();
                    }
                ],
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('global');
                }]
            }
        });
    }
})();

(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('contact-us', {
            parent: 'entity',
            url: '/contact-us',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Contactuses'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/contact-us/contactuses.html',
                    controller: 'ContactUsController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('contact-us-detail', {
            parent: 'entity',
            url: '/contact-us/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'ContactUs'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/contact-us/contact-us-detail.html',
                    controller: 'ContactUsDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'ContactUs', function($stateParams, ContactUs) {
                    return ContactUs.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'contact-us',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('contact-us-detail.edit', {
            parent: 'contact-us-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/contact-us/contact-us-dialog.html',
                    controller: 'ContactUsDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['ContactUs', function(ContactUs) {
                            return ContactUs.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('contact-us.new', {
            parent: 'contact-us',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/contact-us/contact-us-dialog.html',
                    controller: 'ContactUsDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                email: null,
                                phoneNumber: null,
                                message: null,
                                createdOn: null,
                                type: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('contact-us', null, { reload: 'contact-us' });
                }, function() {
                    $state.go('contact-us');
                });
            }]
        })
        .state('contact-us.edit', {
            parent: 'contact-us',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/contact-us/contact-us-dialog.html',
                    controller: 'ContactUsDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['ContactUs', function(ContactUs) {
                            return ContactUs.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('contact-us', null, { reload: 'contact-us' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('contact-us.delete', {
            parent: 'contact-us',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/contact-us/contact-us-delete-dialog.html',
                    controller: 'ContactUsDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['ContactUs', function(ContactUs) {
                            return ContactUs.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('contact-us', null, { reload: 'contact-us' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

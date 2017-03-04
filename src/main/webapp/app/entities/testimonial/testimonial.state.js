(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('testimonial', {
            parent: 'entity',
            url: '/testimonial',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Testimonials'
            },
            views: {
                'content': {
                    templateUrl: 'app/entities/testimonial/testimonials.html',
                    controller: 'TestimonialController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('testimonial-detail', {
            parent: 'entity',
            url: '/testimonial/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Testimonial'
            },
            views: {
                'content': {
                    templateUrl: 'app/entities/testimonial/testimonial-detail.html',
                    controller: 'TestimonialDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Testimonial', function($stateParams, Testimonial) {
                    return Testimonial.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'testimonial',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('testimonial-detail.edit', {
            parent: 'testimonial-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/testimonial/testimonial-dialog.html',
                    controller: 'TestimonialDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Testimonial', function(Testimonial) {
                            return Testimonial.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('testimonial.new', {
            parent: 'testimonial',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/testimonial/testimonial-dialog.html',
                    controller: 'TestimonialDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                title: null,
                                text: null,
                                createdOn: null,
                                createdBy: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('testimonial', null, { reload: 'testimonial' });
                }, function() {
                    $state.go('testimonial');
                });
            }]
        })
        .state('testimonial.edit', {
            parent: 'testimonial',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/testimonial/testimonial-dialog.html',
                    controller: 'TestimonialDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Testimonial', function(Testimonial) {
                            return Testimonial.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('testimonial', null, { reload: 'testimonial' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('testimonial.delete', {
            parent: 'testimonial',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/testimonial/testimonial-delete-dialog.html',
                    controller: 'TestimonialDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Testimonial', function(Testimonial) {
                            return Testimonial.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('testimonial', null, { reload: 'testimonial' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

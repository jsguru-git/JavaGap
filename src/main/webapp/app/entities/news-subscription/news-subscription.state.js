(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('news-subscription', {
            parent: 'entity',
            url: '/news-subscription',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'NewsSubscriptions'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/news-subscription/news-subscriptions.html',
                    controller: 'NewsSubscriptionController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('news-subscription-detail', {
            parent: 'entity',
            url: '/news-subscription/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'NewsSubscription'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/news-subscription/news-subscription-detail.html',
                    controller: 'NewsSubscriptionDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'NewsSubscription', function($stateParams, NewsSubscription) {
                    return NewsSubscription.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'news-subscription',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('news-subscription-detail.edit', {
            parent: 'news-subscription-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/news-subscription/news-subscription-dialog.html',
                    controller: 'NewsSubscriptionDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['NewsSubscription', function(NewsSubscription) {
                            return NewsSubscription.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('news-subscription.new', {
            parent: 'news-subscription',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/news-subscription/news-subscription-dialog.html',
                    controller: 'NewsSubscriptionDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                email: null,
                                name: null,
                                createdOn: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('news-subscription', null, { reload: 'news-subscription' });
                }, function() {
                    $state.go('news-subscription');
                });
            }]
        })
        .state('news-subscription.edit', {
            parent: 'news-subscription',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/news-subscription/news-subscription-dialog.html',
                    controller: 'NewsSubscriptionDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['NewsSubscription', function(NewsSubscription) {
                            return NewsSubscription.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('news-subscription', null, { reload: 'news-subscription' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('news-subscription.delete', {
            parent: 'news-subscription',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/news-subscription/news-subscription-delete-dialog.html',
                    controller: 'NewsSubscriptionDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['NewsSubscription', function(NewsSubscription) {
                            return NewsSubscription.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('news-subscription', null, { reload: 'news-subscription' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

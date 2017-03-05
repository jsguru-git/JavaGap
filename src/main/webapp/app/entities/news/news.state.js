(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('news', {
            parent: 'entity',
            url: '/news',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'News'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/news/news.html',
                    controller: 'NewsController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('news-detail', {
            parent: 'entity',
            url: '/news/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'News'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/news/news-detail.html',
                    controller: 'NewsDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'News', function($stateParams, News) {
                    return News.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'news',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('news-detail.edit', {
            parent: 'news-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/news/news-dialog.html',
                    controller: 'NewsDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['News', function(News) {
                            return News.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('news.new', {
            parent: 'news',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/news/news-dialog.html',
                    controller: 'NewsDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                news: null,
                                createdOn: null,
                                title: null,
                                createdBy: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('news', null, { reload: 'news' });
                }, function() {
                    $state.go('news');
                });
            }]
        })
        .state('news.edit', {
            parent: 'news',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/news/news-dialog.html',
                    controller: 'NewsDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['News', function(News) {
                            return News.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('news', null, { reload: 'news' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('news.delete', {
            parent: 'news',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/news/news-delete-dialog.html',
                    controller: 'NewsDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['News', function(News) {
                            return News.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('news', null, { reload: 'news' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

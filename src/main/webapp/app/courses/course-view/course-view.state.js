(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('courseView', {
            parent: 'courses',
            url: '/:name',
            data: {
                
            },
            views: {
                'content': {
                    templateUrl: 'app/courses/course-view/course-view.html',
                    controller: 'CourseViewController',
                    controllerAs: 'vm'
                }
            }
        })
        .state('courseRatings', {
            parent: 'courseView',
            url: '/ratings',
            params: {
                name: null
            },
            data: {
                //authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/courses/course-view/course-ratings.html',
                    controller: 'CourseRatingsController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['CourseByName', function(CourseByName) {
                            return CourseByName.get({name : $stateParams.name}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('courseView', {name: $stateParams.name}, { reload: 'courseView' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }
})();
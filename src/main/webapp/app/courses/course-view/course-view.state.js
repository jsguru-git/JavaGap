(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('courseView', {
            parent: 'courses',
            url: '/:title',
            params: {
                courseEntity: null
            },
            data: {
                
            },
            views: {
                'content': {
                    templateUrl: 'app/courses/course-view/course-view.html',
                    controller: 'CourseViewController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
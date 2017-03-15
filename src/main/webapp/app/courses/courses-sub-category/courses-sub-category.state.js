(function() {
    'use strict';

    angular
        .module('javagapApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('subCategory', {
            parent: 'courses',
            url: '/:category/:subcategory',
            views: {
                'content': {
                    templateUrl: 'app/courses/courses-sub-category/courses-sub-category.html',
                    controller: 'CoursesSubCategoryController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
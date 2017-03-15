(function() {
    'use strict';

    angular
        .module('javagapApp')
        .directive('scrollTop', scrollTop);

    scrollTop.$inject = ['$window'];

    function scrollTop($window) {
        var directive = {
            restrict: 'A',
            link: linkFunc
        };

        return directive;

        function linkFunc(scope, element, attrs) {
            var win = angular.element($window);
            win.scroll(function(){
                if (win.scrollTop() > win.height()/2) {
                    element.fadeIn();
                } else {
                    element.fadeOut();
                }
            });
        }
    }
})();
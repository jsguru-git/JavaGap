(function() {
    'use strict';

    angular
        .module('javagapApp')
        .directive('hiddenHandler', hiddenHandler);

    hiddenHandler.$inject = ['$window'];

    function hiddenHandler($window) {
        var directive = {
            restrict: 'A',
            link: linkFunc
        };

        return directive;

        function linkFunc(scope, element, attrs) {
            var w = angular.element($window);
            var mobileWidth = 768;
            element.click(function(e) {
                if(w.width() < mobileWidth) {
                    var rootParent = element.parents('.logo');
                    rootParent.toggleClass('showSearchInput');    
                }
            });
        }
    }
})();
(function() {
    'use strict';

    angular
        .module('javagapApp')
        .directive('back', back);

    back.$inject = ['$window'];

    function back($window) {
        var directive = {
            restrict: 'A',
            link: linkFunc
        };

        return directive;

        function linkFunc(scope, element, attrs) {
            element.bind('click', function () {
                $window.history.back();
            });
        }
    }
})();

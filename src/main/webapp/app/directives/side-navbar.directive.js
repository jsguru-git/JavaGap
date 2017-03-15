(function() {
    'use strict';

    angular
        .module('javagapApp')
        .directive('sideNavbar', sideNavbar);

    sideNavbar.$inject = [];

    function sideNavbar() {
        var directive = {
            restrict: 'A',
            link: linkFunc
        };

        return directive;

        function linkFunc(scope, element, attrs) {
            element.find('a').click(function(e) {
                element.find('a').parent().removeClass('active');
                element.find(e.target).parent().addClass('active');
            });
        }
    }
})();
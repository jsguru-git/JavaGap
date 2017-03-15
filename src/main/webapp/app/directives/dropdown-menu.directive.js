(function() {
    'use strict';

    angular
        .module('javagapApp')
        .directive('dropdownMenu', dropdownMenu);

    dropdownMenu.$inject = [];

    function dropdownMenu() {
        var directive = {
            restrict: 'A',
            link: linkFunc
        };

        return directive;

        function linkFunc(scope, element, attrs) {
            element.hover(function() {
                element.find('ul').fadeIn("fast");
            }, function() {
                element.find('ul').fadeOut("fast");
            });

        }
    }
})();
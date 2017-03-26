(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('BannerController', BannerController);

    BannerController.$inject = ['$scope', '$state', 'RegisterformService', 'Principal', 'Course'];

    function BannerController ($scope, $state, RegisterformService, Principal, Course) {
        var vm = this;

        vm.register = register;
        vm.isAuthenticated = Principal.isAuthenticated;

        $scope.courses = [];

        loadAll();
        function loadAll() {
            Course.query(function(result) {
                $scope.courses = result;
            });
        }
        $scope.selectedcourse = function($item) {
            $state.go('courseView', {name: $item.title});
            $('html, body').animate({scrollTop: 0}, 0);
        }
        
        function register() {
            var isAuthenticated = vm.isAuthenticated();
            if(!isAuthenticated) {
                RegisterformService.open();    
            }
        }
    }
})();

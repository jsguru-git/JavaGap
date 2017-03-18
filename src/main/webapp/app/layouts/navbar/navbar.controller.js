(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$state', '$scope', '$window', 'Auth', 'Principal', 'ProfileService', 'LoginService', 'RegisterformService', 'DisableLoggedUserPopupService', 'Course'];

    function NavbarController ($state, $scope, $window, Auth, Principal, ProfileService, LoginService, RegisterformService, DisableLoggedUserPopupService, Course) {
        var vm = this;

        vm.isNavbarCollapsed = true;
        vm.isAuthenticated = Principal.isAuthenticated;
        vm.identity = Principal.identity;
        vm.currentAccount = null;

        $scope.courses = [];

        loadAll();
        function loadAll() {
            Course.query(function(result) {
                $scope.courses = result;
            });
        }
        $scope.selectedcourse = function($item) {
            $state.go('courseView', {title: $item.title, courseEntity: $item.originalObject});
        }
        
        // $scope.courseSearchFn = function(str) {
        //     // var temp;
        //     // Course.get({id : str} ,(data, headers) => {
        //     //     var response = {}
        //     //     response.data = {results: data};
        //     //     response.headers = headers;
        //     //     //alert(JSON.stringify(response.data));
        //     //     //return response;
        //     // });
        //     return Course.get({id : str}).$promise;
        // }

        // $scope.remoteUrlRequestFn = function(str) { return {q: str}; }
        
        Principal.identity().then(function(account) {
            vm.currentAccount = account;
        });


        ProfileService.getProfileInfo().then(function(response) {
            vm.inProduction = response.inProduction;
            vm.swaggerEnabled = response.swaggerEnabled;
        });

        vm.home = home;
        vm.login = login;
        vm.logout = logout;
        vm.register = register;
        vm.disableLoggedUser = disableLoggedUser;
        
        vm.contactUs = contactUs;
        vm.aboutUs = aboutUs;

        vm.toggleNavbar = toggleNavbar;
        vm.collapseNavbar = collapseNavbar;
        vm.$state = $state;

        function home() {
            collapseNavbar();
            $window.location.href = '';
        }

        function login() {
            LoginService.open();
        }

        function logout() {
            collapseNavbar();
            Auth.logout();
            $window.location.href = '';
        }

        function register() {
            RegisterformService.open();
        }

        function disableLoggedUser() {
            DisableLoggedUserPopupService.open();
        }

        function contactUs() {
            if(global.is_front_page === 'false') {
                $window.location.href = '#contact';
            }
        }

        function aboutUs() {
            if(global.is_front_page === 'false') {
                $window.location.href = '#about-us';
            }
        }

        function toggleNavbar() {
            vm.isNavbarCollapsed = !vm.isNavbarCollapsed;
        }

        function collapseNavbar() {
            vm.isNavbarCollapsed = true;
            $('html, body').animate({scrollTop: 0}, 0);
        }
    }
})();

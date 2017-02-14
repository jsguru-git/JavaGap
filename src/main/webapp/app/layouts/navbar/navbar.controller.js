(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$state', '$window', 'Auth', 'Principal', 'ProfileService', 'LoginService', 'RegisterformService'];

    function NavbarController ($state, $window, Auth, Principal, ProfileService, LoginService, RegisterformService) {
        var vm = this;

        vm.isNavbarCollapsed = true;
        vm.isAuthenticated = Principal.isAuthenticated;
        vm.identity = Principal.identity;
        vm.currentAccount = null;
        
        ProfileService.getProfileInfo().then(function(response) {
            vm.inProduction = response.inProduction;
            vm.swaggerEnabled = response.swaggerEnabled;
        });

        /*Principal.identity().then(function(account) {
            vm.currentAccount = account;
        });*/

        vm.home = home;
        vm.login = login;
        vm.logout = logout;
        vm.register = register;
        
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
            //$state.go('app');
            $window.location.href = '';
        }

        function register() {
            RegisterformService.open();
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

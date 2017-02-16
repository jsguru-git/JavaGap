(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('ContactUsDetailController', ContactUsDetailController);

    ContactUsDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'ContactUs'];

    function ContactUsDetailController($scope, $rootScope, $stateParams, previousState, entity, ContactUs) {
        var vm = this;

        vm.contactUs = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('javagapApp:contactUsUpdate', function(event, result) {
            vm.contactUs = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();

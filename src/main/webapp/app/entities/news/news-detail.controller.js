(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('NewsDetailController', NewsDetailController);

    NewsDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'News'];

    function NewsDetailController($scope, $rootScope, $stateParams, previousState, entity, News) {
        var vm = this;

        vm.news = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('javagapApp:newsUpdate', function(event, result) {
            vm.news = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();

(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('NewsController', NewsController);

    NewsController.$inject = ['$scope', '$state', 'News'];

    function NewsController ($scope, $state, News) {
        var vm = this;

        vm.news = [];

        loadAll();

        function loadAll() {
            News.query(function(result) {
                vm.news = result;
                vm.searchQuery = null;
            });
        }
    }
})();

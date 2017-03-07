(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('NewsDeleteController',NewsDeleteController);

    NewsDeleteController.$inject = ['$uibModalInstance', 'entity', 'News'];

    function NewsDeleteController($uibModalInstance, entity, News) {
        var vm = this;

        vm.news = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            News.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();

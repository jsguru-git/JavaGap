(function() {
    'use strict';

    angular
        .module('javagapApp')
        .factory('Join', Join)
        .controller('JoinController', JoinController);

    Join.$inject = ['$resource'];

    function Join ($resource) {
        return $resource('api/join/:id');
    }

    JoinController.$inject = ['Join'];

    function JoinController (Join) {
        var vm = this;
        vm.save = save;
        
        vm.joinInfo = new Join();

        function onSaveSuccess (result) {
            alert('join success');
        }

        function onSaveError () {
            alert('join failure');
        }

        function save () {
            Join.save(vm.joinInfo, onSaveSuccess, onSaveError);
        }
    }
})();

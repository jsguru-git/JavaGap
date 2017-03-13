(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('TrainingController', TrainingController);

    TrainingController.$inject = ['$scope', 'Train'];

    function TrainingController ($scope, Train) {
        var vm = this;
        vm.save = save;

        vm.contactInfo = null;

        function onSaveSuccess (result) {
            alertify.notify('New Subscription is created', 'success', 5, function(){  console.log('success'); });
        }

        function onSaveError () {
            alertify.notify('New Subscription failed. Try again later', 'error', 5, function(){  console.log('failed'); });
        }

        function save () {
            Train.save(vm.contactInfo, onSaveSuccess, onSaveError);
        }

    }
})();
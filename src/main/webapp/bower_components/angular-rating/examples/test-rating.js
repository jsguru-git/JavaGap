(function () {
    "use strict";

    var app = angular.module('testRating', ['angular-rating']);

    app.controller('ItemController', ['$scope', function ($scope) {
         $scope.value = 2;
          $scope.items = [
            {
                name: 'Item A',
                rate: 5
            },
            {
                name: 'Item B',
                rate: 1
            },
            {
                name: 'Item C',
                rate: 3
            }
        ];
    }]);
    

})();
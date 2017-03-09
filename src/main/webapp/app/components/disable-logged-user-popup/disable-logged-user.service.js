(function () {
    'use strict';

    angular
        .module('javagapApp')
        .factory('DisableLoggedUser', DisableLoggedUser);

    DisableLoggedUser.$inject = ['$resource'];

    function DisableLoggedUser ($resource) {
        return $resource('api/account/delete', {}, {
            'disable': { method: 'POST', params: {}, isArray: false}
        });
        //return $resource('api/account/delete', {}, {});
    }
})();
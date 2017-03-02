(function() {
    'use strict';
    angular
        .module('javagapApp')
        .factory('Help', Help);

    Help.$inject = ['$resource'];

    function Help ($resource) {
        var resourceUrl =  'api/helps/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();

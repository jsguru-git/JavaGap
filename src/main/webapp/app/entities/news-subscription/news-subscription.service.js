(function() {
    'use strict';
    angular
        .module('javagapApp')
        .factory('NewsSubscription', NewsSubscription);

    NewsSubscription.$inject = ['$resource', 'DateUtils'];

    function NewsSubscription ($resource, DateUtils) {
        var resourceUrl =  'api/newssubscriptions/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.createdOn = DateUtils.convertDateTimeFromServer(data.createdOn);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();

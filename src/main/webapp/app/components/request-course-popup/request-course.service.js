(function() {
    'use strict';
    angular
        .module('javagapApp')
        .factory('RequestCourse', RequestCourse);

    RequestCourse.$inject = ['$resource', 'DateUtils'];

    function RequestCourse ($resource, DateUtils) {
        var resourceUrl =  'api/requestCourse/:id';

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

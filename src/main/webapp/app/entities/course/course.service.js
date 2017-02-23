(function() {
    'use strict';
    angular
        .module('javagapApp')
        .factory('Course', Course);

    Course.$inject = ['$resource', 'DateUtils'];

    function Course ($resource, DateUtils) {
        var resourceUrl =  'api/courses/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.publishedDate = DateUtils.convertDateTimeFromServer(data.publishedDate);
                        data.lastUpdatedDate = DateUtils.convertDateTimeFromServer(data.lastUpdatedDate);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();

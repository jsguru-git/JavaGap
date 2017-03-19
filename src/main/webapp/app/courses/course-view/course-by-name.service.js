(function() {
    'use strict';
    angular
        .module('javagapApp')
        .factory('CourseByName', CourseByName);

    CourseByName.$inject = ['$resource', 'DateUtils'];

    function CourseByName ($resource, DateUtils) {
        var resourceUrl =  'api/course/:name';

        return $resource(resourceUrl, {}, {
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
            }
        });
    }
})();
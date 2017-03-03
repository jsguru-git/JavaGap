(function() {
    'use strict';
    angular
        .module('javagapApp')
        .factory('Testimonial', Testimonial);

    Testimonial.$inject = ['$resource', 'DateUtils'];

    function Testimonial ($resource, DateUtils) {
        var resourceUrl =  'api/testimonials/:id';

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

(function() {
    'use strict';
    angular
        .module('javagapApp')
        .factory('ContactUs', ContactUs);

    ContactUs.$inject = ['$resource', 'DateUtils'];

    function ContactUs ($resource, DateUtils) {
        var resourceUrl =  'api/contactuses/:id';

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

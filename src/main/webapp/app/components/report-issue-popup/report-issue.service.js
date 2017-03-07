(function() {
    'use strict';
    angular
        .module('javagapApp')
        .factory('ReportIssue', ReportIssue);

    ReportIssue.$inject = ['$resource', 'DateUtils'];

    function ReportIssue ($resource, DateUtils) {
        var resourceUrl =  'api/reportIssue/:id';

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

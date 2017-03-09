(function() {
    'use strict';
    angular
        .module('javagapApp')
        .factory('ReportIssue', ReportIssue);

    ReportIssue.$inject = ['$resource', 'DateUtils'];

    function ReportIssue ($resource, DateUtils) {
        var resourceUrl =  'api/reportIssue';

        return $resource(resourceUrl, {}, {});
    }
})();

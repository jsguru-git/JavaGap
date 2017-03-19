(function() {
    'use strict';
    angular
        .module('javagapApp')
        .factory('IncWatchedCount', IncWatchedCount);

    IncWatchedCount.$inject = ['$resource', 'DateUtils'];

    function IncWatchedCount ($resource, DateUtils) {
        var resourceUrl =  'api/course/count/:name';

        return $resource(resourceUrl, {}, {
            'increase': {method: 'GET'}
        });
    }
})();
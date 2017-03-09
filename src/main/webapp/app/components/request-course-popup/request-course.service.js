(function() {
    'use strict';
    angular
        .module('javagapApp')
        .factory('RequestCourse', RequestCourse);

    RequestCourse.$inject = ['$resource', 'DateUtils'];

    function RequestCourse ($resource, DateUtils) {
        var resourceUrl =  'api/requestCourse/';

        return $resource(resourceUrl, {}, {});
    }
})();

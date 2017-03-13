(function() {
    'use strict';
    angular
        .module('javagapApp')
        .factory('Educate', Educate);

    Educate.$inject = ['$resource', 'DateUtils'];

    function Educate ($resource, DateUtils) {
        var resourceUrl =  'api/educate';

        return $resource(resourceUrl, {}, {});
    }
})();
(function() {
    'use strict';
    angular
        .module('javagapApp')
        .factory('Consult', Consult);

    Consult.$inject = ['$resource', 'DateUtils'];

    function Consult ($resource, DateUtils) {
        var resourceUrl =  'api/consult';

        return $resource(resourceUrl, {}, {});
    }
})();
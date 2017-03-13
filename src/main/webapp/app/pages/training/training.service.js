(function() {
    'use strict';
    angular
        .module('javagapApp')
        .factory('Train', Train);

    Train.$inject = ['$resource', 'DateUtils'];

    function Train ($resource, DateUtils) {
        var resourceUrl =  'api/train';

        return $resource(resourceUrl, {}, {});
    }
})();
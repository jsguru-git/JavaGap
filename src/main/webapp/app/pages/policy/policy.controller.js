(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('PolicyController', PolicyController);

    PolicyController.$inject = ['Principal', 'Auth', 'JhiLanguageService', '$translate'];

    function PolicyController (Principal, Auth, JhiLanguageService, $translate) {
        
       
    }
})();
(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('ServicesController', ServicesController);

    ServicesController.$inject = ['Principal', 'Auth', 'JhiLanguageService', '$translate'];

    function ServicesController (Principal, Auth, JhiLanguageService, $translate) {
        
       
    }
})();
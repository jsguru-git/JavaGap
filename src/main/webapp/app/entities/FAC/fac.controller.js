(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('FacController', FacController);

    FacController.$inject = ['Principal', 'Auth', 'JhiLanguageService', '$translate'];

    function FacController (Principal, Auth, JhiLanguageService, $translate) {
        
       
    }
})();
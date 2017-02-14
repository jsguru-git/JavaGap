(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('CareersController', CareersController);

    CareersController.$inject = ['Principal', 'Auth', 'JhiLanguageService', '$translate'];

    function CareersController (Principal, Auth, JhiLanguageService, $translate) {
        
       
    }
})();
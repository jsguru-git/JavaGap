(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('HelpController', HelpController);

    HelpController.$inject = ['Principal', 'Auth', 'JhiLanguageService', '$translate'];

    function HelpController (Principal, Auth, JhiLanguageService, $translate) {
        
       
    }
})();
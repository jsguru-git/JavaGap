(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('CopyrightController', CopyrightController);

    CopyrightController.$inject = ['Principal', 'Auth', 'JhiLanguageService', '$translate'];

    function CopyrightController (Principal, Auth, JhiLanguageService, $translate) {
        
       
    }
})();
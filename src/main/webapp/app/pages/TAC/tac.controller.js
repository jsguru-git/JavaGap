(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('TacController', TacController);

    TacController.$inject = ['Principal', 'Auth', 'JhiLanguageService', '$translate'];

    function TacController (Principal, Auth, JhiLanguageService, $translate) {
        
       
    }
})();
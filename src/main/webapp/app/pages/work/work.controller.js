(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('WorkController', WorkController);

    WorkController.$inject = ['Principal', 'Auth', 'JhiLanguageService', '$translate'];

    function WorkController (Principal, Auth, JhiLanguageService, $translate) {
        
       
    }
})();
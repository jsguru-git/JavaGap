(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('AboutController', AboutController);

    AboutController.$inject = ['Principal', 'Auth', 'JhiLanguageService', '$translate'];

    function AboutController (Principal, Auth, JhiLanguageService, $translate) {
        
       
    }
})();
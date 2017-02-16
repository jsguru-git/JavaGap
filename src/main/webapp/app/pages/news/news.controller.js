(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('NewsController', NewsController);

    NewsController.$inject = ['Principal', 'Auth', 'JhiLanguageService', '$translate'];

    function NewsController (Principal, Auth, JhiLanguageService, $translate) {
        
       
    }
})();
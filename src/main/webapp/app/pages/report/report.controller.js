(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('ReportController', ReportController);

    ReportController.$inject = ['Principal', 'Auth', 'JhiLanguageService', '$translate'];

    function ReportController (Principal, Auth, JhiLanguageService, $translate) {
        
       
    }
})();
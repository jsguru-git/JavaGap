(function() {
    'use strict';

    angular
        .module('javagapApp', [
            'ngStorage',
            'tmh.dynamicLocale',
            'pascalprecht.translate',
            'ngResource',
            'ngCookies',
            'ngAria',
            'ngCacheBuster',
            'ngFileUpload',
            'ui.bootstrap',
            'ui.bootstrap.datetimepicker',
            'ui.router',
            'infinite-scroll',
            // jhipster-needle-angularjs-add-module JHipster will add new module here
            'angular-loading-bar',
            'jqwidgets',
            'sir-accordion',
            'ngSanitize',
            'com.2fdevs.videogular',
            'com.2fdevs.videogular.plugins.controls',
            'com.2fdevs.videogular.plugins.overlayplay',
            'com.2fdevs.videogular.plugins.poster',
            'ngMaterial',
            'angular-rating',
            'angucomplete-alt',
            'duScroll'
        ])
        .value('duScrollOffset', 100)
        .run(run);

    run.$inject = ['$rootScope', 'stateHandler', 'translationHandler'];

    function run($rootScope, stateHandler, translationHandler) {
        stateHandler.initialize();
        translationHandler.initialize();
        if(!window.history || !history.replaceState) {
          return;
        }
        $rootScope.$on('duScrollspy:becameActive', function($event, $element, $target){
          //Automaticly update location
          var hash = $element.prop('hash');
          //alert(hash);
          if (hash) {
            history.replaceState(null, null, hash);
          }
        });
    }
})();

(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('HowHelpController', HowHelpController);

    HowHelpController.$inject = ['Principal', '$scope', '$compile', 'Help'];

    function HowHelpController (Principal, $scope, $compile, Help) {
      var vm = this;
      $scope.activeArray = 1;
	  $scope.coord = '';
	  $scope.accordionConfig = {
	    debug: false,
	    animDur: 300,
	    expandFirst: false,
	    autoCollapse: true,
	    watchInternalChanges: false,
	    headerClass: '',
	    beforeHeader: '',
	    afterHeader: '<div class="drop-icon-wrapper sir-accordion-vertical-align"><i class="glyphicon glyphicon-chevron-down"></i></div>',
	    topContentClass: '',
	    beforeTopContent: '',
	    afterTopContent: '<div><p><small>I repeat through all accordion</small></p></div>',
	    bottomContentClass: '',
	    beforeBottomContent: '',
	    afterBottomContent: ''
	  };
	   $scope.accordionArray = [];    
	    loadAll();
        function loadAll() {        	        	
            Help.query(function(result)  {                    
                angular.forEach(result, function(value, key) {            
                	$scope.accordionArray.push({"title": value.question, "topContent": value.answer});
                });
            });
        }
 	}
})();
(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('HelpController', HelpController);

    HelpController.$inject = ['Principal', '$scope', '$compile'];

    function HelpController (Principal, $scope, $compile) {
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

	  $scope.accordionArray = 
	  [
	    {	
	    	"title":"How do I install the theme?",
	    	"topContent":"DIY kinfolk etsy, drinking vinegar put a bird on it taxidermy chicharrones humblebrag kombucha "
	    				+ "wolf beard swag tofu vegan try-hard.Celiac thundercats yr tote bag, "
	    				+ "pickled small batch lo-fi dreamcatcher occupy chicharrones pop-up chambray letterpress.",
	    	"bottomContent":"Hammock PBR&B crucifix, green juice vinyl neutra tacos cold-pressed. Next level meggings "
	    				+ "try-hard chicharrones, sustainable mustache franzen. Flannel yr brooklyn skateboard literally "
	    				+ "neutra scenester, VHS authentic listicle green juice."
	    },
	    {	
	    	"title":"How can I import the demo content?",
	    	"topContent":"DIY kinfolk etsy, drinking vinegar put a bird on it taxidermy chicharrones humblebrag kombucha "
	    				+ "wolf beard swag tofu vegan try-hard.Celiac thundercats yr tote bag, "
	    				+ "pickled small batch lo-fi dreamcatcher occupy chicharrones pop-up chambray letterpress.",
	    	"bottomContent":"Hammock PBR&B crucifix, green juice vinyl neutra tacos cold-pressed. Next level meggings "
	    				+ "try-hard chicharrones, sustainable mustache franzen. Flannel yr brooklyn skateboard literally "
	    				+ "neutra scenester, VHS authentic listicle green juice."
	    },
	    {	
	    	"title":"Do I need to activate the plugins?",
	    	"topContent":"DIY kinfolk etsy, drinking vinegar put a bird on it taxidermy chicharrones humblebrag kombucha "
	    				+ "wolf beard swag tofu vegan try-hard.Celiac thundercats yr tote bag, "
	    				+ "pickled small batch lo-fi dreamcatcher occupy chicharrones pop-up chambray letterpress.",
	    	"bottomContent":"Hammock PBR&B crucifix, green juice vinyl neutra tacos cold-pressed. Next level meggings "
	    				+ "try-hard chicharrones, sustainable mustache franzen. Flannel yr brooklyn skateboard literally "
	    				+ "neutra scenester, VHS authentic listicle green juice."
	    },
	    {	
	    	"title":"Where can I change the colours?",
	    	"topContent":"DIY kinfolk etsy, drinking vinegar put a bird on it taxidermy chicharrones humblebrag kombucha "
	    				+ "wolf beard swag tofu vegan try-hard.Celiac thundercats yr tote bag, "
	    				+ "pickled small batch lo-fi dreamcatcher occupy chicharrones pop-up chambray letterpress.",
	    	"bottomContent":"Hammock PBR&B crucifix, green juice vinyl neutra tacos cold-pressed. Next level meggings "
	    				+ "try-hard chicharrones, sustainable mustache franzen. Flannel yr brooklyn skateboard literally "
	    				+ "neutra scenester, VHS authentic listicle green juice."
	    },
	    {	
	    	"title":"How can I get support?",
	    	"topContent":"DIY kinfolk etsy, drinking vinegar put a bird on it taxidermy chicharrones humblebrag kombucha "
	    				+ "wolf beard swag tofu vegan try-hard.Celiac thundercats yr tote bag, "
	    				+ "pickled small batch lo-fi dreamcatcher occupy chicharrones pop-up chambray letterpress.",
	    	"bottomContent":"Hammock PBR&B crucifix, green juice vinyl neutra tacos cold-pressed. Next level meggings "
	    				+ "try-hard chicharrones, sustainable mustache franzen. Flannel yr brooklyn skateboard literally "
	    				+ "neutra scenester, VHS authentic listicle green juice."
	    }
	  ];
    }
})();
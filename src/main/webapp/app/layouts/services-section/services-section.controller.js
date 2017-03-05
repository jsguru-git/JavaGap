(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('ServicesSectionController', ServicesSectionController);

    ServicesSectionController.$inject = ['$scope'];

    function ServicesSectionController ($scope) {
    	var vm = this;
        var icons = ["icon outline outline-archery-target", "icon outline outline-search", "icon outline outline-padlock-closed"];
    	var titles = ["Consulting", "Training", "Education"];
        var hrefs = ["consulting", "training", "education"];
    	var contents = ["We provide Java Stack Consulting Services for your business.",
    					"Customized in-person or online training available for your business.",
    					"Suitbale for Universities, Colleges and Businesses. "];
    	vm.navTop = navTop;
        vm.tiles = buildGridModel({
    		icon: "",
            title: "",
            href: "", 
    		content: ""
    	});

        function buildGridModel(tileTmpl) {
        	var it, results = [];
        	for (var j=0; j<3; j++) {
        		it = angular.extend({},tileTmpl);
        		it.icon = icons[j];
                it.title = titles[j];
                it.href = hrefs[j];
		        it.content  = contents[j];

        		results.push(it);
        	}
        	return results;
        }

        function navTop() {
            $('html, body').animate({scrollTop: 0}, 0);
        }
    }
})();

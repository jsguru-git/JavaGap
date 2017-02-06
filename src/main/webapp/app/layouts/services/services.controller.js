(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('ServicesController', ServicesController);

    ServicesController.$inject = ['$scope'];

    function ServicesController ($scope) {
    	var vm = this;
        var icons = ["icon outline outline-archery-target", "icon outline outline-search", "icon outline outline-padlock-closed"];
    	var titles = ["Consulting", "Training", "Education"];
    	var contents = ["Powerfull theme ready for your online shop to rock the online market place.",
    					"Careful attention to detail and clean, well structured code ensures a smooth user experience for all your visitors.",
    					"Short loading time for best user experience and includes everything you need to build something exceptional"];
    	vm.tiles = buildGridModel({
    		icon: "",
            title : "",
    		content: ""
    	});

        function buildGridModel(tileTmpl) {
        	var it, results = [];
        	for (var j=0; j<3; j++) {
        		it = angular.extend({},tileTmpl);
        		it.icon = icons[j];
                it.title = titles[j];
		        it.content  = contents[j];

        		results.push(it);
        	}
        	return results;
        }
    }
})();

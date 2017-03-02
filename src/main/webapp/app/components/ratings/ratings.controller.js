(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('RatingsController', RatingsController);

    RatingsController.$inject = ['$scope', '$timeout', '$uibModalInstance'];

    function RatingsController ($scope, $timeout, $uibModalInstance) {
    	var vm = this;
    	vm.learner = null;
    	vm.learners = null;
        vm.review = null;
        vm.reviews = null;
    	
        vm.cancel = cancel;
    	vm.loadLearners = loadLearners;
        vm.loadReviews = loadReviews;

        vm.courseReviews = [
            {
                value: 5,
                when: '1 Mar 2017',
                notes: "Very Interesting. I'm very glad that I found this curse :)"
            },
            {
                value: 4,
                when: '1 Mar 2017',
                notes: "Great material both video and docs"
            },
            {
                value: 5,
                when: '1 Mar 2017',
                notes: "Thank you! I started to love Python :D"
            },
            {
                value: 4,
                when: '1 Mar 2017',
                notes: "Thank you for this amazing and informative content."
            },
            {
                value: 4,
                when: '1 Mar 2017',
                notes: "This is really a very nice course. All the material is good enough for a beginner."
            },
            {
                value: 5,
                when: '1 Mar 2017',
                notes: "Great material both video and docs"
            },
            {
                value: 5,
                when: '1 Mar 2017',
                notes: "Thank you! I started to love Python :D"
            },
            {
                value: 3,
                when: '1 Mar 2017',
                notes: "Thank you for this amazing and informative content."
            },
            {
                value: 4,
                when: '1 Mar 2017',
                notes: "This is really a very nice course. All the material is good enough for a beginner."
            }
        ];

    	function cancel() {
    		$uibModalInstance.dismiss('cancel');
    	}
    	function loadLearners() {
    		return $timeout(function() {
    			vm.learners = vm.learners || [
    				{ id: 1, name: 'All learners'},
    				{ id: 2, name: 'Completers'}
    			];
    		}, 300);
    	}
        function loadReviews() {
            return $timeout(function() {
                vm.reviews = vm.reviews || [
                    { id: 1, name: 'All reviews'},
                    { id: 2, name: '5 star'},
                    { id: 2, name: '4 star'},
                    { id: 2, name: '3 star'},
                    { id: 2, name: '2 star'},
                    { id: 2, name: '1 star'}
                ];
            }, 300);
        }
    }
})();
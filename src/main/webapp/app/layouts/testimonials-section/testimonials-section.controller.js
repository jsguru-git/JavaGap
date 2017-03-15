(function() {
    'use strict';

   var app = angular
        .module('javagapApp')
        .controller('TestimonialsSectionController', TestimonialsSectionController);
    TestimonialsSectionController.$inject = ['$scope', '$window', 'Testimonial'];

    function TestimonialsSectionController ($scope, $window, Testimonial) {
        var vm = this;
        vm.slideShow = true;

        vm.start = function () {
            vm.slideShow = true;
        }
        vm.stop = function () {
            vm.slideShow = false;
        }

        var w = angular.element($window);
        var ww = angular.element(document.querySelector('.carousel-wrapper'));
        vm.slideWidth = ww.width();
        
        w.bind('resize', function () {
            vm.slideWidth = ww.width();
            $scope.$apply();
        });
        vm.testimonials = [];

        loadAll();

        function loadAll() {
            Testimonial.query(function(result) {
                if(result.length > 3) {
                    var i;
                    for(i = 0; i < 3; i++) {
                        vm.testimonials.push(result[i]);
                    }
                } else {
                    vm.testimonials = result;    
                }
            });
        }
    }
})();
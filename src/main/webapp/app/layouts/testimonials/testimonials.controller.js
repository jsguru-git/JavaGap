(function() {
    'use strict';

   var app = angular
        .module('javagapApp')
        .controller('TestimonialsController', TestimonialsController);
    TestimonialsController.$inject = ['$scope', '$window'];

    function TestimonialsController ($scope, $window) {
        var vm = this;
        vm.slideShow = true;

        vm.start = function () {
            vm.slideShow = true;
        }
        vm.stop = function () {
            vm.slideShow = false;
        }

        var w = angular.element($window);
        vm.slideWidth = w.width();
        
        w.bind('resize', function () {
            vm.slideWidth = w.width();
            $scope.$apply();
        });

        var titles = ['RYAN BAILEY', 'BRIAN SCOTT', 'SCOTT ROSENBERG'];
        var texts = [
                    'I was lucky to be one of the first to use Attractor theme, I used other review style themes in the past, but none of them were as solid, effective and good looking as this one. Now this theme is all I use for my review sites.',
                    'Load in what your customers are saying about your business. Finally a really simple way to manage testimonials on your site. Now this the is all I need to buid something great for my clients.',
                    'Load in what your customers are saying about your business. A simple way to manage testimonials on your site. I’m not much of a programmer and this saved me a ton of time trying to get a website done.'
                    ];
        vm.contents = buildContents({
            title: "",
            text: ""
        });

        function buildContents (contentTmpl) {
            var it, results = [];
            
            for(var j=0; j<3; j++) {
                it = angular.extend({}, contentTmpl);
                it.title = titles[j];
                it.text = texts[j];

                results.push(it);
            }
            return results;
        }
    }
})();
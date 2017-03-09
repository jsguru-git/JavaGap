(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('FooterController', FooterController);

    FooterController.$inject = ['$scope', '$window', 'ReportIssuePopupService', 'RequestCoursePopupService'];

    function FooterController ($scope, $window, ReportIssuePopupService, RequestCoursePopupService) {
    	var vm = this;
    	vm.reportIssue = reportIssue;
    	vm.requestCourse = requestCourse;
    	vm.contactUs = contactUs;
        vm.aboutUs = aboutUs;
    	vm.gotoTop = gotoTop;
    	
    	function reportIssue() {
    		ReportIssuePopupService.open();
    	}

    	function requestCourse() {
    		RequestCoursePopupService.open();
    	}

        function contactUs() {
            if(global.is_front_page === 'false') {
                $window.location.href = '#contact';
            }
        }

    	function aboutUs() {
            if(global.is_front_page === 'false') {
                $window.location.href = '#about-us';
            }
        }

        function gotoTop() {
            $('html, body').animate({scrollTop: 0}, 0);
        }
    }
})();

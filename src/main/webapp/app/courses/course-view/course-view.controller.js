(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('CourseViewController', CourseViewController);

    CourseViewController.$inject = ['$sce', '$state', 'CourseByName', 'IncWatchedCount'];

    function CourseViewController ($sce, $state, CourseByName, IncWatchedCount) {
        var vm = this;
        vm.name = $state.params.name;
        vm.incWatchedCount = incWatchedCount;
        vm.courseEntity = {}; 
        vm.mediaConfig = {};
        vm.watchCount = 0;
        vm.flag = false;
        vm.hasCourse = false;

        CourseByName.get({name: vm.name}, (data) => {
	       	vm.courseEntity = data;
	       	vm.mediaConfig = getMediaConfig(vm.courseEntity.videoLink);
	       	vm.watchCount = vm.courseEntity.watchCount;
	       	vm.hasCourse = true;
	    }, () => {
	    	vm.hasCourse = false;
	    }).$promise;

        function getMediaConfig(video_url) {
        	var config = {};
	        if(video_url) {
	        	config = {
					sources: [
						{src: $sce.trustAsResourceUrl(video_url + '.mp4').toString(), type: "video/mp4"},
						{src: $sce.trustAsResourceUrl(video_url + '.webm').toString(), type: "video/webm"},
						{src: $sce.trustAsResourceUrl(video_url + '.ogg').toString(), type: "video/ogg"}
					],
					tracks: [
						{
							src: "http://www.videogular.com/assets/subs/pale-blue-dot.vtt",
							kind: "subtitles",
							srclang: "en",
							label: "English",
							default: ""
						}
					],
					theme: "bower_components/videogular-themes-default/videogular.css",
					plugins: {
						poster: "http://www.videogular.com/assets/images/videogular.png"
					}
				};	
	        }
	        return config;
	    }
	    /*http://static.videogular.com/assets/videos/videogular*/
	    function incWatchedCount(courseName) {
	    	if(!vm.flag) {
	    		IncWatchedCount.increase({name: courseName}, function(data) {
		    		vm.watchCount = data.watchCount;
		    	});
		    	vm.flag = true;
	    	}
	    }
    }
})();
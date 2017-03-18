(function() {
    'use strict';

    angular
        .module('javagapApp')
        .controller('CourseViewController', CourseViewController);

    CourseViewController.$inject = ['$sce', 'RatingsService', '$state'];

    function CourseViewController ($sce, RatingsService, $state) {
        var vm = this;
        vm.rating = rating;
        vm.title = $state.params.title;
        alert(vm.title);
        vm.courseEntity = $state.params.courseEntity;
        vm.video_url = vm.courseEntity.videoLink;
        vm.config = {};
        if(vm.video_url) {

        	vm.config = {
				sources: [
					{src: $sce.trustAsResourceUrl(vm.video_url + '.mp4'), type: "video/mp4"},
					{src: $sce.trustAsResourceUrl(vm.video_url + '.webm'), type: "video/webm"},
					{src: $sce.trustAsResourceUrl(vm.video_url + '.ogg'), type: "video/ogg"}
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
        } else {
        	vm.config = {
				sources: [
					{src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.mp4"), type: "video/mp4"},
					{src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.webm"), type: "video/webm"},
					{src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.ogg"), type: "video/ogg"}
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
        
		function rating() {
			RatingsService.open();
		}
		
    }
})();
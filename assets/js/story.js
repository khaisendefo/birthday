
const swiper = new Swiper('.story', {
    loop: false, 
    speed: 800,  
    effect: 'fade', 
    on: {
        slideChange: function() {
            manageVideos();
        }
    },
    pagination: {
        el: '.swiper-pagination',
    },
});

function manageVideos() {
    const videos = document.querySelectorAll('.story__videos');
    
    videos.forEach((video, index) => {
        if (index === swiper.activeIndex) {
            video.play();  
        } else {
            video.pause(); 
            video.currentTime = 0; 
        }
    });
}

manageVideos();

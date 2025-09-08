// Initialize Swiper for T-shirt Slider
const tshirtSwiper = new Swiper(".tshirtSwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
        el: ".tshirtSwiper .swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".tshirtSwiper .swiper-button-next",
        prevEl: ".tshirtSwiper .swiper-button-prev",
    },
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    loop: true,
    effect: 'slide',
    speed: 800,
    grabCursor: true,
    keyboard: {
        enabled: true,
    },
    mousewheel: {
        forceToAxis: true,
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
        1200: {
            slidesPerView: 4,
            spaceBetween: 30,
        }
    }
});

// Pause autoplay on hover for t-shirt slider
const tshirtContainer = document.querySelector('.tshirtSwiper');
if (tshirtContainer) {
    tshirtContainer.addEventListener('mouseenter', function () {
        tshirtSwiper.autoplay.stop();
    });

    tshirtContainer.addEventListener('mouseleave', function () {
        tshirtSwiper.autoplay.start();
    });
}

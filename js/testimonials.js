// Testimonials JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Swiper for Testimonials
    const testimonialSwiper = new Swiper(".testimonialSwiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2
            },
            1024: {
                slidesPerView: 3
            }
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
        }
    });

    // Pause autoplay on hover
    const testimonialContainer = document.querySelector('.testimonialSwiper');
    if (testimonialContainer) {
        testimonialContainer.addEventListener('mouseenter', function() {
            testimonialSwiper.autoplay.stop();
        });

        testimonialContainer.addEventListener('mouseleave', function() {
            testimonialSwiper.autoplay.start();
        });
    }

    // Add fade effect to testimonials
    const testimonials = document.querySelectorAll('.testimonial');
    testimonials.forEach((testimonial, index) => {
        testimonial.style.animationDelay = `${index * 0.2}s`;
        testimonial.classList.add('fade-in');
    });

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
        tshirtContainer.addEventListener('mouseenter', function() {
            tshirtSwiper.autoplay.stop();
        });

        tshirtContainer.addEventListener('mouseleave', function() {
            tshirtSwiper.autoplay.start();
        });
    }

    // Add CSS for fade-in animation
    const style = document.createElement('style');
    style.textContent = `
        .testimonial {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease;
        }
        
        .testimonial.fade-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .swiper-pagination-bullet {
            background: rgba(255, 255, 255, 0.5);
            opacity: 1;
            transition: all 0.3s ease;
        }
        
        .swiper-pagination-bullet-active {
            background: var(--primary-color);
            transform: scale(1.2);
        }
        
        .testimonial:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
    `;
    document.head.appendChild(style);
});

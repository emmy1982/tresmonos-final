// ===== TATTOOS GALLERY FUNCTIONALITY =====

document.addEventListener('DOMContentLoaded', function() {
    // Initialize gallery functionality
    initGallery();
    initURLHashNavigation();
    initCustomLightbox();
});

// Initialize gallery
function initGallery() {
    console.log('Tattoos Gallery initialized');
    
    // Add loading animation to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
}

// Initialize URL hash navigation
function initURLHashNavigation() {
    const hash = window.location.hash.substring(1);
    const validCategories = ['realismo', 'blackwork', 'anime', 'ornamental', 'cover', 'linea-fina'];
    
    if (hash && validCategories.includes(hash)) {
        // Scroll to the specific category
        setTimeout(() => {
            scrollToCategory(hash);
        }, 500); // Delay to ensure page is loaded
    }
}

// Scroll to specific category
function scrollToCategory(categoryId) {
    const categoryElement = document.getElementById(categoryId);
    if (categoryElement) {
        categoryElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Custom Lightbox functionality
let currentImageIndex = 0;
let currentImages = [];

function initCustomLightbox() {
    const galleryLinks = document.querySelectorAll('.gallery-link');
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    // Collect all images for navigation
    currentImages = Array.from(galleryLinks).map(link => ({
        src: link.getAttribute('data-src'),
        title: link.getAttribute('data-title')
    }));

    // Add click event to each gallery link
    galleryLinks.forEach((link, index) => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            currentImageIndex = index;
            openLightbox();
        });
    });

    // Close lightbox events
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxModal.addEventListener('click', function(e) {
        if (e.target === lightboxModal) {
            closeLightbox();
        }
    });

    // Navigation events
    lightboxPrev.addEventListener('click', function(e) {
        e.stopPropagation();
        previousImage();
    });

    lightboxNext.addEventListener('click', function(e) {
        e.stopPropagation();
        nextImage();
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightboxModal.classList.contains('show')) {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    previousImage();
                    break;
                case 'ArrowRight':
                    nextImage();
                    break;
            }
        }
    });

    function openLightbox() {
        updateLightboxContent();
        lightboxModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightboxModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    function updateLightboxContent() {
        const currentImage = currentImages[currentImageIndex];
        lightboxImage.src = currentImage.src;
        lightboxImage.alt = currentImage.title;
    }

    function previousImage() {
        currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : currentImages.length - 1;
        updateLightboxContent();
    }

    function nextImage() {
        currentImageIndex = currentImageIndex < currentImages.length - 1 ? currentImageIndex + 1 : 0;
        updateLightboxContent();
    }
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Handle window resize
window.addEventListener('resize', function() {
    // Recalculate gallery layout if needed
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        // Reset any transform that might be affected by resize
        item.style.transform = '';
    });
});

// Handle page visibility change (for performance)
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden, pause any animations
        document.body.style.animationPlayState = 'paused';
    } else {
        // Page is visible, resume animations
        document.body.style.animationPlayState = 'running';
    }
});

// Initialize all functionality
function initAll() {
    initSmoothScroll();
}

// Call initAll when DOM is ready
document.addEventListener('DOMContentLoaded', initAll);

// Export functions for potential external use
window.TattoosGallery = {
    scrollToCategory,
    initCustomLightbox
};
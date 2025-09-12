// Detectar iOS para solucionar background-attachment: fixed
function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
           (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

// Aplicar clase para iOS
if (isIOS()) {
    document.documentElement.classList.add('ios-device');
}

// Efecto Parallax simplificado
function initParallax() {
    // Solo aplicar JavaScript parallax para iOS
    if (isIOS()) {
        console.log('iOS detectado - aplicando parallax JavaScript');
        
        const parallaxElements = document.querySelectorAll('.events-section, .banner-studio-container');
        
        // Aplicar clase para deshabilitar parallax CSS
        document.documentElement.classList.add('no-parallax-support');
        
        // Implementar parallax con JavaScript
        function updateParallax() {
            const scrollTop = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const speed = 0.5;
                
                // Solo aplicar parallax si el elemento está visible
                if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
                    const yPos = -(scrollTop * speed);
                    element.style.backgroundPosition = `center ${50 + yPos * 0.1}%`;
                }
            });
        }
        
        // Throttle para mejor rendimiento
        let ticking = false;
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }
        
        function handleScroll() {
            ticking = false;
            requestTick();
        }
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        updateParallax();
    } else {
        console.log('Navegador compatible - usando parallax CSS nativo');
    }
}

// Inicializar parallax cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initParallax);
} else {
    initParallax();
}

// Video Modal
const videoLinks = document.querySelectorAll('.video-link');
 const videoModal = document.getElementById('videoModal');
 const closeVideo = document.querySelector('.close-video');
 const iframe = document.getElementById('youtubeIframe');
 
 // Open modal when clicking on video link
 videoLinks.forEach(link => {
     link.addEventListener('click', function(e) {
         e.preventDefault();
         const videoId = this.getAttribute('data-video-id');
         iframe.src = `https://www.youtube.com/embed/TP8N1a-edBE?autoplay=1&rel=0`;
         videoModal.style.display = 'block';
         document.body.classList.add('no-scroll');
     });
 });
 
 // Close modal when clicking on close button
 closeVideo.addEventListener('click', function() {
     videoModal.style.display = 'none';
     iframe.src = '';
     document.body.classList.remove('no-scroll');
 });
 
 // Close modal when clicking outside of it
 window.addEventListener('click', function(e) {
     if (e.target == videoModal) {
         videoModal.style.display = 'none';
         iframe.src = '';
         document.body.classList.remove('no-scroll');
     }
 });
 
 // Close modal with Escape key
 document.addEventListener('keydown', function(e) {
     if (e.key === 'Escape' && videoModal.style.display === 'block') {
         videoModal.style.display = 'none';
         iframe.src = '';
         document.body.classList.remove('no-scroll');
     }
 });
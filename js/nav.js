// Navigation JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.main-header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-links a');
    const hamburgerLines = document.querySelectorAll('.hamburger-line');

    // Scroll effect for header
    function handleScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }



    // Smooth scroll for navigation links
    function smoothScroll(e) {
        const targetId = this.getAttribute('href');
        
        // Only apply smooth scroll to anchor links (starting with #)
        if (targetId && targetId.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
        // For external links (like ./views/tattoos.html), let the browser handle navigation normally
    }

    // Mobile menu toggle
    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        
        // Animate hamburger lines
        hamburgerLines.forEach((line, index) => {
            if (mobileMenu.classList.contains('active')) {
                if (index === 0) {
                    line.style.transform = 'rotate(45deg) translate(5px, 5px)';
                } else if (index === 1) {
                    line.style.opacity = '0';
                } else if (index === 2) {
                    line.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                }
            } else {
                line.style.transform = 'none';
                line.style.opacity = '1';
            }
        });
    }

    // Close mobile menu
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset hamburger lines
        hamburgerLines.forEach(line => {
            line.style.transform = 'none';
            line.style.opacity = '1';
        });
    }

    // Add scroll effect to nav links
    function addScrollEffect() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            const mobileNavLink = document.querySelector(`.mobile-nav-links a[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active class from all links
                document.querySelectorAll('.nav-link, .mobile-nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section link
                if (navLink) {
                    navLink.classList.add('active');
                }
                if (mobileNavLink) {
                    mobileNavLink.classList.add('active');
                }
            }
        });
    }

    // Parallax effect for hero background
    function parallaxEffect() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }

    // Initialize animations
    function initAnimations() {
        // Animate nav links on hover
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });


    }

    // Event listeners
    window.addEventListener('scroll', () => {
        handleScroll();
        addScrollEffect();
        parallaxEffect();
    });

    // Mobile menu event listeners
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    mobileMenuClose.addEventListener('click', closeMobileMenu);

    // Close mobile menu when clicking outside
    mobileMenu.addEventListener('click', function(e) {
        if (e.target === this) {
            closeMobileMenu();
        }
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });

    // Add smooth scroll to all navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });

    // Initialize everything
    handleScroll();
    initAnimations();

    // Add CSS for active nav links
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active,
        .mobile-nav-links a.active {
            color: var(--primary-color) !important;
        }
        
        .nav-link.active::after {
            width: 100% !important;
        }
        
        .mobile-nav-links a.active {
            border-bottom: 2px solid var(--primary-color);
        }
    `;
    document.head.appendChild(style);
});

// Additional utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll performance
const optimizedScroll = debounce(() => {
    // Scroll handling is already optimized above
}, 10);

window.addEventListener('scroll', optimizedScroll);

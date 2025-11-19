// ===== SISTEMA DE GESTIÓN DE COOKIES - TRES MONOS INK =====
// Cumplimiento RGPD/GDPR

class CookieConsent {
    constructor() {
        this.cookieName = 'tresmonos_cookie_consent';
        this.cookieExpiry = 365; // días
        this.init();
    }

    init() {
        // Verificar si ya hay consentimiento guardado
        const consent = this.getConsent();
        
        if (!consent) {
            // Mostrar banner si no hay consentimiento
            setTimeout(() => {
                this.showBanner();
            }, 1000);
        } else {
            // Aplicar configuración guardada
            this.applyConsent(consent);
            // Mostrar badge de revisión
            this.showReviewBadge();
        }

        // Event listeners
        this.attachEventListeners();
    }

    attachEventListeners() {
        // Botones del banner
        const acceptBtn = document.getElementById('cookie-accept');
        const rejectBtn = document.getElementById('cookie-reject');
        const settingsBtn = document.getElementById('cookie-settings');

        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => this.acceptAll());
        }
        if (rejectBtn) {
            rejectBtn.addEventListener('click', () => this.rejectAll());
        }
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => this.openSettings());
        }

        // Panel de configuración
        const closeSettings = document.getElementById('cookie-settings-close');
        const saveSettings = document.getElementById('cookie-save-settings');
        const settingsOverlay = document.getElementById('cookie-settings-overlay');

        if (closeSettings) {
            closeSettings.addEventListener('click', () => this.closeSettings());
        }
        if (saveSettings) {
            saveSettings.addEventListener('click', () => this.saveSettings());
        }
        if (settingsOverlay) {
            settingsOverlay.addEventListener('click', () => this.closeSettings());
        }

        // Enlace del footer para abrir configuración de cookies
        const footerCookieLink = document.getElementById('open-cookie-settings');
        if (footerCookieLink) {
            footerCookieLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.openSettings();
            });
        }
    }

    showBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.classList.add('show');
        }
    }

    hideBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.classList.remove('show');
        }
    }

    openSettings() {
        const panel = document.getElementById('cookie-settings-panel');
        const overlay = document.getElementById('cookie-settings-overlay');
        
        if (panel && overlay) {
            panel.classList.add('show');
            overlay.classList.add('show');
            document.body.style.overflow = 'hidden';
        }

        // Cargar preferencias actuales
        this.loadCurrentPreferences();
    }

    closeSettings() {
        const panel = document.getElementById('cookie-settings-panel');
        const overlay = document.getElementById('cookie-settings-overlay');
        
        if (panel && overlay) {
            panel.classList.remove('show');
            overlay.classList.remove('show');
            document.body.style.overflow = '';
        }
    }

    acceptAll() {
        const consent = {
            necessary: true,
            analytics: true,
            marketing: true,
            timestamp: new Date().toISOString()
        };
        
        this.saveConsent(consent);
        this.applyConsent(consent);
        this.hideBanner();
        this.showReviewBadge();
        
        console.log('✅ Todas las cookies aceptadas');
    }

    rejectAll() {
        const consent = {
            necessary: true, // Las necesarias siempre están activas
            analytics: false,
            marketing: false,
            timestamp: new Date().toISOString()
        };
        
        this.saveConsent(consent);
        this.applyConsent(consent);
        this.hideBanner();
        this.showReviewBadge();
        
        console.log('❌ Cookies opcionales rechazadas');
    }

    saveSettings() {
        const analyticsCheckbox = document.getElementById('cookie-analytics');
        const marketingCheckbox = document.getElementById('cookie-marketing');
        
        const consent = {
            necessary: true,
            analytics: analyticsCheckbox ? analyticsCheckbox.checked : false,
            marketing: marketingCheckbox ? marketingCheckbox.checked : false,
            timestamp: new Date().toISOString()
        };
        
        this.saveConsent(consent);
        this.applyConsent(consent);
        this.closeSettings();
        this.hideBanner();
        this.showReviewBadge();
        
        console.log('⚙️ Preferencias de cookies guardadas:', consent);
    }

    loadCurrentPreferences() {
        const consent = this.getConsent();
        if (consent) {
            const analyticsCheckbox = document.getElementById('cookie-analytics');
            const marketingCheckbox = document.getElementById('cookie-marketing');
            
            if (analyticsCheckbox) analyticsCheckbox.checked = consent.analytics;
            if (marketingCheckbox) marketingCheckbox.checked = consent.marketing;
        }
    }

    saveConsent(consent) {
        const consentString = JSON.stringify(consent);
        const expiryDate = new Date();
        expiryDate.setTime(expiryDate.getTime() + (this.cookieExpiry * 24 * 60 * 60 * 1000));
        
        document.cookie = `${this.cookieName}=${consentString};expires=${expiryDate.toUTCString()};path=/;SameSite=Lax`;
    }

    getConsent() {
        const name = this.cookieName + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(';');
        
        for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i].trim();
            if (cookie.indexOf(name) === 0) {
                const consentString = cookie.substring(name.length, cookie.length);
                try {
                    return JSON.parse(consentString);
                } catch (e) {
                    return null;
                }
            }
        }
        return null;
    }

    applyConsent(consent) {
        // Cookies necesarias (siempre activas)
        // Aquí no se hace nada especial, ya están permitidas

        // Cookies de analíticas (Google Analytics, etc.)
        if (consent.analytics) {
            this.enableAnalytics();
        } else {
            this.disableAnalytics();
        }

        // Cookies de marketing (Facebook Pixel, Google Ads, etc.)
        if (consent.marketing) {
            this.enableMarketing();
        } else {
            this.disableMarketing();
        }
    }

    enableAnalytics() {
        // Si tienes Google Analytics, descomenta y configura esto:
        /*
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'TU-ID-DE-GOOGLE-ANALYTICS');
        
        // Cargar script de Google Analytics
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=TU-ID-DE-GOOGLE-ANALYTICS';
        document.head.appendChild(script);
        */
        
        console.log('📊 Google Analytics habilitado');
    }

    disableAnalytics() {
        // Deshabilitar Google Analytics
        window['ga-disable-TU-ID-DE-GOOGLE-ANALYTICS'] = true;
        console.log('📊 Google Analytics deshabilitado');
    }

    enableMarketing() {
        // Si tienes Facebook Pixel u otras herramientas de marketing, configúralas aquí
        /*
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', 'TU-PIXEL-ID');
        fbq('track', 'PageView');
        */
        
        console.log('📢 Cookies de marketing habilitadas');
    }

    disableMarketing() {
        console.log('📢 Cookies de marketing deshabilitadas');
    }

    showReviewBadge() {
        // Badge deshabilitado - ya no se muestra
        // Los usuarios pueden acceder a la configuración desde el footer
    }

    // Método público para revisar consentimiento (útil para debugging)
    checkConsent() {
        const consent = this.getConsent();
        console.table(consent);
        return consent;
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.cookieConsent = new CookieConsent();
});

// Exponer método para debugging en consola
// Usar: cookieConsent.checkConsent() en la consola del navegador


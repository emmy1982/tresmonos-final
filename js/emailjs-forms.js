// ===================================
// CONFIGURACIÓN DE EMAILJS
// ===================================
// IMPORTANTE: Reemplaza estos valores con tus propias credenciales de EmailJS
// Puedes obtenerlas en: https://www.emailjs.com/

const EMAILJS_CONFIG = {
    PUBLIC_KEY: '5Glr0E5OxgVwQE2F_',  // Reemplaza con tu Public Key
    SERVICE_ID: 'service_vvgyld7',  // Reemplaza con tu Service ID
    NEWSLETTER_TEMPLATE_ID: 'template_8siepqu',  // Template para newsletter
    CONTACT_TEMPLATE_ID: 'template_1mmjgyh'  // Template para formulario de contacto
};

// ===================================
// INICIALIZAR EMAILJS
// ===================================
(function() {
    // Verificar que EmailJS esté cargado
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        console.log('EmailJS inicializado correctamente');
    } else {
        console.error('EmailJS no está cargado. Verifica que la librería esté incluida en el HTML.');
    }
})();

// ===================================
// FORMULARIO DE NEWSLETTER (FOOTER)
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitButton = this.querySelector('button[type="submit"]');
            const email = emailInput.value.trim();
            
            // Validación básica
            if (!email || !validateEmail(email)) {
                showNotification('Por favor, ingresa un email válido', 'error');
                emailInput.focus();
                return;
            }
            
            // Deshabilitar botón y mostrar loading
            const originalButtonText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            
            // Preparar datos para enviar
            const templateParams = {
                user_email: email,
                from_name: email,
                to_name: 'Tres Monos Ink',
                message: 'Nueva suscripción a newsletter'
            };
            
            // Enviar con EmailJS
            emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.NEWSLETTER_TEMPLATE_ID,
                templateParams
            ).then(function(response) {
                console.log('Newsletter enviado exitosamente', response);
                showNotification('¡Gracias por suscribirte! Te mantendremos informado.', 'success');
                emailInput.value = '';
                
                // Restaurar botón
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
                
            }, function(error) {
                console.error('Error al enviar newsletter:', error);
                showNotification('Hubo un error al procesar tu suscripción. Por favor, intenta de nuevo.', 'error');
                
                // Restaurar botón
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            });
        });
    });
});

// ===================================
// FORMULARIO DE CONTACTO
// ===================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        
        // Obtener valores del formulario
        const formData = {
            nombre: document.getElementById('nombre').value.trim(),
            apellidos: document.getElementById('apellidos').value.trim(),
            email: document.getElementById('email').value.trim(),
            telefono: document.getElementById('telefono').value.trim(),
            servicio: document.getElementById('servicio').value,
            mensaje: document.getElementById('mensaje').value.trim()
        };
        
        // Validaciones
        if (!formData.nombre || !formData.apellidos || !formData.email || !formData.telefono || !formData.mensaje) {
            showNotification('Por favor, completa todos los campos obligatorios', 'error');
            return;
        }
        
        if (!validateEmail(formData.email)) {
            showNotification('Por favor, ingresa un email válido', 'error');
            document.getElementById('email').focus();
            return;
        }
        
        // Deshabilitar botón y mostrar loading
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        
        // Preparar datos para EmailJS
        const templateParams = {
            from_name: `${formData.nombre} ${formData.apellidos}`,
            user_email: formData.email,
            user_phone: formData.telefono,
            service: formData.servicio || 'No especificado',
            message: formData.mensaje,
            to_name: 'Tres Monos Ink'
        };
        
        // Enviar con EmailJS
        emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.CONTACT_TEMPLATE_ID,
            templateParams
        ).then(function(response) {
            console.log('Formulario de contacto enviado exitosamente', response);
            showNotification('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
            contactForm.reset();
            
            // Restaurar botón
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
            
        }, function(error) {
            console.error('Error al enviar formulario de contacto:', error);
            showNotification('Hubo un error al enviar tu mensaje. Por favor, intenta de nuevo.', 'error');
            
            // Restaurar botón
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        });
    });
    
    // Validación en tiempo real
    const inputs = document.querySelectorAll('#contactForm input[required], #contactForm textarea[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.style.borderColor = '#e74c3c';
            } else {
                this.style.borderColor = '#2ecc71';
            }
        });
    });
    
    // Validación de email
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                this.style.borderColor = '#e74c3c';
            } else if (this.value) {
                this.style.borderColor = '#2ecc71';
            }
        });
    }
}

// ===================================
// FUNCIONES AUXILIARES
// ===================================

// Validar formato de email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Mostrar notificaciones
function showNotification(message, type = 'info') {
    // Remover notificaciones anteriores
    const existingNotification = document.querySelector('.emailjs-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Crear notificación
    const notification = document.createElement('div');
    notification.className = `emailjs-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Mostrar con animación
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Auto-ocultar después de 5 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ===================================
// ESTILOS PARA LAS NOTIFICACIONES
// ===================================
const style = document.createElement('style');
style.textContent = `
    .emailjs-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        max-width: 400px;
        z-index: 10000;
        transform: translateX(450px);
        transition: transform 0.3s ease;
        border-left: 4px solid #3498db;
    }
    
    .emailjs-notification.show {
        transform: translateX(0);
    }
    
    .emailjs-notification.success {
        border-left-color: #2ecc71;
    }
    
    .emailjs-notification.error {
        border-left-color: #e74c3c;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
    }
    
    .notification-content i {
        font-size: 20px;
    }
    
    .emailjs-notification.success .notification-content i {
        color: #2ecc71;
    }
    
    .emailjs-notification.error .notification-content i {
        color: #e74c3c;
    }
    
    .emailjs-notification.info .notification-content i {
        color: #3498db;
    }
    
    .notification-content span {
        color: #333;
        font-size: 14px;
        line-height: 1.4;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: #999;
        cursor: pointer;
        padding: 5px;
        font-size: 18px;
        transition: color 0.2s;
    }
    
    .notification-close:hover {
        color: #333;
    }
    
    @media (max-width: 768px) {
        .emailjs-notification {
            left: 20px;
            right: 20px;
            max-width: none;
        }
    }
`;
document.head.appendChild(style);


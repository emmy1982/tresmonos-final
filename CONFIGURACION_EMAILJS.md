# 📧 Configuración de EmailJS para Tres Monos Ink

Este documento te guiará paso a paso para configurar EmailJS y hacer que los formularios de tu sitio web funcionen correctamente.

## 📋 Índice

1. [Crear cuenta en EmailJS](#1-crear-cuenta-en-emailjs)
2. [Configurar servicio de email](#2-configurar-servicio-de-email)
3. [Crear plantillas de email](#3-crear-plantillas-de-email)
4. [Obtener credenciales](#4-obtener-credenciales)
5. [Configurar el código](#5-configurar-el-código)
6. [Probar los formularios](#6-probar-los-formularios)

---

## 1. Crear cuenta en EmailJS

1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Haz clic en **"Sign Up"** o **"Get Started"**
3. Registra tu cuenta con tu email
4. Verifica tu email y completa el registro

---

## 2. Configurar servicio de email

Una vez dentro de tu cuenta de EmailJS:

1. Ve a la sección **"Email Services"** en el menú lateral
2. Haz clic en **"Add New Service"**
3. Selecciona tu proveedor de email (Gmail, Outlook, etc.)
4. Sigue las instrucciones para conectar tu cuenta de email
5. Dale un nombre descriptivo al servicio (ej: "TresMonosInk_Gmail")
6. **Copia el SERVICE ID** que aparece (lo necesitarás más adelante)

### Configuración recomendada para Gmail:

- Ve a tu cuenta de Google
- Activa la **verificación en dos pasos**
- Genera una **contraseña de aplicación** específica para EmailJS
- Usa esta contraseña en la configuración de EmailJS

---

## 3. Crear plantillas de email

Necesitas crear **DOS plantillas**: una para el newsletter y otra para el formulario de contacto.

### 3.1 Plantilla para Newsletter

1. Ve a **"Email Templates"** en el menú lateral
2. Haz clic en **"Create New Template"**
3. Usa esta configuración:

**Nombre de la plantilla:** `Newsletter Subscription`

**Subject (Asunto):**
```
Nueva suscripción a Newsletter - Tres Monos Ink
```

**Content (Contenido):**
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #1a1a1a; color: white; padding: 20px; text-align: center; }
        .content { background: #f4f4f4; padding: 20px; }
        .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🐒 Nueva Suscripción</h1>
        </div>
        <div class="content">
            <h2>Nuevo suscriptor al Newsletter</h2>
            <p><strong>Email:</strong> {{user_email}}</p>
            <p><strong>Fecha:</strong> {{fecha}}</p>
            <hr>
            <p>Un nuevo usuario se ha suscrito a tu newsletter de Tres Monos Ink.</p>
            <p>Asegúrate de agregarlo a tu lista de contactos para enviarle novedades y promociones.</p>
        </div>
        <div class="footer">
            <p>Tres Monos Ink | Atarfe, Granada</p>
            <p>© 2025 Todos los derechos reservados</p>
        </div>
    </div>
</body>
</html>
```

4. Guarda la plantilla y **copia el TEMPLATE ID**

### 3.2 Plantilla para Formulario de Contacto

1. Crea otra nueva plantilla
2. Usa esta configuración:

**Nombre de la plantilla:** `Contact Form`

**Subject (Asunto):**
```
Nuevo mensaje de contacto - {{from_name}}
```

**Content (Contenido):**
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #1a1a1a; color: white; padding: 20px; text-align: center; }
        .content { background: #f4f4f4; padding: 20px; }
        .info-box { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; }
        .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>✉️ Nuevo Mensaje de Contacto</h1>
        </div>
        <div class="content">
            <h2>Detalles del contacto:</h2>
            
            <div class="info-box">
                <p><strong>👤 Nombre:</strong> {{from_name}}</p>
                <p><strong>📧 Email:</strong> {{user_email}}</p>
                <p><strong>📱 Teléfono:</strong> {{user_phone}}</p>
                <p><strong>🎯 Servicio de Interés:</strong> {{service}}</p>
            </div>
            
            <div class="info-box">
                <h3>💬 Mensaje:</h3>
                <p>{{message}}</p>
            </div>
            
            <hr>
            <p style="font-size: 14px; color: #666;">
                Responde a este mensaje lo antes posible para ofrecer un excelente servicio al cliente.
            </p>
        </div>
        <div class="footer">
            <p>Tres Monos Ink | Atarfe, Granada</p>
            <p>© 2025 Todos los derechos reservados</p>
        </div>
    </div>
</body>
</html>
```

3. Guarda la plantilla y **copia el TEMPLATE ID**

---

## 4. Obtener credenciales

Ahora necesitas obtener tu **Public Key**:

1. Ve a la sección **"Account"** en el menú lateral
2. Busca **"API Keys"** o **"General"**
3. Encontrarás tu **Public Key** (algo como: "user_xxxxxxxxxxxx")
4. **Cópialo** (lo necesitarás en el siguiente paso)

---

## 5. Configurar el código

Ahora que tienes todas las credenciales, abre el archivo:

📁 **`js/emailjs-forms.js`**

En las primeras líneas encontrarás este código:

```javascript
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'TU_PUBLIC_KEY_AQUI',  
    SERVICE_ID: 'TU_SERVICE_ID_AQUI',  
    NEWSLETTER_TEMPLATE_ID: 'TU_TEMPLATE_ID_NEWSLETTER',  
    CONTACT_TEMPLATE_ID: 'TU_TEMPLATE_ID_CONTACTO'  
};
```

**Reemplaza** cada valor con tus credenciales:

```javascript
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'user_xxxxxxxxxxxx',  // Tu Public Key de EmailJS
    SERVICE_ID: 'service_xxxxxxx',    // Tu Service ID
    NEWSLETTER_TEMPLATE_ID: 'template_xxxxxxx',  // ID de la plantilla de newsletter
    CONTACT_TEMPLATE_ID: 'template_yyyyyyy'      // ID de la plantilla de contacto
};
```

### ⚠️ IMPORTANTE

- Guarda el archivo después de hacer los cambios
- Asegúrate de que las comillas estén correctas
- No compartas estas credenciales públicamente

---

## 6. Probar los formularios

### Probar el Newsletter (Footer)

1. Abre cualquier página de tu sitio web
2. Baja hasta el footer
3. Ingresa un email en el formulario de "Suscríbete"
4. Haz clic en **"Suscribir"**
5. Deberías ver una notificación de éxito
6. Revisa tu email para confirmar que llegó el mensaje

### Probar el Formulario de Contacto

1. Ve a la página de **Contacto** (`views/contacto.html`)
2. Completa todos los campos del formulario
3. Haz clic en **"Enviar Mensaje"**
4. Deberías ver una notificación de éxito
5. Revisa tu email para confirmar que llegó el mensaje

---

## 🎨 Personalización adicional

### Cambiar el diseño de las notificaciones

Las notificaciones que aparecen cuando se envía un formulario están definidas en el mismo archivo `js/emailjs-forms.js` al final del código, en la sección de estilos.

Puedes personalizar:
- Colores
- Tamaño
- Posición
- Animaciones

### Cambiar el email de destino

Por defecto, los emails se envían al email configurado en tu servicio de EmailJS. Si quieres cambiar el destinatario:

1. Ve a tus plantillas en EmailJS
2. En la sección **"To email"** cambia el email de destino
3. Puedes usar variables como `{{to_email}}` si quieres hacerlo dinámico

---

## 🐛 Solución de problemas

### Los formularios no envían nada

- Verifica que hayas guardado correctamente las credenciales en `js/emailjs-forms.js`
- Abre la consola del navegador (F12) y busca errores
- Asegúrate de que la librería de EmailJS se está cargando correctamente

### Los emails no llegan

- Verifica que el servicio de email esté correctamente configurado en EmailJS
- Revisa tu carpeta de spam
- Asegúrate de que el email de destino sea correcto en las plantillas

### Error "Public Key is required"

- Verifica que tu Public Key esté correctamente copiado
- Asegúrate de que las comillas estén bien colocadas
- Recarga la página después de guardar los cambios

### Límites de EmailJS

- La versión gratuita permite **200 emails por mes**
- Si necesitas más, considera actualizar a un plan de pago

---

## 📞 Soporte

Si tienes problemas con la configuración:

1. Revisa la documentación oficial de EmailJS: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
2. Verifica que todos los pasos estén completos
3. Revisa la consola del navegador en busca de errores específicos

---

## ✅ Checklist de configuración

- [ ] Cuenta de EmailJS creada
- [ ] Servicio de email configurado
- [ ] Plantilla de newsletter creada
- [ ] Plantilla de contacto creada
- [ ] Public Key obtenido
- [ ] Credenciales configuradas en `js/emailjs-forms.js`
- [ ] Formulario de newsletter probado
- [ ] Formulario de contacto probado
- [ ] Emails recibidos correctamente

---

¡Listo! Ahora tus formularios están completamente funcionales con EmailJS. 🎉

**Tres Monos Ink** - Donde el arte y la piel se unen


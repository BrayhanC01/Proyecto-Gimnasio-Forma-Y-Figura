/* ============================================
   IRON FORGE GYM — login.js (CORREGIDO)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---- ENVÍO DEL FORMULARIO DE LOGIN ----
    const formulario = document.getElementById('formularioLogin');
    if (formulario) {
        formulario.addEventListener('submit', (e) => {
            e.preventDefault();
            manejarLogin();
        });
    }

    // ---- ABRIR MODAL DE RECUPERACIÓN ----
    const enlaceOlvido = document.getElementById('enlaceOlvido');
    if (enlaceOlvido) {
        enlaceOlvido.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('modalOlvido').style.display = 'flex';
        });
    }

    // ---- CERRAR MODAL (Botón X) ----
    const btnCerrar = document.getElementById('cerrarModalOlvido');
    if (btnCerrar) {
        btnCerrar.addEventListener('click', cerrarModalRecuperacion);
    }

    // ---- CERRAR MODAL (Click fuera de la caja) ----
    const modal = document.getElementById('modalOlvido');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) cerrarModalRecuperacion();
        });
    }

    // ---- ENVIAR ENLACE DE RESTABLECER ----
    const btnEnviarEnlace = document.getElementById('botonEnviarEnlace');
    if (btnEnviarEnlace) {
        btnEnviarEnlace.addEventListener('click', enviarCorreoRecuperacion);
    }

    // ---- BOTÓN ENTENDIDO (Después del éxito) ----
    const btnEntendido = document.getElementById('botonExitoEntendido');
    if (btnEntendido) {
        btnEntendido.addEventListener('click', cerrarModalRecuperacion);
    }

    // ---- CONMUTADOR DE CONTRASEÑA (Ojo) ----
    const toggleBtn = document.querySelector('[data-toggle="password"]');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function () {
            const input = document.getElementById('contrasena');
            if (input.type === 'password') {
                input.type = 'text';
                this.textContent = '🙈';
            } else {
                input.type = 'password';
                this.textContent = '👁';
            }
        });
    }

    // ---- BOTONES SOCIALES ----
    document.querySelectorAll('[data-social]').forEach(btn => {
        btn.addEventListener('click', () => {
            const red = btn.getAttribute('data-social');
            console.log(`Iniciando sesión con ${red}`);
        });
    });

});

// ---- FUNCIÓN DE INICIO DE SESIÓN ----
function manejarLogin() {
    const correo     = document.getElementById('correo').value.trim();
    const contrasena = document.getElementById('contrasena').value;
    const btn        = document.getElementById('botonLogin');
    const btnTexto   = document.getElementById('textoBotonLogin');
    const cargador   = document.getElementById('cargadorLogin');

    if (!correo || !contrasena) {
        mostrarNotificacion('⚠️ Por favor, ingresa tus credenciales', 'error');
        return;
    }

    if (!validarEmail(correo)) {
        mostrarNotificacion('⚠️ El formato del correo es incorrecto', 'error');
        return;
    }

    // Estado de carga
    btn.disabled = true;
    btnTexto.style.opacity = '0.5';
    cargador.style.display = 'inline-block';

    // Simulación de autenticación
    setTimeout(() => {
        // En una app real, aquí validarías contra una base de datos
        const usuarioSesion = {
            nombre: 'Atleta Iron Forge',
            email: correo,
            rol: 'miembro'
        };

        localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioSesion));
        mostrarNotificacion('✅ ¡Acceso concedido! Entrando...', 'success');

        // Redirigir al dashboard después de un momento
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1200);

    }, 1800);
}

// ---- FUNCIÓN RECUPERAR CONTRASEÑA ----
function enviarCorreoRecuperacion() {
    const correo = document.getElementById('correoRestablecer').value.trim();
    
    if (!correo || !validarEmail(correo)) {
        mostrarNotificacion('⚠️ Ingresa un correo electrónico válido', 'error');
        return;
    }

    // Simular envío
    document.getElementById('formularioOlvido').style.display = 'none';
    document.getElementById('exitoRestablecer').style.display = 'block';
}

// ---- CERRAR Y RESETEAR MODAL ----
function cerrarModalRecuperacion() {
    document.getElementById('modalOlvido').style.display = 'none';
    // Esperamos un poco para resetear el contenido del modal sin que se vea el cambio
    setTimeout(() => {
        document.getElementById('formularioOlvido').style.display = 'block';
        document.getElementById('exitoRestablecer').style.display = 'none';
        document.getElementById('correoRestablecer').value = '';
    }, 300)
}

// ---- UTILIDADES ----
function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function mostrarNotificacion(msj, tipo) {
    const notif = document.getElementById('notificacion');
    if (notif) {
        notif.textContent = msj;
        notif.className = `notificacion-flotante mostrar ${tipo}`;
        
        setTimeout(() => {
            notif.className = 'notificacion-flotante';
        }, 3000);
    }
}
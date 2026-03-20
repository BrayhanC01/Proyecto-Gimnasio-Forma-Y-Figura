/* ============================================
   IRON FORGE GYM — registro.js (CORREGIDO)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---- ENVÍO DEL FORMULARIO ----
    const formulario = document.getElementById('formularioRegistro');
    if (formulario) {
        formulario.addEventListener('submit', (e) => {
            e.preventDefault();
            manejarRegistro();
        });
    }

    // ---- FUERZA DE CONTRASEÑA (En vivo) ----
    const inputPass = document.getElementById('contrasena');
    if (inputPass) {
        inputPass.addEventListener('input', function () {
            verificarFuerza(this.value);
        });
    }

    // ---- CONMUTADORES DE CONTRASEÑA (Mostrar/Ocultar) ----
    document.querySelectorAll('[data-toggle]').forEach(btn => {
        btn.addEventListener('click', function () {
            const targetId = this.getAttribute('data-toggle');
            const input = document.getElementById(targetId);
            
            if (input.type === 'password') {
                input.type = 'text';
                this.textContent = '🙈';
            } else {
                input.type = 'password';
                this.textContent = '👁';
            }
        });
    });

    // ---- BOTONES SOCIALES ----
    document.querySelectorAll('[data-social]').forEach(btn => {
        btn.addEventListener('click', () => {
            const redSocial = btn.getAttribute('data-social');
            alert(`Conectando con ${redSocial}...`);
        });
    });

});

// ---- FUNCIÓN PRINCIPAL DE REGISTRO ----
function manejarRegistro() {
    // Captura de elementos
    const nombre      = document.getElementById('nombre').value.trim();
    const apellido    = document.getElementById('apellido').value.trim();
    const correo      = document.getElementById('correo').value.trim();
    const contrasena  = document.getElementById('contrasena').value;
    const confirmar   = document.getElementById('confirmarContrasena').value;
    const plan        = document.getElementById('plan').value;
    const terminos    = document.getElementById('terminos').checked;
    
    // Elementos de UI (Botón y Cargador)
    const btn         = document.getElementById('botonRegistro');
    const btnTexto    = document.getElementById('textoBotonRegistro');
    const cargador    = document.getElementById('cargadorRegistro');

    // --- VALIDACIONES ---
    if (!nombre || !apellido || !correo || !contrasena) {
        mostrarNotificacion('⚠️ Completa los campos obligatorios', 'error');
        return;
    }

    if (!validarEmail(correo)) {
        mostrarNotificacion('⚠️ El correo no es válido', 'error');
        return;
    }

    if (contrasena.length < 8) {
        mostrarNotificacion('⚠️ La contraseña debe tener al menos 8 caracteres', 'error');
        return;
    }

    if (contrasena !== confirmar) {
        mostrarNotificacion('⚠️ Las contraseñas no coinciden', 'error');
        return;
    }

    if (!terminos) {
        mostrarNotificacion('⚠️ Debes aceptar los términos y condiciones', 'error');
        return;
    }

    // --- ESTADO DE CARGA ---
    btn.disabled = true;
    btnTexto.style.opacity = '0.5';
    cargador.style.display = 'inline-block';

    // Simulación de API / Guardado
    setTimeout(() => {
        const usuario = {
            nombreCompleto: `${nombre} ${apellido}`,
            email: correo,
            plan: plan || 'basic',
            fechaRegistro: new Date().toISOString()
        };

        // Guardar en LocalStorage
        localStorage.setItem('usuarioIronForge', JSON.stringify(usuario));

        // Mostrar capa de éxito
        document.getElementById('capaExito').style.display = 'flex';
        
        // Resetear botón por si acaso
        btn.disabled = false;
        cargador.style.display = 'none';
        btnTexto.style.opacity = '1';
    }, 2000);
}

// ---- UTILIDADES ----

function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function verificarFuerza(pass) {
    const barra = document.getElementById('barraFuerza');
    const texto = document.getElementById('textoFuerza');
    let fuerza = 0;

    if (pass.length > 5) fuerza += 20;
    if (pass.length >= 8) fuerza += 20;
    if (/[A-Z]/.test(pass)) fuerza += 20;
    if (/[0-9]/.test(pass)) fuerza += 20;
    if (/[^A-Za-z0-9]/.test(pass)) fuerza += 20;

    barra.style.width = fuerza + '%';

    if (fuerza < 40) {
        barra.style.backgroundColor = '#ff4444';
        texto.textContent = 'Contraseña débil';
    } else if (fuerza < 80) {
        barra.style.backgroundColor = '#ffbb33';
        texto.textContent = 'Contraseña media';
    } else {
        barra.style.backgroundColor = '#00c851';
        texto.textContent = 'Contraseña fuerte (¡Perfecto!)';
    }
}

function mostrarNotificacion(msj, tipo) {
    const notif = document.getElementById('notificacion');
    notif.textContent = msj;
    notif.className = `notificacion-flotante mostrar ${tipo}`;
    
    setTimeout(() => {
        notif.className = 'notificacion-flotante';
    }, 3000);
}
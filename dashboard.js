document.addEventListener('DOMContentLoaded', () => {
    // 1. NAVEGACIÓN ENTRE MÓDULOS (Dashboard, Perfil, Clases, etc.)
    const botonesNav = document.querySelectorAll('.btn-nav');
    const modulos = document.querySelectorAll('.modulo');
    const tituloSeccion = document.getElementById('titulo-seccion');

    botonesNav.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const target = boton.getAttribute('data-target');

            // Quitar estado activo de navegación y ocultar módulos previos
            botonesNav.forEach(btn => btn.classList.remove('activo'));
            modulos.forEach(mod => mod.classList.remove('activo'));

            // Activar el nuevo módulo y su botón correspondiente
            boton.classList.add('activo');
            const moduloDestino = document.getElementById(target);
            
            if (moduloDestino) {
                moduloDestino.classList.add('activo');
                // Actualiza el texto de la cabecera con el nombre del módulo
                tituloSeccion.innerText = target.toUpperCase();
            }
        });
    });

    // 2. FUNCIONALIDAD DEL CHAT (Interacción en tiempo real)
    const btnEnviar = document.querySelector('.btn-enviar');
    const inputChat = document.querySelector('.chat-input-area input');
    const zonaMensajes = document.querySelector('.chat-mensajes');

    const procesarMensaje = () => {
        const texto = inputChat.value.trim();
        
        if (texto !== "") {
            // Crear elemento de mensaje enviado (Estilo Rojo)
            const burbuja = document.createElement('div');
            burbuja.classList.add('msg-enviado');
            burbuja.textContent = texto;

            // Insertar en la ventana y limpiar el campo
            zonaMensajes.appendChild(burbuja);
            inputChat.value = "";

            // Desplazar el scroll automáticamente al final
            zonaMensajes.scrollTop = zonaMensajes.scrollHeight;

            // Simulación de respuesta automática del sistema/entrenador
            setTimeout(() => {
                const respuesta = document.createElement('div');
                respuesta.classList.add('msg-recibido');
                respuesta.innerHTML = `<b>Coach:</b> ¡Recibido! Nos vemos en el entrenamiento.`;
                zonaMensajes.appendChild(respuesta);
                zonaMensajes.scrollTop = zonaMensajes.scrollHeight;
            }, 800);
        }
    };

    if (btnEnviar) {
        btnEnviar.addEventListener('click', procesarMensaje);
        // Permitir enviar con la tecla Enter
        inputChat.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') procesarMensaje();
        });
    }

    // 3. SISTEMA DE RESERVAS (Feedback visual inmediato)
    const botonesReserva = document.querySelectorAll('.btn-book');

    botonesReserva.forEach(btn => {
        btn.addEventListener('click', function() {
            const fila = this.closest('tr');
            const nombreClase = fila.cells[1].innerText;
            
            // Alternar estado de reserva
            if (!this.classList.contains('reservado')) {
                this.innerText = "✓ Reservado";
                this.style.backgroundColor = "#28a745";
                this.classList.add('reservado');
                console.log(`Clase de ${nombreClase} reservada con éxito.`);
            } else {
                this.innerText = "Reservar";
                this.style.backgroundColor = "#E01A1A";
                this.classList.remove('reservado');
            }
        });
    });
});
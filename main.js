/* ============================================
   FORMA Y FIGURA — main.js
   ============================================ */

// ---- BARRA DE NAVEGACIÓN (SCROLL) ----
const barraNavegacion = document.getElementById('barra-navegacion');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) barraNavegacion.classList.add('scrolled');
  else barraNavegacion.classList.remove('scrolled');
});

// ---- MENÚ MÓVIL ----
const hamburguesa = document.getElementById('hamburguesa');
const menuMovil = document.getElementById('menuMovil');
const cerrarMovil = document.getElementById('cerrarMovil');

hamburguesa?.addEventListener('click', () => {
  menuMovil.classList.add('active');
  document.body.style.overflow = 'hidden';
});

function cerrarMenuMovil() {
  menuMovil.classList.remove('active');
  document.body.style.overflow = '';
}

cerrarMovil?.addEventListener('click', cerrarMenuMovil);

// Cerrar al hacer clic en enlaces del menú
document.querySelectorAll('.enlace-menu-movil').forEach(link => {
  link.addEventListener('click', cerrarMenuMovil);
});

// ---- DESPLAZAMIENTO SUAVE (SMOOTH SCROLL) ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---- OBSERVADOR DE APARICIÓN (FADE IN) ----
const elementosAparecer = document.querySelectorAll('.aparecer');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 100);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

elementosAparecer.forEach(el => observer.observe(el));

// ---- FORMULARIO DE CONTACTO ----
document.getElementById('formularioContacto')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  const textoOriginal = btn.innerHTML;
  btn.innerHTML = '⏳ Enviando...';
  btn.disabled = true;

  setTimeout(() => {
    mostrarNotificacion('✅ Mensaje enviado. Te contactaremos pronto.', 'exito');
    this.reset();
    btn.innerHTML = textoOriginal;
    btn.disabled = false;
  }, 1800);
});

// ---- NOTIFICACIÓN (TOAST) ----
function mostrarNotificacion(mensaje, tipo = 'exito') {
  const notificacion = document.getElementById('notificacion');
  if (!notificacion) return;
  notificacion.textContent = mensaje;
  notificacion.className = `notificacion ${tipo} mostrar`;
  setTimeout(() => notificacion.classList.remove('mostrar'), 3500);
}

// ---- MODAL DE VIDEO ----
const modalVideo = document.getElementById('modalVideo');
const videoPrincipal = document.getElementById('videoPrincipal');
const botonVideoPrincipal = document.getElementById('botonVideoPrincipal');
const miniaturaVideo = document.getElementById('miniaturaVideo');
const cerrarModalVideo = document.getElementById('cerrarModalVideo');

function abrirVideo() {
  modalVideo.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  videoPrincipal.play();
}

function cerrarVideo() {
  modalVideo.style.display = 'none';
  document.body.style.overflow = 'auto';
  videoPrincipal.pause();
  videoPrincipal.currentTime = 0;
}

botonVideoPrincipal?.addEventListener('click', abrirVideo);
miniaturaVideo?.addEventListener('click', abrirVideo);
cerrarModalVideo?.addEventListener('click', cerrarVideo);

// Cerrar al hacer clic fuera del video
modalVideo.addEventListener('click', (e) => {
  if (e.target === modalVideo) cerrarVideo();
});
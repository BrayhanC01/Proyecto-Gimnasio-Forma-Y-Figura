
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.className = `toast ${type} show`;
  setTimeout(() => toast.classList.remove('show'), 3500);
}

function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  if (input.type === 'password') {
    input.type = 'text';
    btn.textContent = '🙈';
  } else {
    input.type = 'password';
    btn.textContent = '👁';
  }
}

function checkStrength(password) {
  const bar = document.getElementById('strengthBar');
  const text = document.getElementById('strengthText');
  if (!bar || !text) return;

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const levels = [
    { width: '0%', color: '#555', label: 'Ingresa una contraseña' },
    { width: '20%', color: '#E01A1A', label: '⚠️ Muy débil' },
    { width: '40%', color: '#FF6B35', label: '⚠️ Débil' },
    { width: '60%', color: '#F97316', label: '✦ Regular' },
    { width: '80%', color: '#84CC16', label: '✓ Fuerte' },
    { width: '100%', color: '#2ECC71', label: '✅ Muy fuerte' },
  ];

  const level = password.length === 0 ? levels[0] : levels[Math.min(score, 5)];
  bar.style.width = level.width;
  bar.style.background = level.color;
  text.textContent = level.label;
  text.style.color = level.color;
}

function socialLogin(platform) {
  showToast(`🔗 Conectando con ${platform}...`, 'success');
  setTimeout(() => {
    localStorage.setItem('ironForgeUser', JSON.stringify({
      name: `Usuario ${platform}`,
      email: `usuario@${platform.toLowerCase()}.com`,
      plan: 'basic',
      avatar: null
    }));
    setTimeout(() => { window.location.href = 'dashboard.html'; }, 800);
  }, 1500);
}

function handleAvatarUpload(input) {
  const file = input.files[0];
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) {
    showToast('⚠️ La imagen no puede superar 5MB', 'error');
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
   
    showToast('📷 Foto de perfil actualizada', 'success');
  };
  reader.readAsDataURL(file);
}

document.querySelectorAll('.input-wrapper input').forEach(input => {
  input.addEventListener('focus', function() {
    this.closest('.form-group')?.classList.add('focused');
  });
  input.addEventListener('blur', function() {
    this.closest('.form-group')?.classList.remove('focused');
  });
});
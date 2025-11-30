// lampe-bio.js
document.addEventListener('DOMContentLoaded', () => {
  const lampe = document.getElementById('lampe');
  if (!lampe) return;

  const mots = Array.from(document.querySelectorAll('.reveal-text'));
  const rayon = 120; // rayon de révélation en pixels
  const transitionTime = 200; // durée transition en ms

  // Déplacer la lampe
  function moveLamp(x, y) {
    lampe.style.left = `${x}px`;
    lampe.style.top = `${y}px`;
  }

  // Calculer distance entre point et rectangle
  function isNear(x, y, rect, r) {
    const dx = Math.max(rect.left - x, 0, x - rect.right);
    const dy = Math.max(rect.top - y, 0, y - rect.bottom);
    return Math.hypot(dx, dy) <= r;
  }

  // Révéler ou cacher les mots selon distance
  function updateMots(x, y) {
    mots.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (isNear(x, y, rect, rayon)) {
        if (!el.classList.contains('revealed')) {
          el.classList.add('revealed');
          el.style.transition = `opacity ${transitionTime}ms ease, filter ${transitionTime}ms ease`;
        }
      } else {
        if (el.classList.contains('revealed')) {
          el.classList.remove('revealed');
        }
      }
    });
  }

  // Gestion desktop / souris
  document.addEventListener('mousemove', e => {
    const x = e.clientX;
    const y = e.clientY;
    moveLamp(x, y);
    updateMots(x, y);
  });

  // Sortie de la souris : lampe hors écran
  document.addEventListener('mouseleave', () => {
    lampe.style.left = '-9999px';
    lampe.style.top = '-9999px';
  });

  // Gestion tactile / mobile
  document.addEventListener('touchmove', e => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      moveLamp(touch.clientX, touch.clientY);
      updateMots(touch.clientX, touch.clientY);
    }
  }, { passive: true });

  document.addEventListener('touchend', () => {
    lampe.style.left = '-9999px';
    lampe.style.top = '-9999px';
  });
});


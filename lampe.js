// lampe.js
document.addEventListener('DOMContentLoaded', () => {
  const lampe = document.getElementById('lampe');
  if (!lampe) return;

  // prend en charge éléments avec classe .reveal-item
  const items = () => Array.from(document.querySelectorAll('.reveal-item'));

  // rayon de révélation en px (ajuste selon goût)
  const rayon = 120;

  // met à jour la position du spot
  function moveLamp(x, y) {
    lampe.style.left = `${x}px`;
    lampe.style.top = `${y}px`;
  }

  // test si un point (x,y) est suffisamment proche d'un élément (rect)
  function isPointNearRect(x, y, rect, r) {
    // distance au rectangle (0 si à l'intérieur)
    const dx = Math.max(rect.left - x, 0, x - rect.right);
    const dy = Math.max(rect.top - y, 0, y - rect.bottom);
    const dist = Math.hypot(dx, dy);
    return dist <= r;
  }

  // gestion du mouvement
  document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    moveLamp(x, y);

    // recalcule la liste à chaque move — utile si tu ajoutes dynamiquement des éléments
    items().forEach(el => {
      const rect = el.getBoundingClientRect();
      if (isPointNearRect(x, y, rect, rayon)) {
        if (!el.classList.contains('revealed')) el.classList.add('revealed');
      } else {
        if (el.classList.contains('revealed')) el.classList.remove('revealed');
      }
    });
  });

  // option : cache la lampe quand le curseur sort de la fenêtre (design)
  document.addEventListener('mouseleave', () => {
    lampe.style.left = '-9999px';
    lampe.style.top = '-9999px';
  });
});

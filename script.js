document.addEventListener("DOMContentLoaded", () => {
  const startOverlay = document.getElementById("click-to-start");
  const wrappers = document.querySelectorAll(".video-wrapper");

  if (typeof Vimeo === "undefined" || !Vimeo.Player) {
    console.error("Vimeo API non chargée !");
    return;
  }

  const players = Array.from(wrappers).map(w => new Vimeo.Player(w.querySelector("iframe")));

  // Quand l’utilisateur clique → lancer toutes les vidéos
  startOverlay.addEventListener("click", () => {
    startOverlay.style.display = "none";
    players.forEach((player, i) => {
      player.setVolume(0);
      setTimeout(() => player.play().catch(err => console.warn("Lecture bloquée :", err)), i * 400);
    });
  });

  // Boutons unmute
  document.querySelectorAll(".unmute-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.player;
      const wrapper = document.getElementById(id);
      const player = players.find(p => p.element === wrapper.querySelector("iframe"));
      if (player) player.setVolume(1);
      btn.style.display = "none";
    });
  });
});

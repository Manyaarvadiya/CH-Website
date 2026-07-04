/*
  Cheap ambient starfield for the background canvas.
  No dependencies. Pauses when tab is hidden. Respects reduced-motion.
  Occasionally spawns a shooting star that streaks across and fades.
*/
(function () {
  const canvas = document.getElementById("starfield");
  if (!canvas) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReducedMotion) return;

  const ctx = canvas.getContext("2d");
  let width, height, stars;
  let running = true;

  let shootingStars = [];
  let nextShootingStarAt = 0;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    const count = Math.floor((width * height) / 6000);
    stars = Array.from({ length: count }, () => createStar());
  }

  function createStar() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.1 + 0.2,
      baseAlpha: Math.random() * 0.6 + 0.2,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      phase: Math.random() * Math.PI * 2,
    };
  }

  function scheduleNextShootingStar(time) {
    // Roughly once every 1-3 seconds.
    nextShootingStarAt = time + 1000 + Math.random() * 2000;
  }

  function spawnShootingStar() {
    const angle = (Math.PI / 180) * (20 + Math.random() * 40); // 20-60deg downward
    const speed = 700 + Math.random() * 500; // px/sec
    const startX = Math.random() * width * 0.7;
    const startY = Math.random() * height * 0.35;

    shootingStars.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      len: 90 + Math.random() * 70,
      life: 0,
      maxLife: 0.9 + Math.random() * 0.4, // seconds
    });
  }

  function updateAndDrawShootingStar(star, dt) {
    star.life += dt;
    star.x += star.vx * dt;
    star.y += star.vy * dt;

    const t = star.life / star.maxLife;
    if (t >= 1 || star.x - star.len > width || star.y - star.len > height) {
      return false;
    }

    const fade = t < 0.15 ? t / 0.15 : 1 - (t - 0.15) / 0.85;
    const alpha = Math.max(0, Math.min(1, fade));

    const mag = Math.hypot(star.vx, star.vy) || 1;
    const dx = (star.vx / mag) * star.len;
    const dy = (star.vy / mag) * star.len;

    const gradient = ctx.createLinearGradient(
      star.x,
      star.y,
      star.x - dx,
      star.y - dy
    );
    gradient.addColorStop(0, `rgba(232, 230, 224, ${alpha})`);
    gradient.addColorStop(1, "rgba(232, 230, 224, 0)");

    ctx.save();
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 1.6;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(star.x, star.y);
    ctx.lineTo(star.x - dx, star.y - dy);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(star.x, star.y, 1.4, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.fill();
    ctx.restore();

    return true;
  }

  let lastTime = null;

  function draw(time) {
    if (!running) return;

    if (lastTime === null) {
      lastTime = time;
      scheduleNextShootingStar(time);
    }
    const dt = Math.min((time - lastTime) / 1000, 0.05);
    lastTime = time;

    ctx.clearRect(0, 0, width, height);

    for (const star of stars) {
      const alpha =
        star.baseAlpha +
        Math.sin(time * star.twinkleSpeed + star.phase) * 0.15;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(232, 230, 224, ${Math.max(0, alpha)})`;
      ctx.fill();
    }

    if (time >= nextShootingStarAt && shootingStars.length < 5) {
      spawnShootingStar();
      scheduleNextShootingStar(time);
    }
    shootingStars = shootingStars.filter((star) =>
      updateAndDrawShootingStar(star, dt)
    );

    requestAnimationFrame(draw);
  }

  document.addEventListener("visibilitychange", () => {
    running = !document.hidden;
    if (running) {
      lastTime = null;
      requestAnimationFrame(draw);
    }
  });

  window.addEventListener("resize", resize);

  resize();
  requestAnimationFrame(draw);
})();

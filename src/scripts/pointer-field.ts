const canvas = document.querySelector<HTMLCanvasElement>(".pointer-field");
const stage = canvas?.closest<HTMLElement>(".hero-stage");
const context = canvas?.getContext("2d");

if (canvas && stage && context) {
  const media = matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
  const heading = stage.querySelector<HTMLElement>(".hero-copy");
  let width = 0;
  let height = 0;
  let frame = 0;
  let previousTime = 0;
  let visible = false;
  let color = "";
  let pointer: { x: number; y: number } | null = null;
  let textBox = { left: 0, right: 0, top: 0, bottom: 0 };
  let particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];

  const stop = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    previousTime = 0;
    pointer = null;
    context.clearRect(0, 0, width, height);
  };

  const draw = (time: number) => {
    frame = 0;
    if (!media.matches || document.hidden || !visible) return stop();
    const dt = previousTime ? Math.min((time - previousTime) / 1000, 0.04) : 0;
    previousTime = time;
    context.clearRect(0, 0, width, height);
    context.strokeStyle = color;
    context.fillStyle = color;
    context.lineWidth = 0.75;

    for (const particle of particles) {
      particle.x += particle.vx * dt;
      particle.y += particle.vy * dt;
      if (particle.x < -8) particle.x = width + 8;
      if (particle.x > width + 8) particle.x = -8;
      if (particle.y < -8) particle.y = height + 8;
      if (particle.y > height + 8) particle.y = -8;
    }

    for (let i = 0; i < particles.length; i++) {
      const a = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const b = particles[j];
        const distance = Math.hypot(a.x - b.x, a.y - b.y);
        if (distance >= 135) continue;
        context.globalAlpha = (1 - distance / 135) * 0.27;
        context.beginPath();
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.stroke();
      }
      context.globalAlpha = 0.38;
      context.beginPath();
      context.arc(a.x, a.y, a.radius, 0, Math.PI * 2);
      context.fill();
    }

    if (pointer) {
      const mouse = pointer;
      const nearby = particles
        .map((particle) => ({ particle, distance: Math.hypot(particle.x - mouse.x, particle.y - mouse.y) }))
        .filter(({ distance }) => distance < 170)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 4);
      for (const { particle, distance } of nearby) {
        context.globalAlpha = (1 - distance / 170) * 0.42;
        context.beginPath();
        context.moveTo(pointer.x, pointer.y);
        context.lineTo(particle.x, particle.y);
        context.stroke();
      }
    }

    context.globalAlpha = 1;
    context.clearRect(textBox.left, textBox.top, textBox.right - textBox.left, textBox.bottom - textBox.top);
    frame = requestAnimationFrame(draw);
  };

  const sync = () => {
    color = getComputedStyle(stage).getPropertyValue("--accent").trim();
    if (!media.matches || document.hidden || !visible) return stop();
    if (!frame) frame = requestAnimationFrame(draw);
  };

  const resize = () => {
    stop();
    width = stage.clientWidth;
    height = stage.clientHeight;
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const bounds = stage.getBoundingClientRect();
    const text = heading?.getBoundingClientRect();
    if (text) textBox = { left: text.left - bounds.left - 12, right: text.right - bounds.left + 12, top: text.top - bounds.top - 12, bottom: text.bottom - bounds.top + 12 };
    const count = Math.min(84, Math.max(28, Math.round(width * height / 17000)));
    particles = Array.from({ length: count }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 8 + Math.random() * 10;
      return { x: Math.random() * width, y: Math.random() * height, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, radius: 1 + Math.random() * 0.6 };
    });
    sync();
  };

  stage.addEventListener("pointermove", (event) => {
    if (!media.matches || event.pointerType !== "mouse") return;
    const bounds = stage.getBoundingClientRect();
    pointer = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
  }, { passive: true });
  stage.addEventListener("pointerleave", () => { pointer = null; });
  media.addEventListener("change", sync);
  document.addEventListener("visibilitychange", sync);
  new ResizeObserver(resize).observe(stage);
  new MutationObserver(sync).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  }).observe(stage);
}

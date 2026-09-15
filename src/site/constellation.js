/**
 * Decorative cortical particles derived from FreeSurfer fsaverage5.
 * The associated data retain the FreeSurfer licence in public/brand.
 * No colors in this illustration encode research or patient values.
 */

const COLORS = ['#b098ff', '#ffbd50', '#76efd2', '#ff99d1', '#86b4ff', '#ffffff'];
const OPACITY_STEPS = 8;
const FRAME_MS = 1000 / 30;
const mounted = new WeakMap();

function hash(value) {
  value = Math.imul(value ^ (value >>> 16), 0x45d9f3b);
  value = Math.imul(value ^ (value >>> 16), 0x45d9f3b);
  return (value ^ (value >>> 16)) >>> 0;
}

function makeParticles(asset) {
  if (asset?.stride !== 7 || !Array.isArray(asset.points)
    || asset.points.length !== asset.pointCount * asset.stride
    || asset.pointCount < 5000 || asset.pointCount > 8000
    || !asset.points.every(Number.isFinite)) {
    throw new Error('Invalid decorative brain geometry');
  }

  return Array.from({ length: asset.pointCount }, (_, index) => {
    const offset = index * asset.stride;
    const [x, y, z, nx, ny, nz, fold] = asset.points.slice(offset, offset + 7);
    if (Math.max(Math.abs(x), Math.abs(y), Math.abs(z)) > 1.2) {
      throw new Error('Decorative brain geometry is out of bounds');
    }
    const random = hash(index + 91);
    // Spatial color patches form a brand illustration, independent of labels.
    const patch = z > 0.2 ? (y > 0.1 ? 0 : 4) : y > 0.28 ? 3 : y < -0.3 ? 1 : 2;
    const color = random % 10 < 6 ? patch : (random >>> 8) % COLORS.length;
    const angle = ((random >>> 12) % 628) / 100;
    const size = 0.73 + ((random >>> 20) % 100) / 140;
    const corners = [0, 2.0944, 4.1888].flatMap(turn => [Math.cos(angle + turn), Math.sin(angle + turn)]);

    // Left lateral view, anterior to the left and superior upward.
    return { x: -y, y: z, z: -x, nx: -ny, ny: nz, nz: -nx, fold, color, size, corners };
  });
}

/** Mount one hero canvas. Importing this module alone starts no animation. */
export function mountConstellation(canvas, { toggleButton } = {}) {
  if (!canvas || typeof canvas.getContext !== 'function') return () => {};
  mounted.get(canvas)?.();
  const context = canvas.getContext('2d', { alpha: false });
  if (!context) {
    canvas.dataset.error = 'canvas-unavailable';
    return () => {};
  }

  const controller = new AbortController();
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let particles = [];
  let destroyed = false;
  let paused = reducedMotion.matches;
  let onScreen = false;
  let width = 0;
  let height = 0;
  let pixelRatio = 1;
  let timer = 0;
  let frame = 0;
  let lastTime = 0;
  let elapsed = 0;
  let pointerX = 0;
  let pointerY = 0;
  let smoothX = 0;
  let smoothY = 0;
  const groups = Array.from({ length: COLORS.length * OPACITY_STEPS }, () => []);

  delete canvas.dataset.ready;
  delete canvas.dataset.error;

  function updateButton() {
    if (!toggleButton) return;
    toggleButton.hidden = false;
    toggleButton.disabled = particles.length === 0;
    toggleButton.textContent = paused ? 'Play motion' : 'Pause motion';
    toggleButton.setAttribute('aria-pressed', String(paused));
    toggleButton.setAttribute('aria-label', paused ? 'Play brain illustration motion' : 'Pause brain illustration motion');
  }

  function render() {
    if (destroyed || !width || !height) return;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    context.fillStyle = '#000000';
    context.fillRect(0, 0, width, height);
    if (!particles.length) return;

    // A small oscillation retains the recognizable lateral silhouette.
    const yaw = 0.27 + Math.sin(elapsed * 0.17) * 0.065 + smoothX * 0.11;
    const pitch = 0.105 + Math.sin(elapsed * 0.12) * 0.025 + smoothY * 0.075;
    const cy = Math.cos(yaw), sy = Math.sin(yaw);
    const cp = Math.cos(pitch), sp = Math.sin(pitch);
    const scale = Math.min(width / 2.42, height / 1.97);
    const pointSize = Math.max(1.25, Math.min(2.2, width / 290));
    const centerX = width * 0.48;
    const centerY = height * 0.5;
    for (const group of groups) group.length = 0;

    for (const particle of particles) {
      const turnedX = particle.x * cy + particle.z * sy;
      const turnedZ = particle.z * cy - particle.x * sy;
      const up = particle.y * cp - turnedZ * sp;
      const depth = particle.y * sp + turnedZ * cp;
      const normalZ = particle.nz * cy - particle.nx * sy;
      const facing = particle.ny * sp + normalZ * cp;
      const normalUp = particle.ny * cp - normalZ * sp;
      // Far surfaces recede. Curvature and the true mesh normals reveal folds.
      const front = Math.max(0, Math.min(1, (depth + 0.3) / 1.08));
      const foldLight = 0.73 - particle.fold * 0.24;
      const light = Math.max(0.11, 0.42 + facing * 0.45 + normalUp * 0.13);
      const alpha = Math.min(1, (0.14 + front * 0.86) * light * foldLight * 2.9);
      if (alpha < 0.08 || (facing < -0.55 && depth < 0.15)) continue;
      const perspective = 3.9 / (3.9 - depth * 0.32);
      const px = centerX + turnedX * scale * perspective;
      const py = centerY - up * scale * perspective;
      const radius = pointSize * particle.size * (0.73 + front * 0.29);
      const bucket = Math.min(OPACITY_STEPS - 1, Math.floor(alpha * OPACITY_STEPS));
      const group = groups[particle.color * OPACITY_STEPS + bucket];
      const corners = particle.corners;
      group.push(px + corners[0] * radius, py + corners[1] * radius,
        px + corners[2] * radius, py + corners[3] * radius,
        px + corners[4] * radius, py + corners[5] * radius);
    }

    // Batch paths by color and brightness instead of issuing 7,200 fills.
    for (let color = 0; color < COLORS.length; color += 1) {
      context.fillStyle = COLORS[color];
      for (let opacity = 0; opacity < OPACITY_STEPS; opacity += 1) {
        const group = groups[color * OPACITY_STEPS + opacity];
        if (!group.length) continue;
        context.globalAlpha = (opacity + 0.5) / OPACITY_STEPS;
        context.beginPath();
        for (let index = 0; index < group.length; index += 6) {
          context.moveTo(group[index], group[index + 1]);
          context.lineTo(group[index + 2], group[index + 3]);
          context.lineTo(group[index + 4], group[index + 5]);
          context.closePath();
        }
        context.fill();
      }
    }
    context.globalAlpha = 1;
    canvas.dataset.ready = 'true';
  }

  function stopFrames() {
    window.clearTimeout(timer);
    window.cancelAnimationFrame(frame);
    timer = 0;
    frame = 0;
    lastTime = 0;
  }

  function canAnimate() {
    return !destroyed && !paused && onScreen && !document.hidden && particles.length > 0;
  }

  function tick(time) {
    frame = 0;
    if (!canAnimate()) return;
    if (lastTime) elapsed += Math.min((time - lastTime) / 1000, 0.1);
    lastTime = time;
    smoothX += (pointerX - smoothX) * 0.065;
    smoothY += (pointerY - smoothY) * 0.065;
    render();
    timer = window.setTimeout(() => {
      timer = 0;
      if (canAnimate()) frame = window.requestAnimationFrame(tick);
    }, Math.max(0, FRAME_MS - (performance.now() - time)));
  }

  function resumeFrames() {
    if (canAnimate() && !timer && !frame) frame = window.requestAnimationFrame(tick);
  }

  function resize() {
    const bounds = canvas.getBoundingClientRect();
    width = Math.max(0, bounds.width);
    height = Math.max(0, bounds.height);
    pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.max(1, Math.round(width * pixelRatio));
    canvas.height = Math.max(1, Math.round(height * pixelRatio));
    onScreen = bounds.bottom > 0 && bounds.right > 0
      && bounds.top < window.innerHeight && bounds.left < window.innerWidth;
    render();
    if (onScreen) resumeFrames();
    else stopFrames();
  }

  function onPointerMove(event) {
    if (paused || reducedMotion.matches || event.pointerType === 'touch') return;
    const bounds = canvas.getBoundingClientRect();
    pointerX = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
    pointerY = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
  }

  function clearPointer() {
    pointerX = 0;
    pointerY = 0;
  }

  function toggle() {
    paused = !paused;
    updateButton();
    if (paused) stopFrames();
    else resumeFrames();
  }

  function onMotionPreference() {
    if (reducedMotion.matches) {
      paused = true;
      clearPointer();
      stopFrames();
      updateButton();
    }
  }

  function onVisibility() {
    if (document.hidden) stopFrames();
    else resumeFrames();
  }

  const resizeObserver = typeof ResizeObserver === 'function' ? new ResizeObserver(resize) : null;
  const intersectionObserver = typeof IntersectionObserver === 'function' ? new IntersectionObserver(entries => {
    onScreen = entries[entries.length - 1].isIntersecting;
    if (onScreen) resumeFrames();
    else stopFrames();
  }, { threshold: 0 }) : null;

  function cleanup() {
    if (destroyed) return;
    destroyed = true;
    controller.abort();
    stopFrames();
    resizeObserver?.disconnect();
    intersectionObserver?.disconnect();
    window.removeEventListener('resize', resize);
    document.removeEventListener('visibilitychange', onVisibility);
    reducedMotion.removeEventListener('change', onMotionPreference);
    canvas.removeEventListener('pointermove', onPointerMove);
    canvas.removeEventListener('pointerleave', clearPointer);
    toggleButton?.removeEventListener('click', toggle);
    particles = [];
    if (mounted.get(canvas) === cleanup) mounted.delete(canvas);
  }

  mounted.set(canvas, cleanup);
  updateButton();
  resize();
  resizeObserver?.observe(canvas.parentElement || canvas);
  intersectionObserver?.observe(canvas);
  window.addEventListener('resize', resize, { passive: true });
  document.addEventListener('visibilitychange', onVisibility);
  reducedMotion.addEventListener('change', onMotionPreference);
  canvas.addEventListener('pointermove', onPointerMove, { passive: true });
  canvas.addEventListener('pointerleave', clearPointer, { passive: true });
  toggleButton?.addEventListener('click', toggle);

  fetch('./brand/brain-points.json', { signal: controller.signal })
    .then(response => {
      if (!response.ok) throw new Error(`Brain illustration HTTP ${response.status}`);
      return response.json();
    })
    .then(asset => {
      if (destroyed) return;
      particles = makeParticles(asset);
      updateButton();
      render();
      resumeFrames();
    })
    .catch(error => {
      if (destroyed || error.name === 'AbortError') return;
      stopFrames();
      canvas.dataset.error = 'asset-load-failed';
      if (toggleButton) {
        toggleButton.disabled = true;
        toggleButton.textContent = 'Motion unavailable';
        toggleButton.setAttribute('aria-label', 'Brain illustration unavailable');
      }
    });

  return cleanup;
}

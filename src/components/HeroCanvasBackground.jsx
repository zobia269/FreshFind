import React, { useEffect, useRef } from 'react';

/**
 * Animated canvas backdrop for the hero section.
 *
 * Draws slowly drifting organic "grow light" blobs plus a drifting particle
 * field, so the FreshFind wordmark sits on top of something that is alive
 * without ever competing with the text for attention.
 *
 * Performance notes:
 *  - Runs on a single rAF loop and pauses when the tab or element is hidden.
 *  - Backing store is capped at 1x DPR and the canvas is sized to the element,
 *    so it stays cheap on mobile.
 *  - Fully respects prefers-reduced-motion (renders a single static frame).
 */

const BLOB_COLORS = [
  [16, 185, 129], // emerald-500
  [45, 212, 191], // teal-400
  [132, 204, 22], // lime-500
  [190, 242, 100], // lime-300
];

export default function HeroCanvasBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let rafId = null;
    let start = performance.now();

    const blobs = [];
    const particles = [];

    // Deterministic-ish random so the layout is not identical on every reload
    const rand = (min, max) => min + Math.random() * (max - min);

    const buildScene = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 1) || 1;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Four large soft blobs, sized relative to the smaller viewport axis
      const base = Math.min(width, height);
      blobs.length = 0;
      for (let i = 0; i < 4; i++) {
        blobs.push({
          x: rand(0.1, 0.9) * width,
          y: rand(0.1, 0.9) * height,
          r: base * rand(0.28, 0.52),
          color: BLOB_COLORS[i % BLOB_COLORS.length],
          vx: rand(-0.012, 0.012) * base * 0.06,
          vy: rand(-0.012, 0.012) * base * 0.06,
          phase: rand(0, Math.PI * 2),
          pulse: rand(0.0004, 0.0011),
        });
      }

      // Particle density scales with area, capped so it never gets noisy
      const count = Math.min(70, Math.round((width * height) / 16000));
      particles.length = 0;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: rand(0.6, 2.1),
          vx: rand(-0.14, 0.14),
          vy: rand(-0.22, -0.04), // gentle upward drift, like rising spores
          alpha: rand(0.12, 0.42),
          twinkle: rand(0.0008, 0.0028),
          phase: rand(0, Math.PI * 2),
        });
      }
    };

    const drawBlob = (blob, t) => {
      const breathe = 1 + Math.sin(t * blob.pulse + blob.phase) * 0.12;
      const r = blob.r * breathe;
      const [cr, cg, cb] = blob.color;

      const grad = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, r);
      grad.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, 0.20)`);
      grad.addColorStop(0.45, `rgba(${cr}, ${cg}, ${cb}, 0.09)`);
      grad.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0)`);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(blob.x, blob.y, r, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawParticles = (t) => {
      for (const p of particles) {
        const flicker = 0.65 + Math.sin(t * p.twinkle + p.phase) * 0.35;
        ctx.fillStyle = `rgba(190, 242, 100, ${p.alpha * flicker})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = (t) => {
      ctx.clearRect(0, 0, width, height);

      for (const b of blobs) {
        b.x += b.vx;
        b.y += b.vy;
        // Bounce off the edges with a soft margin so blobs stay mostly on screen
        const m = b.r * 0.35;
        if (b.x < -m || b.x > width + m) b.vx *= -1;
        if (b.y < -m || b.y > height + m) b.vy *= -1;
        drawBlob(b, t);
      }

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -4) {
          p.y = height + 4;
          p.x = Math.random() * width;
        }
        if (p.x < -4) p.x = width + 4;
        if (p.x > width + 4) p.x = -4;
      }
      drawParticles(t);
    };

    const render = (now) => {
      const t = now - start;
      step(t);
      rafId = requestAnimationFrame(render);
    };

    const drawStaticFrame = () => {
      start = performance.now();
      step(start);
    };

    buildScene();

    if (reduceMotion) {
      drawStaticFrame();
    } else {
      rafId = requestAnimationFrame(render);
    }

    // Re-layout on resize (debounced through rAF, no layout thrash)
    let resizeRaf = null;
    const handleResize = () => {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        buildScene();
        if (reduceMotion) drawStaticFrame();
      });
    };
    window.addEventListener('resize', handleResize);

    // Pause the loop when the tab is hidden to avoid burning CPU
    const handleVisibility = () => {
      if (reduceMotion) return;
      if (document.hidden) {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
      } else if (!rafId) {
        start = performance.now() - 1000;
        rafId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

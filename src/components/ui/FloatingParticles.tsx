"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  radius: number;
  alpha: number;
  color: string;
  pulse: number;
  pulseSpeed: number;
}

export default function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let mouseX = -9999;
    let mouseY = -9999;

    // Colors: blue, cyan, purple — weighted toward blue/cyan
    const colors = [
      "rgba(59,130,246,",
      "rgba(59,130,246,",
      "rgba(6,182,212,",
      "rgba(6,182,212,",
      "rgba(139,92,246,",
    ];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    const onMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave);

    // Limit particle count for performance
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 14000), 90);

    const particles: Particle[] = Array.from({ length: count }, () => {
      const speed = Math.random() * 0.35 + 0.05;
      const angle = Math.random() * Math.PI * 2;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx,
        vy,
        baseVx: vx,
        baseVy: vy,
        radius: Math.random() * 1.8 + 0.4,
        alpha: Math.random() * 0.45 + 0.08,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.015 + 0.005,
      };
    });

    const MOUSE_RADIUS = 140;
    const REPEL_STRENGTH = 1.8;
    const CONNECTION_DIST = 110;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Mouse repulsion — particles gently move away
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);

        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          p.vx += (dx / dist) * force * REPEL_STRENGTH * 0.04;
          p.vy += (dy / dist) * force * REPEL_STRENGTH * 0.04;
        }

        // Ease velocity back toward base
        p.vx += (p.baseVx - p.vx) * 0.04;
        p.vy += (p.baseVy - p.vy) * 0.04;

        // Pulse alpha
        p.pulse += p.pulseSpeed;
        const pulseAlpha = p.alpha + Math.sin(p.pulse) * 0.08;
        const glowAlpha = dist < MOUSE_RADIUS
          ? Math.min(pulseAlpha + (MOUSE_RADIUS - dist) / MOUSE_RADIUS * 0.35, 0.92)
          : pulseAlpha;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.min(glowAlpha, 0.9)})`;
        ctx.fill();

        // Glow halo near mouse
        if (dist < MOUSE_RADIUS) {
          const haloSize = p.radius * (1 + (MOUSE_RADIUS - dist) / MOUSE_RADIUS * 2.5);
          ctx.beginPath();
          ctx.arc(p.x, p.y, haloSize, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${(0.04 * (MOUSE_RADIUS - dist) / MOUSE_RADIUS).toFixed(3)})`;
          ctx.fill();
        }

        // Connections
        particles.forEach((p2) => {
          const cx = p.x - p2.x;
          const cy = p.y - p2.y;
          const d = Math.sqrt(cx * cx + cy * cy);
          if (d < CONNECTION_DIST && d > 0) {
            const lineAlpha = (1 - d / CONNECTION_DIST) * 0.07;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(59,130,246,${lineAlpha.toFixed(3)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        });

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < -12) p.x = canvas.width + 12;
        else if (p.x > canvas.width + 12) p.x = -12;
        if (p.y < -12) p.y = canvas.height + 12;
        else if (p.y > canvas.height + 12) p.y = -12;
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}

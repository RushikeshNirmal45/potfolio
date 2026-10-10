"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Sparkles, Zap, Shield, ChevronUp, ChevronDown } from "lucide-react";

interface NodeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  radius: number;
  alpha: number;
  color: string;
  glowColor: string;
  pulse: number;
  pulseSpeed: number;
}

interface SignalPacket {
  fromIndex: number;
  toIndex: number;
  progress: number;
  speed: number;
  color: string;
}

type BackgroundTheme = "cyber" | "aurora" | "matrix";
type EffectIntensity = "vibrant" | "balanced" | "subtle";

export default function GlobalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const [isClient, setIsClient] = useState(false);
  const [theme, setTheme] = useState<BackgroundTheme>("cyber");
  const [intensity, setIntensity] = useState<EffectIntensity>("vibrant");
  const [controlOpen, setControlOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedTheme = localStorage.getItem("rn_bg_theme") as BackgroundTheme | null;
    const savedIntensity = localStorage.getItem("rn_bg_intensity") as EffectIntensity | null;
    if (savedTheme) setTheme(savedTheme);
    if (savedIntensity) setIntensity(savedIntensity);
  }, []);

  const handleThemeChange = (newTheme: BackgroundTheme) => {
    setTheme(newTheme);
    localStorage.setItem("rn_bg_theme", newTheme);
  };

  const handleIntensityChange = (newIntensity: EffectIntensity) => {
    setIntensity(newIntensity);
    localStorage.setItem("rn_bg_intensity", newIntensity);
  };

  // Mouse move listener for smooth spotlight
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => {
      setMousePos({ x: -1000, y: -1000 });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Canvas Interactive Neural / Constellation Mesh
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let localMouseX = -10000;
    let localMouseY = -10000;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const handleMove = (e: MouseEvent) => {
      localMouseX = e.clientX;
      localMouseY = e.clientY;
    };
    const handleLeave = () => {
      localMouseX = -10000;
      localMouseY = -10000;
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseleave", handleLeave);

    // Dynamic color palettes according to theme
    const colorSets = {
      cyber: [
        { dot: "rgba(16, 185, 129,", glow: "rgba(16, 185, 129, 0.4)" }, // Emerald
        { dot: "rgba(6, 182, 212,", glow: "rgba(6, 182, 212, 0.4)" },   // Cyan
        { dot: "rgba(20, 184, 166,", glow: "rgba(20, 184, 166, 0.4)" }, // Teal
        { dot: "rgba(245, 158, 11,", glow: "rgba(245, 158, 11, 0.35)" }, // Amber
      ],
      aurora: [
        { dot: "rgba(16, 185, 129,", glow: "rgba(16, 185, 129, 0.4)" },
        { dot: "rgba(139, 92, 246,", glow: "rgba(139, 92, 246, 0.4)" }, // Violet
        { dot: "rgba(59, 130, 246,", glow: "rgba(59, 130, 246, 0.4)" }, // Blue
        { dot: "rgba(236, 72, 153,", glow: "rgba(236, 72, 153, 0.3)" }, // Pink
      ],
      matrix: [
        { dot: "rgba(16, 185, 129,", glow: "rgba(16, 185, 129, 0.5)" },
        { dot: "rgba(52, 211, 153,", glow: "rgba(52, 211, 153, 0.5)" },
        { dot: "rgba(5, 150, 105,", glow: "rgba(5, 150, 105, 0.4)" },
        { dot: "rgba(16, 185, 129,", glow: "rgba(16, 185, 129, 0.3)" },
      ],
    };

    const currentColors = colorSets[theme] || colorSets.cyber;

    // Intensity scaling
    const intensityMultiplier =
      intensity === "vibrant" ? 1.3 : intensity === "subtle" ? 0.6 : 1.0;

    const baseCount = Math.floor((canvas.width * canvas.height) / 16000);
    const count = Math.min(Math.max(Math.floor(baseCount * intensityMultiplier), 35), 85);

    const particles: NodeParticle[] = Array.from({ length: count }, () => {
      const speed = (Math.random() * 0.4 + 0.1) * (intensity === "vibrant" ? 1.2 : 0.9);
      const angle = Math.random() * Math.PI * 2;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      const picked = currentColors[Math.floor(Math.random() * currentColors.length)];

      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx,
        vy,
        baseVx: vx,
        baseVy: vy,
        radius: Math.random() * 2 + 0.8,
        alpha: (Math.random() * 0.5 + 0.2) * (intensity === "subtle" ? 0.6 : 1),
        color: picked.dot,
        glowColor: picked.glow,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.008,
      };
    });

    // Active signal data packets traveling between connected nodes
    const packets: SignalPacket[] = [];
    const MAX_PACKETS = intensity === "subtle" ? 6 : 14;

    const CONNECTION_DIST = 135;
    const MOUSE_CONNECTION_DIST = 170;
    const MOUSE_RADIUS = 150;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse repulsion & interaction
        const dx = p.x - localMouseX;
        const dy = p.y - localMouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          p.vx += (dx / dist) * force * 0.08;
          p.vy += (dy / dist) * force * 0.08;
        }

        // Dampen back to base velocity
        p.vx += (p.baseVx - p.vx) * 0.03;
        p.vy += (p.baseVy - p.vy) * 0.03;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap viewport edges
        if (p.x < -20) p.x = canvas.width + 20;
        else if (p.x > canvas.width + 20) p.x = -20;
        if (p.y < -20) p.y = canvas.height + 20;
        else if (p.y > canvas.height + 20) p.y = -20;

        // Pulse alpha
        p.pulse += p.pulseSpeed;
        const dynamicAlpha = Math.max(
          0.1,
          Math.min(p.alpha + Math.sin(p.pulse) * 0.15, 0.95)
        );

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${dynamicAlpha})`;
        ctx.fill();

        // Neon particle glow when near mouse
        if (dist < MOUSE_RADIUS) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${(0.18 * (1 - dist / MOUSE_RADIUS)).toFixed(3)})`;
          ctx.fill();
        }

        // Connect with nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const cx = p.x - p2.x;
          const cy = p.y - p2.y;
          const cDist = Math.sqrt(cx * cx + cy * cy);

          if (cDist < CONNECTION_DIST) {
            const lineOpacity = (1 - cDist / CONNECTION_DIST) * 0.22 * intensityMultiplier;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${lineOpacity.toFixed(3)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();

            // Spawn data signal packets occasionally along connections
            if (packets.length < MAX_PACKETS && Math.random() < 0.003) {
              packets.push({
                fromIndex: i,
                toIndex: j,
                progress: 0,
                speed: Math.random() * 0.02 + 0.015,
                color: Math.random() > 0.5 ? "#10b981" : "#06b6d4",
              });
            }
          }
        }

        // Draw connection to mouse if within reach
        if (dist < MOUSE_CONNECTION_DIST) {
          const mouseLineOpacity = (1 - dist / MOUSE_CONNECTION_DIST) * 0.45;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(localMouseX, localMouseY);
          ctx.strokeStyle = `rgba(6, 182, 212, ${mouseLineOpacity.toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // 2. Animate and draw data packets traversing connections
      for (let k = packets.length - 1; k >= 0; k--) {
        const pkt = packets[k];
        const pFrom = particles[pkt.fromIndex];
        const pTo = particles[pkt.toIndex];

        if (!pFrom || !pTo) {
          packets.splice(k, 1);
          continue;
        }

        pkt.progress += pkt.speed;
        if (pkt.progress >= 1) {
          packets.splice(k, 1);
          continue;
        }

        const currX = pFrom.x + (pTo.x - pFrom.x) * pkt.progress;
        const currY = pFrom.y + (pTo.y - pFrom.y) * pkt.progress;

        // Draw luminous packet spark
        ctx.beginPath();
        ctx.arc(currX, currY, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = pkt.color;
        ctx.shadowColor = pkt.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, [theme, intensity]);

  // Dynamic opacity styles based on intensity
  const auroraOpacity =
    intensity === "vibrant"
      ? { orb1: "0.22", orb2: "0.18", orb3: "0.16", orb4: "0.20", orb5: "0.14" }
      : intensity === "subtle"
      ? { orb1: "0.08", orb2: "0.06", orb3: "0.05", orb4: "0.07", orb5: "0.04" }
      : { orb1: "0.15", orb2: "0.12", orb3: "0.10", orb4: "0.13", orb5: "0.08" };

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* ─── 1. Deep Cosmic Cyber Base ──────────────────────────────────────── */}
      <div className="absolute inset-0 bg-[#040608]" />

      {/* ─── 2. Interactive Cursor Spotlight / Torch Glow ────────────────────── */}
      {isClient && mousePos.x > 0 && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{
            background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(16, 185, 129, 0.11), rgba(6, 182, 212, 0.05), transparent 65%)`,
          }}
        />
      )}

      {/* ─── 3. Vibrant Aurora Mesh Ambient Gradient Blooms ─────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top-Right Emerald / Cyan Primary Aurora */}
        <div
          className="absolute -top-32 -right-32 h-[780px] w-[780px] rounded-full blur-[140px] animate-aurora-1"
          style={{
            opacity: auroraOpacity.orb1,
            background:
              theme === "matrix"
                ? "radial-gradient(circle, #10b981 0%, #059669 45%, transparent 70%)"
                : "radial-gradient(circle, #10b981 0%, #06b6d4 45%, #0d9488 70%, transparent 80%)",
          }}
        />

        {/* Top-Left Amber / Gold Accent Aurora */}
        <div
          className="absolute -top-40 -left-40 h-[650px] w-[650px] rounded-full blur-[150px] animate-aurora-2"
          style={{
            opacity: auroraOpacity.orb2,
            background:
              theme === "aurora"
                ? "radial-gradient(circle, #8b5cf6 0%, #6366f1 45%, transparent 70%)"
                : theme === "matrix"
                ? "radial-gradient(circle, #059669 0%, #047857 45%, transparent 70%)"
                : "radial-gradient(circle, #f59e0b 0%, #d97706 45%, transparent 70%)",
          }}
        />

        {/* Mid-Left Cosmic Violet/Indigo Depth Orb */}
        <div
          className="absolute top-[35%] -left-36 h-[680px] w-[680px] rounded-full blur-[160px] animate-aurora-3"
          style={{
            opacity: auroraOpacity.orb3,
            background:
              theme === "matrix"
                ? "radial-gradient(circle, #10b981 0%, #064e3b 50%, transparent 70%)"
                : "radial-gradient(circle, #6366f1 0%, #10b981 40%, transparent 70%)",
          }}
        />

        {/* Bottom-Right Teal & Emerald Glowing Orb */}
        <div
          className="absolute -bottom-40 -right-28 h-[740px] w-[740px] rounded-full blur-[150px] animate-aurora-1"
          style={{
            opacity: auroraOpacity.orb4,
            background:
              theme === "aurora"
                ? "radial-gradient(circle, #ec4899 0%, #8b5cf6 45%, transparent 70%)"
                : "radial-gradient(circle, #14b8a6 0%, #10b981 45%, transparent 70%)",
          }}
        />

        {/* Center-Lower Amber Radiant Pulse */}
        <div
          className="absolute -bottom-28 left-[28%] h-[560px] w-[560px] rounded-full blur-[160px] animate-aurora-2"
          style={{
            opacity: auroraOpacity.orb5,
            background:
              theme === "matrix"
                ? "radial-gradient(circle, #34d399 0%, transparent 70%)"
                : "radial-gradient(circle, #f59e0b 0%, #fbbf24 35%, transparent 70%)",
          }}
        />
      </div>

      {/* ─── 4. Cyber Scanline Sweep (Horizontal Luminous Beam) ─────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="animate-scanline absolute left-0 right-0 h-[2px] opacity-60"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(16, 185, 129, 0.1) 15%, rgba(6, 182, 212, 0.75) 50%, rgba(16, 185, 129, 0.1) 85%, transparent 100%)",
            boxShadow: "0 0 16px 2px rgba(6, 182, 212, 0.4)",
          }}
        />
      </div>

      {/* ─── 5. Interactive Neural Constellation Mesh Canvas ────────────────── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10"
      />

      {/* ─── 6. Cyber Micro-Grid Pattern with Radial Center Mask ────────────── */}
      <div
        className="absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse 90% 85% at 50% 50%, black 45%, transparent 95%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 85% at 50% 50%, black 45%, transparent 95%)",
        }}
      />

      {/* ─── 7. Precision Cybersecurity Circuit Traces & Network Bus ─────────── */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.55] pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="trace-emerald-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#06b6d4" stopOpacity="0.30" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
          </linearGradient>

          <linearGradient id="trace-amber-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.05" />
          </linearGradient>

          <pattern id="crosshair-grid" width="160" height="160" patternUnits="userSpaceOnUse">
            <path
              d="M 80 75 L 80 85 M 75 80 L 85 80"
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="0.8"
            />
          </pattern>
        </defs>

        {/* Crosshair coordinate markers */}
        <rect width="100%" height="100%" fill="url(#crosshair-grid)" />

        {/* Top-Left Peripheral Circuit Network */}
        <g strokeWidth="1" fill="none">
          <path
            d="M -20 120 L 140 120 L 190 170 L 320 170 L 350 200 L 460 200"
            stroke="url(#trace-emerald-grad)"
          />
          {/* Animated Electrical Signal Pulse */}
          <path
            d="M -20 120 L 140 120 L 190 170 L 320 170 L 350 200 L 460 200"
            stroke="#10b981"
            strokeWidth="1.6"
            className="circuit-animated-path"
          />

          <path
            d="M 80 -10 L 80 80 L 130 130 L 130 260 L 160 290 L 160 380"
            stroke="rgba(16, 185, 129, 0.2)"
          />
          <path
            d="M 80 -10 L 80 80 L 130 130 L 130 260 L 160 290 L 160 380"
            stroke="#06b6d4"
            strokeWidth="1.6"
            className="circuit-animated-fast"
          />

          <path
            d="M 20 -10 L 20 60 L 50 90 L 180 90"
            stroke="url(#trace-amber-grad)"
          />

          {/* Glowing Terminals */}
          <circle cx="460" cy="200" r="3" fill="#10b981" />
          <circle cx="460" cy="200" r="7" stroke="#10b981" strokeOpacity="0.4" strokeWidth="1" />
          <circle cx="160" cy="380" r="3" fill="#06b6d4" />
          <circle cx="180" cy="90" r="2.5" fill="#f59e0b" />
          <circle cx="190" cy="170" r="2.2" fill="#10b981" />
        </g>

        {/* Top-Right Peripheral Network Bus */}
        <g strokeWidth="1" fill="none">
          <path
            d="M 1460 90 L 1320 90 L 1260 150 L 1140 150 L 1100 190 L 980 190"
            stroke="url(#trace-emerald-grad)"
          />
          <path
            d="M 1460 90 L 1320 90 L 1260 150 L 1140 150 L 1100 190 L 980 190"
            stroke="#10b981"
            strokeWidth="1.6"
            className="circuit-animated-path"
          />

          <path
            d="M 1360 -10 L 1360 70 L 1300 130 L 1300 240 L 1240 300 L 1240 390"
            stroke="rgba(6, 182, 212, 0.22)"
          />
          <path
            d="M 1360 -10 L 1360 70 L 1300 130 L 1300 240 L 1240 300 L 1240 390"
            stroke="#06b6d4"
            strokeWidth="1.6"
            className="circuit-animated-fast"
          />

          {/* Network constellation links */}
          <line
            x1="1260"
            y1="150"
            x2="1300"
            y2="130"
            stroke="rgba(16, 185, 129, 0.2)"
            strokeWidth="0.8"
            strokeDasharray="4 4"
          />
          <line
            x1="1140"
            y1="150"
            x2="1180"
            y2="220"
            stroke="rgba(6, 182, 212, 0.2)"
            strokeWidth="0.8"
            strokeDasharray="4 4"
          />

          <circle cx="980" cy="190" r="3" fill="#10b981" />
          <circle cx="980" cy="190" r="7.5" stroke="#10b981" strokeOpacity="0.4" strokeWidth="1" />
          <circle cx="1240" cy="390" r="3" fill="#06b6d4" />
          <circle cx="1260" cy="150" r="2.5" fill="#10b981" />
          <circle cx="1140" cy="150" r="2.5" fill="#10b981" />
          <circle cx="1180" cy="220" r="2.5" fill="#06b6d4" />
        </g>

        {/* Tactical HUD Corner Elements & Coordinates */}
        <g strokeWidth="1" fill="none">
          {/* Top-Left HUD Bracket */}
          <path d="M 30 50 L 30 30 L 50 30" stroke="rgba(16, 185, 129, 0.5)" />
          {/* Top-Right HUD Bracket */}
          <path d="M 1410 50 L 1410 30 L 1390 30" stroke="rgba(16, 185, 129, 0.5)" />
          {/* Bottom-Left HUD Bracket */}
          <path d="M 30 850 L 30 870 L 50 870" stroke="rgba(16, 185, 129, 0.4)" />
          {/* Bottom-Right HUD Bracket */}
          <path d="M 1410 850 L 1410 870 L 1390 870" stroke="rgba(16, 185, 129, 0.4)" />
        </g>

        {/* Bottom-Right Circuit Bus */}
        <g strokeWidth="1" fill="none">
          <path
            d="M 1450 740 L 1340 740 L 1290 690 L 1160 690 L 1120 650 L 1020 650"
            stroke="url(#trace-emerald-grad)"
          />
          <path
            d="M 1450 740 L 1340 740 L 1290 690 L 1160 690 L 1120 650 L 1020 650"
            stroke="#10b981"
            strokeWidth="1.6"
            className="circuit-animated-path"
          />

          <path
            d="M 1380 860 L 1380 770 L 1320 710 L 1320 610 L 1270 560 L 1270 480"
            stroke="url(#trace-amber-grad)"
          />
          <circle cx="1020" cy="650" r="3" fill="#10b981" />
          <circle cx="1020" cy="650" r="7" stroke="#10b981" strokeOpacity="0.4" strokeWidth="1" />
          <circle cx="1270" cy="480" r="3" fill="#f59e0b" />
          <circle cx="1270" cy="480" r="7" stroke="#f59e0b" strokeOpacity="0.4" strokeWidth="1" />
        </g>
      </svg>

      {/* ─── 8. Soft Perimeter Vignette for Crisp Content Readability ──────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 95% 85% at 50% 50%, transparent 40%, rgba(4, 6, 8, 0.6) 75%, #040608 100%)",
        }}
      />

      {/* ─── 9. Interactive Background FX Controller (Floating Widget) ──────── */}
      <div className="pointer-events-auto fixed bottom-6 left-6 z-40 hidden sm:block">
        <div className="relative">
          {!controlOpen ? (
            <button
              onClick={() => setControlOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#080d16]/85 border border-emerald-500/30 text-emerald-300 text-xs font-semibold backdrop-blur-md shadow-lg hover:border-emerald-400 hover:bg-emerald-500/10 transition-all cursor-pointer group"
              title="Customize Background Aesthetics"
              aria-label="Customize Background Aesthetics"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" style={{ animationDuration: "12s" }} />
              <span className="text-[11px] font-mono tracking-wider">BG FX</span>
              <ChevronUp className="w-3 h-3 text-slate-400 group-hover:text-emerald-400" />
            </button>
          ) : (
            <div className="p-3.5 rounded-2xl bg-[#070c14]/95 border border-emerald-500/35 backdrop-blur-xl shadow-2xl w-64 text-xs font-mono animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ATMOSPHERE CONTROLS</span>
                </div>
                <button
                  onClick={() => setControlOpen(false)}
                  className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                  aria-label="Close background controls"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Theme Modes */}
              <div className="mb-3">
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mb-1.5">
                  Visual Palette:
                </span>
                <div className="grid grid-cols-3 gap-1">
                  {(["cyber", "aurora", "matrix"] as BackgroundTheme[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => handleThemeChange(t)}
                      className={`px-2 py-1 rounded text-[10px] capitalize transition-all cursor-pointer ${
                        theme === t
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 font-bold"
                          : "bg-white/[0.04] text-slate-400 hover:text-slate-200 border border-transparent"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Intensity Settings */}
              <div>
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mb-1.5">
                  Intensity:
                </span>
                <div className="grid grid-cols-3 gap-1">
                  {(["vibrant", "balanced", "subtle"] as EffectIntensity[]).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => handleIntensityChange(lvl)}
                      className={`px-2 py-1 rounded text-[10px] capitalize transition-all cursor-pointer ${
                        intensity === lvl
                          ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-bold"
                          : "bg-white/[0.04] text-slate-400 hover:text-slate-200 border border-transparent"
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-white/[0.08] flex items-center justify-between text-[9px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Shield className="w-2.5 h-2.5 text-emerald-400" />
                  Realtime Canvas Mesh
                </span>
                <span className="text-emerald-400/80">60 FPS</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

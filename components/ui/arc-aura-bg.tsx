"use client";

import { useEffect, useRef } from "react";

export default function ArcAuraBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;
    let W = 0, H = 0;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Arc definitions — ember palette
    const arcs = [
      { rx: 0.65, ry: 0.38, angle: 0,   speed:  0.00055, thickness: 220, alpha: 0.10, color: "#FF6B35", startAngle: -0.6, sweep: 1.4 },
      { rx: 0.52, ry: 0.55, angle: 1.1,  speed: -0.00040, thickness: 160, alpha: 0.07, color: "#CC5528", startAngle:  0.2, sweep: 1.8 },
      { rx: 0.78, ry: 0.28, angle: 2.3,  speed:  0.00030, thickness: 300, alpha: 0.05, color: "#FF8555", startAngle: -1.0, sweep: 2.2 },
      { rx: 0.42, ry: 0.70, angle: 3.8,  speed: -0.00065, thickness: 130, alpha: 0.06, color: "#FF6B35", startAngle:  0.8, sweep: 1.1 },
      { rx: 0.88, ry: 0.45, angle: 0.5,  speed:  0.00025, thickness: 380, alpha: 0.03, color: "#CC5528", startAngle: -0.3, sweep: 2.8 },
    ];

    const orbs = [
      { ox: 0.28, oy: 0.60, r: 300, alpha: 0.06,  speed: 0.00020,  phase: 0   },
      { ox: 0.72, oy: 0.65, r: 260, alpha: 0.045, speed: -0.00028, phase: 1.5 },
      { ox: 0.50, oy: 0.45, r: 460, alpha: 0.03,  speed: 0.00015,  phase: 3   },
    ];

    let t = 0;

    const toHex2 = (n: number) => Math.round(n * 255).toString(16).padStart(2, "0");

    const drawArc = (arc: typeof arcs[0], cx: number, cy: number) => {
      const rx = W * arc.rx;
      const ry = H * arc.ry;
      const a0 = arc.startAngle + arc.angle;
      const a1 = a0 + arc.sweep;

      ctx.save();
      ctx.translate(cx, cy);

      const grad = ctx.createLinearGradient(
        Math.cos(a0) * rx, Math.sin(a0) * ry,
        Math.cos(a0 + arc.sweep * 0.5) * rx, Math.sin(a0 + arc.sweep * 0.5) * ry
      );
      const hex = toHex2(arc.alpha);
      grad.addColorStop(0, "transparent");
      grad.addColorStop(0.3, arc.color + hex);
      grad.addColorStop(0.7, arc.color + hex);
      grad.addColorStop(1, "transparent");

      ctx.beginPath();
      ctx.ellipse(0, 0, rx, ry, 0, a0, a1);
      ctx.strokeStyle = grad;
      ctx.lineWidth = arc.thickness;
      ctx.shadowColor = arc.color;
      ctx.shadowBlur = arc.thickness * 0.5;
      ctx.globalAlpha = 1;
      ctx.stroke();
      ctx.restore();
    };

    const drawOrb = (orb: typeof orbs[0]) => {
      const wx = Math.sin(t * orb.speed * 3000 + orb.phase) * W * 0.08;
      const wy = Math.cos(t * orb.speed * 2000 + orb.phase) * H * 0.06;
      const x = W * orb.ox + wx;
      const y = H * orb.oy + wy;

      const grad = ctx.createRadialGradient(x, y, 0, x, y, orb.r);
      grad.addColorStop(0,   `rgba(255,107,53,${orb.alpha})`);
      grad.addColorStop(0.5, `rgba(255,107,53,${orb.alpha * 0.35})`);
      grad.addColorStop(1,   "rgba(255,107,53,0)");

      ctx.beginPath();
      ctx.arc(x, y, orb.r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    };

    const render = (timestamp: number) => {
      t = timestamp;
      ctx.clearRect(0, 0, W, H);

      ctx.fillStyle = "#1A1D20";
      ctx.fillRect(0, 0, W, H);

      orbs.forEach(drawOrb);

      const cx = W * 0.5, cy = H * 0.5;
      arcs.forEach((arc) => {
        arc.angle += arc.speed * 16;
        drawArc(arc, cx, cy);
      });

      // Vignette
      const v = ctx.createRadialGradient(cx, cy, H * 0.1, cx, cy, H * 0.85);
      v.addColorStop(0, "rgba(10,12,14,0)");
      v.addColorStop(1, "rgba(10,12,14,0.72)");
      ctx.fillStyle = v;
      ctx.fillRect(0, 0, W, H);

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0, pointerEvents: "none" }}
    />
  );
}

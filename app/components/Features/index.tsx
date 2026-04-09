"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Paintbrush, Film } from "lucide-react";
import styles from "./Features.module.css";

gsap.registerPlugin(ScrollTrigger);

/* ─── Card 1: Water Beading Animation (Ceramic Coating) ─── */
function WaterBeading() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dropletsRef = useRef<
    { x: number; y: number; r: number; vy: number; opacity: number }[]
  >([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = 320;
    const h = 200;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    let animId: number;

    function spawnDroplet() {
      dropletsRef.current.push({
        x: 30 + Math.random() * (w - 60),
        y: -10 - Math.random() * 30,
        r: 3 + Math.random() * 6,
        vy: 0.3 + Math.random() * 0.5,
        opacity: 0.5 + Math.random() * 0.5,
      });
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      ctx.strokeStyle = "rgba(201, 168, 76, 0.15)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(20, h - 30);
      ctx.lineTo(w - 20, h - 30);
      ctx.stroke();

      ctx.fillStyle = "rgba(201, 168, 76, 0.25)";
      ctx.font = "9px 'JetBrains Mono', monospace";
      ctx.fillText("CERAMIC SURFACE", 20, h - 16);

      dropletsRef.current.forEach((d) => {
        if (d.y + d.r >= h - 30) {
          d.vy = 0;
          d.opacity -= 0.004;

          ctx.save();
          ctx.beginPath();
          ctx.ellipse(d.x, h - 30 - d.r * 0.8, d.r * 0.9, d.r * 1.2, 0, 0, Math.PI * 2);

          const grad = ctx.createRadialGradient(
            d.x - d.r * 0.3, h - 30 - d.r * 1.2, 0,
            d.x, h - 30 - d.r * 0.5, d.r * 1.5
          );
          grad.addColorStop(0, `rgba(201, 168, 76, ${d.opacity * 0.7})`);
          grad.addColorStop(0.5, `rgba(201, 168, 76, ${d.opacity * 0.35})`);
          grad.addColorStop(1, `rgba(201, 168, 76, ${d.opacity * 0.1})`);
          ctx.fillStyle = grad;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(d.x - d.r * 0.25, h - 30 - d.r * 1.1, d.r * 0.25, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${d.opacity * 0.5})`;
          ctx.fill();
          ctx.restore();
        } else {
          d.y += d.vy;

          ctx.save();
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.r * 0.7, 0, Math.PI * 2);
          const grad = ctx.createRadialGradient(
            d.x - d.r * 0.2, d.y - d.r * 0.2, 0,
            d.x, d.y, d.r
          );
          grad.addColorStop(0, `rgba(201, 168, 76, ${d.opacity * 0.5})`);
          grad.addColorStop(1, `rgba(201, 168, 76, ${d.opacity * 0.15})`);
          ctx.fillStyle = grad;
          ctx.fill();
          ctx.restore();
        }
      });

      dropletsRef.current = dropletsRef.current.filter((d) => d.opacity > 0.05);
      animId = requestAnimationFrame(draw);
    }

    const spawnInterval = setInterval(spawnDroplet, 600);
    for (let i = 0; i < 5; i++) {
      setTimeout(spawnDroplet, i * 200);
    }

    draw();

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(spawnInterval);
    };
  }, []);

  return (
    <>
      <div className={styles.cardHeader}>
        <Shield className={styles.cardIcon} size={18} />
        <h3 className={styles.cardTitle}>Ceramic Coating</h3>
      </div>
      <p className={styles.cardDescription}>
        Professional-grade nano-ceramic protection that bonds at the molecular
        level — multi-layer application for years of hydrophobic shine and UV defence.
      </p>
      <div className={styles.canvasContainer}>
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          style={{ maxWidth: 320 }}
        />
      </div>
    </>
  );
}

/* ─── Card 2: Orbital Buffer Animation (Paint Correction) ─── */
function OrbitalBuffer() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cleared, setCleared] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to("[data-buffer-pad]", {
        rotation: 360,
        duration: 1.5,
        ease: "none",
        repeat: -1,
        transformOrigin: "center center",
      });

      gsap.to("[data-buffer-group]", {
        x: 15,
        y: 8,
        duration: 2.5,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, svgRef);

    const interval = setInterval(() => {
      setCleared((prev) => {
        if (prev >= 94) return 0;
        return prev + 2;
      });
    }, 200);

    return () => {
      ctx.revert();
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className={styles.cardHeader}>
        <Paintbrush className={styles.cardIcon} size={18} />
        <h3 className={styles.cardTitle}>Paint Correction</h3>
      </div>
      <p className={styles.cardDescription}>
        Multi-stage machine polishing with paint depth measurement at every pass.
        Swirl marks, scratches, and oxidation eliminated with surgical precision.
      </p>

      <div className={styles.darkPanel}>
        <div className={styles.panelHeader}>
          <div className={styles.statusGroup}>
            <div className={`${styles.statusDot} pulse-dot`} />
            <span className={styles.statusLabel}>Correcting</span>
          </div>
          <span className={styles.percentage}>{cleared}%</span>
        </div>

        <div className={styles.progressTrack}>
          <div
            className={styles.progressBar}
            style={{ width: `${cleared}%` }}
          />
        </div>

        <svg ref={svgRef} viewBox="0 0 260 100" className={styles.svgFull}>
          {[
            { cx: 40, cy: 30, r: 12 },
            { cx: 90, cy: 55, r: 15 },
            { cx: 150, cy: 35, r: 10 },
            { cx: 200, cy: 60, r: 13 },
            { cx: 60, cy: 70, r: 11 },
            { cx: 130, cy: 75, r: 9 },
            { cx: 220, cy: 30, r: 14 },
          ].map((swirl, i) => (
            <g key={i} opacity={Math.max(0, 1 - cleared / 100)}>
              <circle cx={swirl.cx} cy={swirl.cy} r={swirl.r} fill="none" stroke="rgba(201, 168, 76, 0.12)" strokeWidth="0.5" />
              <path d={`M${swirl.cx - swirl.r * 0.7},${swirl.cy} Q${swirl.cx},${swirl.cy - swirl.r * 0.5} ${swirl.cx + swirl.r * 0.7},${swirl.cy}`} fill="none" stroke="rgba(250, 248, 245, 0.1)" strokeWidth="0.7" />
            </g>
          ))}

          <g data-buffer-group>
            <g data-buffer-pad>
              <circle cx="130" cy="50" r="22" fill="none" stroke="rgba(201, 168, 76, 0.4)" strokeWidth="1.5" strokeDasharray="3 5" />
              <circle cx="130" cy="50" r="14" fill="rgba(201, 168, 76, 0.08)" stroke="rgba(201, 168, 76, 0.25)" strokeWidth="1" />
              <circle cx="130" cy="50" r="4" fill="rgba(201, 168, 76, 0.3)" />
            </g>
          </g>

          <rect x="0" y="0" width="260" height="100" fill="rgba(201, 168, 76, 0.03)" opacity={cleared / 100} />
        </svg>
      </div>
    </>
  );
}

/* ─── Card 3: PPF Film Application Animation ─── */
function PPFApplication() {
  const [coverage, setCoverage] = useState(0);
  const dirRef = useRef(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCoverage((prev) => {
        if (prev >= 100) dirRef.current = -1;
        if (prev <= 0) dirRef.current = 1;
        return prev + dirRef.current * 0.6;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const panels = [
    { label: "Hood" },
    { label: "Front bumper" },
    { label: "Side mirrors" },
    { label: "Door edges" },
    { label: "Rocker panels" },
  ];

  return (
    <>
      <div className={styles.cardHeader}>
        <Film className={styles.cardIcon} size={18} />
        <h3 className={styles.cardTitle}>Paint Protection Film</h3>
      </div>
      <p className={styles.cardDescription}>
        Self-healing thermoplastic urethane film — invisible armour against stone chips,
        road debris, and environmental contaminants.
      </p>

      <div className={styles.darkPanel}>
        <div className={styles.panelHeader}>
          <div className={styles.statusGroup}>
            <div className={`${styles.statusDot} pulse-dot`} />
            <span className={styles.statusLabel}>PPF Application</span>
          </div>
          <span className={styles.percentage}>{Math.round(coverage)}%</span>
        </div>

        <div className={styles.panelList}>
          {panels.map((panel, i) => {
            const panelCoverage = Math.min(100, Math.max(0, (coverage - i * 15) * (100 / 25)));
            return (
              <div key={panel.label}>
                <div className={styles.panelItemHeader}>
                  <span className={styles.panelItemLabel}>{panel.label}</span>
                  <span className={styles.panelItemStatus}>
                    {panelCoverage > 95 ? "Protected" : "Applying..."}
                  </span>
                </div>
                <div className={styles.panelItemTrack}>
                  <div
                    className={styles.panelItemBar}
                    style={{
                      width: `${panelCoverage}%`,
                      background: panelCoverage > 95
                        ? "rgba(201, 168, 76, 0.6)"
                        : "rgba(201, 168, 76, 0.3)",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.filmLabel}>
          <div className={`${styles.filmLine} ${styles.filmLineLeft}`} />
          <span className={styles.filmText}>SELF-HEALING FILM</span>
          <div className={`${styles.filmLine} ${styles.filmLineRight}`} />
        </div>
      </div>
    </>
  );
}

/* ─── Features Section ─── */
export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-feature-card]", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={sectionRef} className={styles.section}>
      <div className={styles.header}>
        <p className={styles.label}>Our Services</p>
        <h2 className={styles.title}>
          Crafted with{" "}
          <span className={styles.titleAccent}>obsession.</span>
        </h2>
      </div>

      <div className={styles.grid}>
        {[WaterBeading, OrbitalBuffer, PPFApplication].map((Card, i) => (
          <div key={i} data-feature-card className={styles.card}>
            <Card />
          </div>
        ))}
      </div>
    </section>
  );
}

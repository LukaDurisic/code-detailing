"use client";

import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Protocol.module.css";

gsap.registerPlugin(ScrollTrigger);

/* ─── SVG Animation 1: Rotating Polish Orbital ─── */
function RotatingMotif() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to("[data-rotate-ring]", {
        rotation: 360,
        duration: 20,
        ease: "none",
        repeat: -1,
        transformOrigin: "center center",
      });
      gsap.to("[data-rotate-ring-reverse]", {
        rotation: -360,
        duration: 30,
        ease: "none",
        repeat: -1,
        transformOrigin: "center center",
      });
    }, svgRef);
    return () => ctx.revert();
  }, []);

  return (
    <svg ref={svgRef} viewBox="0 0 200 200" className={styles.rotatingSvg}>
      <g data-rotate-ring>
        <circle cx="100" cy="100" r="80" fill="none" stroke="#C9A84C" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="60" fill="none" stroke="#C9A84C" strokeWidth="0.5" strokeDasharray="4 8" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <line key={angle} x1="100" y1="30" x2="100" y2="50" stroke="#C9A84C" strokeWidth="0.5" transform={`rotate(${angle} 100 100)`} />
        ))}
      </g>
      <g data-rotate-ring-reverse>
        <circle cx="100" cy="100" r="40" fill="none" stroke="#C9A84C" strokeWidth="0.3" strokeDasharray="2 6" />
      </g>
    </svg>
  );
}

/* ─── SVG Animation 2: Scanning Laser Line ─── */
function ScanningLaser() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to("[data-laser]", {
        y: 160,
        duration: 3,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={styles.laserContainer}>
      <svg viewBox="0 0 160 200" className={styles.laserSvg}>
        {Array.from({ length: 8 }).map((_, row) =>
          Array.from({ length: 6 }).map((_, col) => (
            <circle key={`${row}-${col}`} cx={13 + col * 28} cy={10 + row * 25} r="2" fill="#C9A84C" opacity="0.3" />
          ))
        )}
        <line data-laser x1="0" y1="0" x2="160" y2="0" stroke="#C9A84C" strokeWidth="1.5" opacity="0.8" />
      </svg>
    </div>
  );
}

/* ─── SVG Animation 3: Pulsing Waveform ─── */
function PulsingWaveform() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to("[data-wave-path]", {
        strokeDashoffset: -400,
        duration: 4,
        ease: "none",
        repeat: -1,
      });
    }, svgRef);
    return () => ctx.revert();
  }, []);

  return (
    <svg ref={svgRef} viewBox="0 0 300 80" className={styles.waveformSvg}>
      <path
        data-wave-path
        d="M0,40 Q20,40 30,20 Q40,0 50,40 Q60,80 70,40 Q80,40 90,40 Q110,40 120,15 Q130,-10 140,40 Q150,90 160,40 Q170,40 180,40 Q200,40 210,25 Q220,10 230,40 Q240,70 250,40 Q260,40 270,40 L300,40"
        fill="none"
        stroke="#C9A84C"
        strokeWidth="1.5"
        strokeDasharray="200"
        strokeDashoffset="0"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Protocol() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const { t } = useTranslation();

  const steps = [
    {
      number: "01",
      title: t("protocol.step01.title"),
      description: t("protocol.step01.description"),
      Animation: RotatingMotif,
    },
    {
      number: "02",
      title: t("protocol.step02.title"),
      description: t("protocol.step02.description"),
      Animation: ScanningLaser,
    },
    {
      number: "03",
      title: t("protocol.step03.title"),
      description: t("protocol.step03.description"),
      Animation: PulsingWaveform,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (i < steps.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: "top top",
            end: "bottom top",
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
              const progress = self.progress;
              gsap.to(card, {
                scale: 1 - progress * 0.1,
                filter: `blur(${progress * 20}px)`,
                opacity: 1 - progress * 0.5,
                duration: 0.1,
                overwrite: true,
              });
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="protocol" ref={sectionRef} className={styles.section}>
      <div className={styles.header}>
        <p className={styles.label}>{t("protocol.label")}</p>
        <h2 className={styles.title}>
          {t("protocol.title")}{" "}
          <span className={styles.titleAccent}>{t("protocol.titleAccent")}</span>
        </h2>
      </div>

      {steps.map((step, i) => (
        <div
          key={step.number}
          ref={(el) => {
            if (el) cardsRef.current[i] = el;
          }}
          className={styles.stepContainer}
        >
          <div className={styles.stepCard}>
            <div className={styles.animationContainer}>
              <step.Animation />
            </div>

            <div className={styles.stepContent}>
              <span className={styles.stepNumber}>{t("protocol.step")} {step.number}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

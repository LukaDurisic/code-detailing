"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight, ChevronDown } from "lucide-react";
import styles from "./Hero.module.css";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-anim]", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.3,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} id="hero">
      <div id="hero-sentinel" className={styles.sentinel} />

      <div
        className={styles.bgImage}
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80')",
        }}
      />

      <div className={styles.overlay} />

      <div ref={containerRef} className={styles.content}>
        <p data-hero-anim className={styles.tagline}>
          Premium Automotive Detailing — Đakovo, Croatia
        </p>

        <h1 data-hero-anim className={styles.headingLine1}>
          <span className={styles.headingText1}>Elegance meets</span>
        </h1>

        <h1 data-hero-anim className={styles.headingLine2}>
          <span className={styles.headingText2}>Precision.</span>
        </h1>

        <p data-hero-anim className={styles.description}>
          Where automotive artistry converges with molecular-level protection.
          Ceramic coating, paint correction, and PPF — crafted with obsession
          by David Salopek.
        </p>

        <div data-hero-anim className={styles.ctaGroup}>
          <a href="#pricing" className={`${styles.ctaPrimary} btn-magnetic`}>
            <span className={`${styles.ctaPrimaryBg} btn-bg`} />
            <span className={styles.ctaPrimaryContent}>
              Book Now
              <ArrowRight size={18} />
            </span>
          </a>
          <a href="#features" className={`${styles.ctaSecondary} btn-magnetic`}>
            <span className={styles.ctaSecondaryContent}>
              Our Services
              <ChevronDown size={18} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

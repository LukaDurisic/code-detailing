"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Philosophy.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words1 = sectionRef.current?.querySelectorAll("[data-word-1]");
      if (words1) {
        gsap.from(words1, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.04,
          scrollTrigger: {
            trigger: "[data-statement-1]",
            start: "top 80%",
          },
        });
      }

      const words2 = sectionRef.current?.querySelectorAll("[data-word-2]");
      if (words2) {
        gsap.from(words2, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.05,
          scrollTrigger: {
            trigger: "[data-statement-2]",
            start: "top 80%",
          },
        });
      }

      gsap.to("[data-parallax-bg]", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const statement1Words = ["Most", "detailing", "focuses", "on:", "surface-level", "cleaning."];
  const statement2Words = [
    { text: "We", highlight: false },
    { text: "focus", highlight: false },
    { text: "on:", highlight: false },
    { text: "molecular-level", highlight: true },
    { text: "perfection.", highlight: true },
  ];

  return (
    <section id="philosophy" ref={sectionRef} className={styles.section}>
      <div
        data-parallax-bg
        className={styles.parallaxBg}
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&q=80')",
        }}
      />

      <div className={styles.gradientOverlay} />

      <div className={styles.content}>
        <div data-statement-1 className={styles.statement1}>
          <p className={styles.statement1Text}>
            {statement1Words.map((word, i) => (
              <span key={i} data-word-1>
                {word}
              </span>
            ))}
          </p>
        </div>

        <div data-statement-2>
          <p className={styles.statement2Text}>
            {statement2Words.map((word, i) => (
              <span
                key={i}
                data-word-2
                className={word.highlight ? styles.wordHighlight : styles.wordDefault}
              >
                {word.text}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}

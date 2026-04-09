"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, ArrowRight } from "lucide-react";
import styles from "./Pricing.module.css";

gsap.registerPlugin(ScrollTrigger);

const tiers = [
  {
    name: "Essential",
    price: "€249",
    description: "Professional exterior refresh and protection",
    features: [
      "Full exterior hand wash & decontamination",
      "Single-stage paint correction",
      "Interior vacuum & wipe-down",
      "Tire & wheel deep clean",
      "Glass polishing",
    ],
    highlighted: false,
  },
  {
    name: "Performance",
    price: "€599",
    description: "Our signature multi-stage treatment",
    features: [
      "Everything in Essential",
      "Two-stage paint correction",
      "Ceramic coating (1 year durability)",
      "Leather conditioning & restoration",
      "Engine bay detail",
      "Paint depth measurement report",
    ],
    highlighted: true,
  },
  {
    name: "Concours",
    price: "€1.299",
    description: "The ultimate show-car level restoration",
    features: [
      "Everything in Performance",
      "Three-stage paint correction",
      "Premium ceramic coating (5 year)",
      "Full interior deep restoration",
      "Headlight restoration",
      "PPF on high-impact zones",
      "Annual maintenance plan",
    ],
    highlighted: false,
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-pricing-card]", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="pricing" ref={sectionRef} className={styles.section}>
      <div className={styles.header}>
        <p className={styles.label}>Pricing</p>
        <h2 className={styles.title}>
          Invest in{" "}
          <span className={styles.titleAccent}>excellence.</span>
        </h2>
        <p className={styles.subtitle}>
          Every package includes our signature attention to detail. Prices vary
          by vehicle size — contact us for a precise quote.
        </p>
      </div>

      <div className={styles.grid}>
        {tiers.map((tier) => (
          <div
            key={tier.name}
            data-pricing-card
            className={`${styles.card} ${tier.highlighted ? styles.cardHighlighted : ""}`}
          >
            {tier.highlighted && (
              <span className={styles.badge}>Most Popular</span>
            )}

            <h3 className={`${styles.tierName} ${tier.highlighted ? styles.tierNameHighlighted : ""}`}>
              {tier.name}
            </h3>
            <p className={styles.tierDescription}>{tier.description}</p>

            <div className={styles.priceBlock}>
              <span className={styles.price}>{tier.price}</span>
              <span className={styles.priceNote}>starting from</span>
            </div>

            <ul className={styles.featureList}>
              {tier.features.map((feature) => (
                <li key={feature} className={styles.featureItem}>
                  <Check
                    size={15}
                    className={`${styles.checkIcon} ${tier.highlighted ? styles.checkIconHighlighted : ""}`}
                  />
                  <span className={styles.featureText}>{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href="https://wa.me/385953566095"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.ctaButton} ${tier.highlighted ? styles.ctaButtonHighlighted : ""} btn-magnetic`}
            >
              <span
                className={`${styles.ctaBg} btn-bg ${
                  tier.highlighted ? styles.ctaBgHighlighted : styles.ctaBgDefault
                }`}
              />
              <span className={styles.ctaContent}>
                Get a Quote
                <ArrowRight size={15} />
              </span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

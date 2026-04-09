"use client";

import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, ArrowRight } from "lucide-react";
import styles from "./Pricing.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const tiers = [
    {
      key: "essential",
      name: t("pricing.essential.name"),
      price: "€249",
      description: t("pricing.essential.description"),
      features: [
        t("pricing.essential.feature1"),
        t("pricing.essential.feature2"),
        t("pricing.essential.feature3"),
        t("pricing.essential.feature4"),
        t("pricing.essential.feature5"),
      ],
      highlighted: false,
    },
    {
      key: "performance",
      name: t("pricing.performance.name"),
      price: "€599",
      description: t("pricing.performance.description"),
      features: [
        t("pricing.performance.feature1"),
        t("pricing.performance.feature2"),
        t("pricing.performance.feature3"),
        t("pricing.performance.feature4"),
        t("pricing.performance.feature5"),
        t("pricing.performance.feature6"),
      ],
      highlighted: true,
    },
    {
      key: "concours",
      name: t("pricing.concours.name"),
      price: "€1.299",
      description: t("pricing.concours.description"),
      features: [
        t("pricing.concours.feature1"),
        t("pricing.concours.feature2"),
        t("pricing.concours.feature3"),
        t("pricing.concours.feature4"),
        t("pricing.concours.feature5"),
        t("pricing.concours.feature6"),
        t("pricing.concours.feature7"),
      ],
      highlighted: false,
    },
  ];

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
        <p className={styles.label}>{t("pricing.label")}</p>
        <h2 className={styles.title}>
          {t("pricing.title")}{" "}
          <span className={styles.titleAccent}>{t("pricing.titleAccent")}</span>
        </h2>
        <p className={styles.subtitle}>
          {t("pricing.subtitle")}
        </p>
      </div>

      <div className={styles.grid}>
        {tiers.map((tier) => (
          <div
            key={tier.key}
            data-pricing-card
            className={`${styles.card} ${tier.highlighted ? styles.cardHighlighted : ""}`}
          >
            {tier.highlighted && (
              <span className={styles.badge}>{t("pricing.mostPopular")}</span>
            )}

            <h3 className={`${styles.tierName} ${tier.highlighted ? styles.tierNameHighlighted : ""}`}>
              {tier.name}
            </h3>
            <p className={styles.tierDescription}>{tier.description}</p>

            <div className={styles.priceBlock}>
              <span className={styles.price}>{tier.price}</span>
              <span className={styles.priceNote}>{t("pricing.startingFrom")}</span>
            </div>

            <ul className={styles.featureList}>
              {tier.features.map((feature) => (
                <li key={`${tier.key}-${feature}`} className={styles.featureItem}>
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
                {t("pricing.getQuote")}
                <ArrowRight size={15} />
              </span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

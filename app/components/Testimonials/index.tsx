"use client";

import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "lucide-react";
import styles from "./Testimonials.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const testimonials = [
    {
      key: "marko",
      name: "Marko P.",
      vehicle: "Audi RS6 Avant",
      rating: 5,
      text: t("testimonials.marko.text"),
      translation: t("testimonials.marko.translation"),
    },
    {
      key: "ivan",
      name: "Ivan K.",
      vehicle: "BMW M4 Competition",
      rating: 5,
      text: t("testimonials.ivan.text"),
      translation: t("testimonials.ivan.translation"),
    },
    {
      key: "ana",
      name: "Ana S.",
      vehicle: "Mercedes-Benz GLE Coupé",
      rating: 5,
      text: t("testimonials.ana.text"),
      translation: t("testimonials.ana.translation"),
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-testimonial-card]", {
        y: 50,
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
    <section id="testimonials" ref={sectionRef} className={styles.section}>
      <div className={styles.header}>
        <p className={styles.label}>{t("testimonials.label")}</p>
        <h2 className={styles.title}>
          {t("testimonials.title")}{" "}
          <span className={styles.titleAccent}>{t("testimonials.titleAccent")}</span>
        </h2>
      </div>

      <div className={styles.grid}>
        {testimonials.map((testimonial) => (
          <div key={testimonial.key} data-testimonial-card className={styles.card}>
            <div className={styles.stars}>
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star key={i} size={14} className={styles.starIcon} />
              ))}
            </div>

            <p className={styles.quote}>&ldquo;{testimonial.text}&rdquo;</p>
            {testimonial.translation && (
              <p className={styles.translation}>{testimonial.translation}</p>
            )}

            <div className={styles.author}>
              <p className={styles.authorName}>{testimonial.name}</p>
              <p className={styles.authorVehicle}>{testimonial.vehicle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

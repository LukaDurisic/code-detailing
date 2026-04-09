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

  const source = t("testimonials.googleReview");

  const testimonials = [
    {
      key: "slaven",
      name: "Slaven Knežević",
      source,
      rating: 5,
      text: t("testimonials.slaven.text"),
      translation: t("testimonials.slaven.translation"),
    },
    {
      key: "matija",
      name: "Matija Petanjak",
      source,
      rating: 5,
      text: t("testimonials.matija.text"),
      translation: t("testimonials.matija.translation"),
    },
    {
      key: "josip",
      name: "Josip Kretonić",
      source,
      rating: 5,
      text: t("testimonials.josip.text"),
      translation: t("testimonials.josip.translation"),
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
          <a
            key={testimonial.key}
            data-testimonial-card
            className={styles.card}
            href="https://www.google.com/maps/place/CODE+detailing/@45.3111022,18.3984254,753m/data=!3m1!1e3!4m8!3m7!1s0x475c55c2bc30fb87:0x1176e0d1d3849b1!8m2!3d45.3111022!4d18.4010057!9m1!1b1!16s%2Fg%2F11t8f4f5tv"
            target="_blank"
            rel="noopener noreferrer"
          >
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
              <p className={styles.authorSource}>{testimonial.source}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

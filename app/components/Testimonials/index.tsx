"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "lucide-react";
import styles from "./Testimonials.module.css";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Marko P.",
    vehicle: "Audi RS6 Avant",
    rating: 5,
    text: "Nevjerojatan rezultat. David je posvetio čitav dan mom RS6 — keramička zaštita izgleda fenomenalno, a boja sjaji kao nikad prije. Topla preporuka!",
    translation: "Incredible result. David dedicated a full day to my RS6 — the ceramic coating looks phenomenal and the paint shines like never before.",
  },
  {
    name: "Ivan K.",
    vehicle: "BMW M4 Competition",
    text: "Korekcija laka u tri faze potpuno je uklonila vrtložne tragove. Profesionalni pristup od početka do kraja — CODE je jedini detailer kojem povjeravam svoj auto.",
    translation: "Three-stage paint correction completely removed all swirl marks. Professional approach start to finish — CODE is the only detailer I trust with my car.",
    rating: 5,
  },
  {
    name: "Ana S.",
    vehicle: "Mercedes-Benz GLE Coupé",
    text: "PPF na prednjem dijelu plus keramika na cijelom autu. Rezultat premašuje očekivanja. Preporučujem svima koji traže premium uslugu u Hrvatskoj.",
    translation: "PPF on the front end plus full ceramic coating. Result exceeds expectations. Recommend to anyone seeking premium service in Croatia.",
    rating: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);

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
        <p className={styles.label}>Testimonials</p>
        <h2 className={styles.title}>
          Trusted by{" "}
          <span className={styles.titleAccent}>enthusiasts.</span>
        </h2>
      </div>

      <div className={styles.grid}>
        {testimonials.map((t) => (
          <div key={t.name} data-testimonial-card className={styles.card}>
            <div className={styles.stars}>
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} size={14} className={styles.starIcon} />
              ))}
            </div>

            <p className={styles.quote}>&ldquo;{t.text}&rdquo;</p>
            <p className={styles.translation}>{t.translation}</p>

            <div className={styles.author}>
              <p className={styles.authorName}>{t.name}</p>
              <p className={styles.authorVehicle}>{t.vehicle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

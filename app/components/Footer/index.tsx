"use client";

import { Phone, AtSign, MapPin } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brandCol}>
            <h3 className={styles.brandName}>CODE</h3>
            <p className={styles.brandSub}>Detailing</p>
            <p className={styles.brandDescription}>
              Premium automotive detailing by David Salopek. Where precision meets
              artistry — every vehicle, a masterpiece.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className={styles.columnTitle}>Services</h4>
            <ul className={styles.linkList}>
              {[
                "Ceramic Coating",
                "Paint Correction",
                "Paint Protection Film",
                "Headlight Restoration",
                "Interior Deep Clean",
              ].map((item) => (
                <li key={item}>
                  <a href="#features" className={`${styles.link} link-lift`}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className={styles.columnTitle}>Company</h4>
            <ul className={styles.linkList}>
              {[
                { label: "About", href: "#philosophy" },
                { label: "Process", href: "#protocol" },
                { label: "Pricing", href: "#pricing" },
                { label: "Testimonials", href: "#testimonials" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className={`${styles.link} link-lift`}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className={styles.columnTitle}>Contact</h4>
            <ul className={styles.linkList}>
              <li>
                <a href="tel:+385953566095" className={`${styles.contactLink} link-lift`}>
                  <Phone size={14} className={styles.contactIcon} />
                  +385 95 356 6095
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/codedetailing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.contactLink} link-lift`}
                >
                  <AtSign size={14} className={styles.contactIcon} />
                  codedetailing
                </a>
              </li>
              <li>
                <span className={styles.contactText}>
                  <MapPin size={14} className={styles.contactIcon} />
                  Đakovo, Croatia
                </span>
              </li>
              <li>
                <a
                  href="https://wa.me/385953566095"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.whatsappBtn} link-lift`}
                >
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottomBar}>
          <div className={styles.statusGroup}>
            <div className={`${styles.statusDot} pulse-dot`} />
            <span className={styles.statusText}>Accepting Bookings</span>
          </div>

          <div className={styles.legalLinks}>
            <a href="#" className={styles.legalLink}>Privacy</a>
            <a href="#" className={styles.legalLink}>Terms</a>
            <span>&copy; {new Date().getFullYear()} Code Detailing</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

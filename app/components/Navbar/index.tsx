"use client";

import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById("hero-sentinel");
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const links = [
    { label: "Services", href: "#features" },
    { label: "Philosophy", href: "#philosophy" },
    { label: "Process", href: "#protocol" },
    { label: "Pricing", href: "#pricing" },
  ];

  return (
    <nav
      className={`${styles.nav} ${scrolled ? styles.navScrolled : ""}`}
    >
      {/* Brand */}
      <a
        href="#"
        className={`${styles.brand} ${scrolled ? styles.brandScrolled : ""}`}
      >
        CODE
      </a>

      {/* Desktop nav links */}
      <div className={styles.desktopLinks}>
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={`${styles.navLink} ${scrolled ? styles.navLinkScrolled : ""}`}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Phone number - desktop */}
      <a
        href="tel:+385953566095"
        className={`${styles.phone} ${scrolled ? styles.phoneScrolled : ""}`}
      >
        <Phone size={12} />
        +385 95 356 6095
      </a>

      {/* CTA */}
      <a href="#pricing" className={`${styles.cta} btn-magnetic`}>
        <span className={`${styles.ctaBg} btn-bg`} />
        <span className={styles.ctaText}>BOOK NOW</span>
      </a>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className={`${styles.hamburger} ${scrolled ? styles.hamburgerScrolled : ""}`}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className={styles.mobileMenu}>
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={styles.mobileLink}
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:+385953566095"
            className={styles.mobilePhone}
          >
            <Phone size={14} />
            +385 95 356 6095
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileOpen(false)}
            className={`${styles.mobileCta} btn-magnetic`}
          >
            BOOK NOW
          </a>
        </div>
      )}
    </nav>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { t, i18n } = useTranslation();
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
    { label: t("navbar.services"), href: "#features" },
    { label: t("navbar.philosophy"), href: "#philosophy" },
    { label: t("navbar.process"), href: "#protocol" },
    { label: t("navbar.pricing"), href: "#pricing" },
  ];

  const currentLang = i18n.language?.startsWith("en") ? "en" : "hr";

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

      {/* Language toggle - desktop */}
      <div className={`${styles.langToggle} ${scrolled ? styles.langToggleScrolled : ""}`}>
        <button
          type="button"
          onClick={() => i18n.changeLanguage("hr")}
          className={`${styles.langBtn} ${currentLang === "hr" ? styles.langBtnActive : ""}`}
          aria-label="Hrvatski"
        >
          HR
        </button>
        <span className={styles.langDivider}>|</span>
        <button
          type="button"
          onClick={() => i18n.changeLanguage("en")}
          className={`${styles.langBtn} ${currentLang === "en" ? styles.langBtnActive : ""}`}
          aria-label="English"
        >
          EN
        </button>
      </div>

      {/* CTA */}
      <a href="#pricing" className={`${styles.cta} btn-magnetic`}>
        <span className={`${styles.ctaBg} btn-bg`} />
        <span className={styles.ctaText}>{t("navbar.bookNow")}</span>
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
        <div className={`${styles.mobileMenu} ${scrolled ? styles.mobileMenuScrolled : ""}`}>
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
          <div className={styles.langToggleMobile}>
            <button
              type="button"
              onClick={() => i18n.changeLanguage("hr")}
              className={`${styles.langBtn} ${currentLang === "hr" ? styles.langBtnActive : ""}`}
              aria-label="Hrvatski"
            >
              HR
            </button>
            <span className={styles.langDivider}>|</span>
            <button
              type="button"
              onClick={() => i18n.changeLanguage("en")}
              className={`${styles.langBtn} ${currentLang === "en" ? styles.langBtnActive : ""}`}
              aria-label="English"
            >
              EN
            </button>
          </div>
          <a
            href="#pricing"
            onClick={() => setMobileOpen(false)}
            className={`${styles.mobileCta} btn-magnetic`}
          >
            {t("navbar.bookNow")}
          </a>
        </div>
      )}
    </nav>
  );
}

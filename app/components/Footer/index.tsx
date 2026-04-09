"use client";

import { Phone, AtSign, MapPin } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import styles from "./Footer.module.css";

type FooterProps = {
  variant?: "default" | "gold";
};

export default function Footer({ variant = "default" }: FooterProps) {
  const { t } = useTranslation();
  const pathname = usePathname();
  const isHome = pathname === "/";
  // On subpages, anchor links like "#features" must jump back to the home page
  const anchor = (hash: string) => (isHome ? hash : `/${hash}`);

  return (
    <footer
      className={`${styles.footer} ${
        variant === "gold" ? styles.footerGold : ""
      }`}
    >
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brandCol}>
            <h3 className={styles.brandName}>CODE</h3>
            <p className={styles.brandSub}>Detailing</p>
            <p className={styles.brandDescription}>
              {t("footer.brandDescription")}
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className={styles.columnTitle}>{t("footer.servicesTitle")}</h4>
            <ul className={styles.linkList}>
              {[
                { key: "ceramicCoating", label: t("footer.ceramicCoating") },
                { key: "paintCorrection", label: t("footer.paintCorrection") },
                { key: "ppf", label: t("footer.ppf") },
                { key: "headlightRestoration", label: t("footer.headlightRestoration") },
                { key: "interiorDeepClean", label: t("footer.interiorDeepClean") },
              ].map((item) => (
                <li key={item.key}>
                  <a href={anchor("#features")} className={`${styles.link} link-lift`}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className={styles.columnTitle}>{t("footer.companyTitle")}</h4>
            <ul className={styles.linkList}>
              {[
                { key: "about", label: t("footer.about"), href: "#philosophy" },
                { key: "process", label: t("footer.process"), href: "#protocol" },
                { key: "pricing", label: t("footer.pricing"), href: "#pricing" },
                { key: "testimonials", label: t("footer.testimonials"), href: "#testimonials" },
              ].map((item) => (
                <li key={item.key}>
                  <a href={anchor(item.href)} className={`${styles.link} link-lift`}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className={styles.columnTitle}>{t("footer.contactTitle")}</h4>
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
                  {t("footer.whatsappUs")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottomBar}>
          <div className={styles.statusGroup}>
            <div className={`${styles.statusDot} pulse-dot`} />
            <span className={styles.statusText}>{t("footer.acceptingBookings")}</span>
          </div>

          <div className={styles.legalLinks}>
            <a href="/privacy" className={styles.legalLink}>{t("footer.privacy")}</a>
            <a href="/terms" className={styles.legalLink}>{t("footer.terms")}</a>
            <span>&copy; {new Date().getFullYear()} Code Detailing</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

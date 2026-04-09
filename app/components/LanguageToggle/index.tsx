"use client";

import { useTranslation } from "react-i18next";
import styles from "./LanguageToggle.module.css";

type Props = {
  variant?: "dark" | "light";
};

export default function LanguageToggle({ variant = "dark" }: Props) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith("en") ? "en" : "hr";

  return (
    <div
      className={`${styles.toggle} ${
        variant === "light" ? styles.toggleLight : styles.toggleDark
      }`}
    >
      <button
        type="button"
        onClick={() => i18n.changeLanguage("hr")}
        className={`${styles.btn} ${
          currentLang === "hr" ? styles.btnActive : ""
        }`}
        aria-label="Hrvatski"
      >
        HR
      </button>
      <span className={styles.divider}>|</span>
      <button
        type="button"
        onClick={() => i18n.changeLanguage("en")}
        className={`${styles.btn} ${
          currentLang === "en" ? styles.btnActive : ""
        }`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}

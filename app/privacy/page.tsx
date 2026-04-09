"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import Footer from "@/app/components/Footer";
import LanguageToggle from "@/app/components/LanguageToggle";
import styles from "./Privacy.module.css";

export default function PrivacyPage() {
  const { t } = useTranslation();

  const sections = [
    "intro",
    "dataCollected",
    "dataUse",
    "legalBasis",
    "dataSharing",
    "cookies",
    "rights",
    "retention",
    "changes",
  ] as const;

  return (
    <>
    <main className={styles.main}>
      <div className={styles.topBar}>
        <Link href="/" className={styles.backLink}>
          <ArrowLeft size={14} />
          <span>{t("legal.backToHome")}</span>
        </Link>
        <LanguageToggle variant="dark" />
      </div>

      <header className={styles.header}>
        <h1 className={styles.pageTitle}>{t("privacyPage.title")}</h1>
        <p className={styles.updatedLabel}>
          {t("legal.lastUpdated")}: {t("privacyPage.updatedDate")}
        </p>
      </header>

      <div className={styles.divider} aria-hidden="true" />

      <article className={styles.article}>
        {sections.map((key) => (
          <section key={key} className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {t(`privacyPage.${key}.title`)}
            </h2>
            <p className={styles.paragraph}>
              {t(`privacyPage.${key}.body`)}
            </p>
          </section>
        ))}

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            {t("privacyPage.contact.title")}
          </h2>
          <p className={styles.paragraph}>{t("privacyPage.contact.body")}</p>
          <p className={styles.paragraph}>{t("privacyPage.contact.phone")}</p>
          <p className={styles.paragraph}>
            {t("privacyPage.contact.location")}
          </p>
        </section>
      </article>
    </main>
    <Footer variant="gold" />
    </>
  );
}

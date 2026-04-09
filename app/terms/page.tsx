"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import Footer from "@/app/components/Footer";
import LanguageToggle from "@/app/components/LanguageToggle";
import styles from "./Terms.module.css";

export default function TermsPage() {
  const { t } = useTranslation();

  const sections = [
    "intro",
    "services",
    "booking",
    "cancellation",
    "warranties",
    "liability",
    "ip",
    "clientObligations",
    "changes",
    "law",
  ] as const;

  return (
    <>
      <main className={styles.page}>
        <div className={styles.topBar}>
          <Link href="/" className={styles.backLink}>
            <ArrowLeft size={14} />
            <span>{t("legal.backToHome")}</span>
          </Link>
          <LanguageToggle variant="dark" />
        </div>

        <header className={styles.header}>
          <h1 className={styles.pageTitle}>{t("termsPage.title")}</h1>
          <p className={styles.updatedLabel}>
            {t("legal.lastUpdated")}: {t("termsPage.updatedDate")}
          </p>
        </header>

        <div className={styles.divider} aria-hidden="true" />

        <article className={styles.article}>
          {sections.map((key) => (
            <section key={key} className={styles.section}>
              <h2 className={styles.sectionTitle}>
                {t(`termsPage.${key}.title`)}
              </h2>
              <p className={styles.paragraph}>
                {t(`termsPage.${key}.body`)}
              </p>
            </section>
          ))}

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {t("termsPage.contact.title")}
            </h2>
            <p className={styles.paragraph}>{t("termsPage.contact.body")}</p>
            <p className={styles.paragraph}>{t("termsPage.contact.phone")}</p>
            <p className={styles.paragraph}>
              {t("termsPage.contact.location")}
            </p>
          </section>
        </article>
      </main>
      <Footer variant="gold" />
    </>
  );
}

"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import hr from "@/translations/hr.json";
import en from "@/translations/en.json";

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        hr: { translation: hr },
        en: { translation: en },
      },
      fallbackLng: "hr",
      supportedLngs: ["hr", "en"],
      detection: {
        order: ["localStorage"],
        lookupLocalStorage: "i18nextLng",
        caches: ["localStorage"],
      },
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
}

export default i18n;

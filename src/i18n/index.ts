import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./locales/en";
import { fr } from "./locales/fr";
import { de } from "./locales/de";
import { zh } from "./locales/zh";
import { sw } from "./locales/sw";
import { ja } from "./locales/ja";
import { defaultLanguage } from "./config";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
    de: { translation: de },
    zh: { translation: zh },
    sw: { translation: sw },
    ja: { translation: ja },
  },
  lng: defaultLanguage,
  fallbackLng: defaultLanguage,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

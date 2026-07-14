import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import i18n from "@/i18n";
import { languages, defaultLanguage, type Language } from "@/i18n/config";

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = "portfolio-language";

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return defaultLanguage;
  const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
  if (stored && languages.includes(stored)) return stored;
  return defaultLanguage;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
    i18n.changeLanguage(language);
  }, [language]);

  const setLanguage = (lang: Language) => setLanguageState(lang);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}

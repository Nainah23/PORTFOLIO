export const languages = ["en", "fr", "de", "zh", "sw", "ja"] as const;
export type Language = (typeof languages)[number];
export const defaultLanguage: Language = "en";

export const languageLabels: Record<Language, { label: string; flag: string; nativeName: string }> = {
  en: { label: "English", flag: "🇬🇧", nativeName: "English" },
  fr: { label: "French", flag: "🇫🇷", nativeName: "Français" },
  de: { label: "German", flag: "🇩🇪", nativeName: "Deutsch" },
  zh: { label: "Mandarin", flag: "🇨🇳", nativeName: "中文" },
  sw: { label: "Kiswahili", flag: "🇰🇪", nativeName: "Kiswahili" },
  ja: { label: "Japanese", flag: "🇯🇵", nativeName: "日本語" },
};

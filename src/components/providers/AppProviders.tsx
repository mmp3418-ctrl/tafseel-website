"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  translations,
  type Locale,
  type TranslationDict,
} from "@/lib/i18n";

type Theme = "light" | "dark";

type AppContextValue = {
  locale: Locale;
  theme: Theme;
  t: TranslationDict;
  dir: "rtl" | "ltr";
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const AppContext = createContext<AppContextValue | null>(null);

const LOCALE_KEY = "tafasil-locale";
const THEME_KEY = "tafasil-theme";

export function AppProviders({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ar");
  const [theme, setThemeState] = useState<Theme>("dark");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const savedLocale = window.localStorage.getItem(LOCALE_KEY) as Locale | null;
    const savedTheme = window.localStorage.getItem(THEME_KEY) as Theme | null;

    if (savedLocale === "ar" || savedLocale === "en") setLocaleState(savedLocale);
    // Default theme is dark; only override when user explicitly saved a preference
    if (savedTheme === "light" || savedTheme === "dark") {
      setThemeState(savedTheme);
    } else {
      setThemeState("dark");
    }
    setReady(true);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.dir = locale === "ar" ? "rtl" : "ltr";
    root.classList.toggle("dark", theme === "dark");
    if (ready) {
      window.localStorage.setItem(LOCALE_KEY, locale);
      window.localStorage.setItem(THEME_KEY, theme);
    }
  }, [locale, theme, ready]);

  const setLocale = useCallback((next: Locale) => setLocaleState(next), []);
  const toggleLocale = useCallback(
    () => setLocaleState((prev) => (prev === "ar" ? "en" : "ar")),
    []
  );
  const setTheme = useCallback((next: Theme) => setThemeState(next), []);
  const toggleTheme = useCallback(
    () => setThemeState((prev) => (prev === "light" ? "dark" : "light")),
    []
  );

  const value = useMemo<AppContextValue>(
    () => ({
      locale,
      theme,
      t: translations[locale],
      dir: locale === "ar" ? "rtl" : "ltr",
      setLocale,
      toggleLocale,
      setTheme,
      toggleTheme,
    }),
    [locale, theme, setLocale, toggleLocale, setTheme, toggleTheme]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProviders");
  return ctx;
}

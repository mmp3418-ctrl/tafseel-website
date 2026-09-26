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
  mounted: boolean;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const AppContext = createContext<AppContextValue | null>(null);

const LOCALE_KEY = "tafasil-locale";
const THEME_KEY = "tafasil-theme";

const defaultValue: AppContextValue = {
  locale: "ar",
  theme: "dark",
  t: translations.ar,
  dir: "rtl",
  mounted: false,
  setLocale: () => {},
  toggleLocale: () => {},
  setTheme: () => {},
  toggleTheme: () => {},
};

export function AppProviders({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ar");
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const savedLocale = window.localStorage.getItem(LOCALE_KEY) as Locale | null;
      const savedTheme = window.localStorage.getItem(THEME_KEY) as Theme | null;

      if (savedLocale === "ar" || savedLocale === "en") {
        setLocaleState(savedLocale);
      }
      if (savedTheme === "light" || savedTheme === "dark") {
        setThemeState(savedTheme);
      }
    } catch {
      // private mode / blocked storage — keep defaults
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof document === "undefined") return;
    const root = document.documentElement;
    root.lang = locale;
    root.dir = locale === "ar" ? "rtl" : "ltr";
    root.classList.toggle("dark", theme === "dark");
    try {
      window.localStorage.setItem(LOCALE_KEY, locale);
      window.localStorage.setItem(THEME_KEY, theme);
    } catch {
      // ignore
    }
  }, [locale, theme, mounted]);

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
      t: translations[locale] ?? translations.ar,
      dir: locale === "ar" ? "rtl" : "ltr",
      mounted,
      setLocale,
      toggleLocale,
      setTheme,
      toggleTheme,
    }),
    [locale, theme, mounted, setLocale, toggleLocale, setTheme, toggleTheme]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  // Never throw during edge prerender — return safe defaults instead of blanking the tree
  return ctx ?? defaultValue;
}

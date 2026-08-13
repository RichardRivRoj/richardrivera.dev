"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import en from "@/data/en.json";
import es from "@/data/es.json";

type Locale = "en" | "es";

type Translations = typeof en;

interface LanguageContextType {
  locale: Locale;
  toggleLanguage: () => void;
  t: <T = string>(key: string) => T;
}

const LanguageContext = createContext<
  LanguageContextType | undefined
>(undefined);

/**
 * Obtiene un valor anidado dentro del objeto de traducciones.
 *
 * Ejemplos:
 *
 * t("nav.home")
 * t("personalInfo.name")
 * t("personalInfo.socials.cvUrl")
 * t<string[]>("personalInfo.roles")
 */
const getNestedValue = (
  obj: unknown,
  path: string,
): unknown => {
  return path.split(".").reduce((current: unknown, key: string) => {
    if (
      current !== null &&
      typeof current === "object" &&
      key in current
    ) {
      return (current as Record<string, unknown>)[key];
    }

    return undefined;
  }, obj);
};

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [locale, setLocale] = useState<Locale>("en");

  const translations: Record<Locale, Translations> = {
    en,
    es,
  };

  /**
   * Carga el idioma almacenado o detecta
   * el idioma del navegador.
   */
  useEffect(() => {
    const savedLocale =
      localStorage.getItem("portfolio-locale");

    if (
      savedLocale === "en" ||
      savedLocale === "es"
    ) {
      setLocale(savedLocale);
      return;
    }

    const browserLanguage =
      navigator.language.split("-")[0];

    if (browserLanguage === "es") {
      setLocale("es");
    }
  }, []);

  /**
   * Guarda el idioma seleccionado.
   */
  useEffect(() => {
    localStorage.setItem(
      "portfolio-locale",
      locale,
    );
  }, [locale]);

  /**
   * Alterna entre inglés y español.
   */
  const toggleLanguage = () => {
    setLocale((currentLocale) =>
      currentLocale === "en" ? "es" : "en",
    );
  };

  /**
   * Función principal de traducción.
   *
   * Por defecto devuelve un string:
 *
   * t("nav.home")
 *
   * Para arrays u objetos:
 *
   * t<string[]>("personalInfo.roles")
   */
  const t = <T = string>(key: string): T => {
    const value = getNestedValue(
      translations[locale],
      key,
    );

    if (value === undefined || value === null) {
      console.warn(
        `[i18n] Translation key not found: "${key}"`,
      );

      return key as T;
    }

    return value as T;
  };

  return (
    <LanguageContext.Provider
      value={{
        locale,
        toggleLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used within LanguageProvider",
    );
  }

  return context;
};
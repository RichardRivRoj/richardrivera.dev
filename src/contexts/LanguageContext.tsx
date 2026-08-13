'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '@/data/en.json';
import es from '@/data/es.json';

type Locale = 'en' | 'es';
type Translations = typeof en;

interface LanguageContextType {
  locale: Locale;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Función para obtener un valor anidado del objeto JSON (ej: "nav.home")
const getNestedValue = (obj: any, path: string): string => {
  return path.split('.').reduce((current, key) => current?.[key], obj) || path;
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocale] = useState<Locale>('en');
  const translations: Record<Locale, Translations> = { en, es };

  // Cargar idioma guardado en localStorage al iniciar
  useEffect(() => {
    const saved = localStorage.getItem('portfolio-locale') as Locale;
    if (saved && (saved === 'en' || saved === 'es')) {
      setLocale(saved);
    } else {
      // Detectar idioma del navegador
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'es') setLocale('es');
    }
  }, []);

  // Guardar en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('portfolio-locale', locale);
  }, [locale]);

  const toggleLanguage = () => {
    setLocale(prev => (prev === 'en' ? 'es' : 'en'));
  };

  // Función de traducción
  const t = (key: string): string => {
    return getNestedValue(translations[locale], key);
  };

  return (
    <LanguageContext.Provider value={{ locale, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
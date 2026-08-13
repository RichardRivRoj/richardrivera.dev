'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export const useTranslation = () => {
  const { t, locale, toggleLanguage } = useLanguage();
  return { t, locale, toggleLanguage };
};
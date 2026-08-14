"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import { useTranslation } from "@/hooks/useTranslation";
import { Menu, X, Sun, Moon, Download, Globe } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavLink {
  label: string;      // Clave de traducción (ej: "nav.home")
  href: string;
  isAnchor: boolean;  // Corregido: boolean (no Boolean)
}

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { locale, toggleLanguage } = useTranslation();
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Efecto para detectar scroll con umbral (mejor experiencia)
  useEffect(() => {
    const handleScroll = () => {
      // Añade un pequeño umbral para que no se active con 1px
      const offset = window.scrollY;
      setScrolled(offset > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar menú al redimensionar a escritorio (mejora UX)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Enlaces del navbar (todos son anclas)
  const navLinks: NavLink[] = [
    { label: "nav.home", href: pathname === "/" ? "#home" : "/#home", isAnchor: true },
    { label: "nav.about", href: pathname === "/" ? "#about" : "/#about", isAnchor: true },
    { label: "nav.experience", href: pathname === "/" ? "#experience" : "/#experience", isAnchor: true },
    { label: "nav.technology", href: pathname === "/" ? "#technology" : "/#technology", isAnchor: true },
    { label: "nav.projects", href: pathname === "/" ? "#projects" : "/#projects", isAnchor: true },
    { label: "nav.contact", href: pathname === "/" ? "#contact" : "/#contact", isAnchor: true },
  ];

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: NavLink
  ) => {
    setIsMenuOpen(false);
    // Si es un ancla y no estamos en la home, redirigimos y luego scrolleamos
    if (link.isAnchor && pathname !== "/") {
      e.preventDefault();
      const targetId = link.href.replace("/#", "");
      const targetElement = document.querySelector(`#${targetId}`);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 z-50 flex h-20 w-full items-center transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm dark:bg-slate-900/80 dark:shadow-slate-800/20"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-primary font-display text-2xl font-extrabold tracking-tighter transition-transform hover:scale-105 dark:text-blue-500"
        >
          RR
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link)}
              className="hover:text-primary relative font-display text-sm font-medium text-slate-600 transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all hover:after:w-full dark:text-slate-300 dark:hover:text-blue-400"
            >
              {t(link.label)}
            </Link>
          ))}
        </div>

        {/* Right side controls (Desktop) */}
        <div className="hidden items-center gap-4 md:flex">
          {/* Tema */}
          <button
            onClick={toggleTheme}
            className="rounded-full p-2.5 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Idioma */}
          <button
            onClick={toggleLanguage}
            className="group flex items-center gap-1.5 rounded-full p-2.5 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Toggle language"
          >
            <Globe
              size={16}
              className="transition-transform group-hover:rotate-12"
            />
            <span className="text-xs font-semibold tracking-wide uppercase">
              {locale === "en" ? "ES" : "EN"}
            </span>
          </button>

          {/* CV - Traducido */}
          <a
            href={t("personalInfo.socials.cvUrl")}
            download
            className="rounded-custom-sm flex items-center gap-2 bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500"
          >
            <Download size={14} />
            {t("nav.cv")}
          </a>
        </div>

        {/* Mobile controls (tema, idioma, hamburguesa) */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button
            onClick={toggleLanguage}
            className="group flex items-center gap-1.5 rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Toggle language"
          >
            <Globe
              size={16}
              className="transition-transform group-hover:rotate-12"
            />
            <span className="text-xs font-semibold tracking-wide uppercase">
              {locale === "en" ? "ES" : "EN"}
            </span>
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 left-0 flex w-full flex-col gap-4 border-b border-slate-200 bg-white/95 backdrop-blur-sm px-6 py-6 shadow-lg dark:border-slate-800 dark:bg-slate-900/95"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link)}
                className="font-display border-b border-slate-100 py-2 text-base font-medium text-slate-800 transition-colors hover:text-blue-600 dark:border-slate-800/50 dark:text-slate-200 dark:hover:text-blue-400"
              >
                {t(link.label)}
              </Link>
            ))}
            <a
              href={t("personalInfo.socials.cvUrl")}
              download
              className="rounded-custom-sm mt-2 flex w-full items-center justify-center gap-2 bg-slate-900 py-3 font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500"
            >
              <Download size={16} />
              {t("nav.download_cv")}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
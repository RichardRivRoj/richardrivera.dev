"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import { useTranslation } from "@/hooks/useTranslation";
import {
  Menu,
  X,
  Sun,
  Moon,
  Download,
  Globe,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavLink {
  label: string;
  href: string;
}

export default function Navbar() {
  const pathname = usePathname();

  const { theme, toggleTheme } = useTheme();
  const { locale, toggleLanguage, t } = useTranslation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /**
   * Detectar scroll.
   *
   * Esto permite que el Navbar sea transparente
   * al inicio y adquiera fondo cuando el usuario
   * comienza a desplazarse.
   */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /**
   * Cerrar menú móvil al pasar a desktop.
   */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /**
   * Navegación principal.
   *
   * En Home:
   *   #home
   *   #about
   *
   * En páginas internas:
   *   /#home
   *   /#about
   *
   * Esto permite que el Navbar funcione
   * correctamente en /projects/[id].
   */
  const navLinks: NavLink[] = [
    {
      label: "nav.home",
      href: pathname === "/" ? "#home" : "/#home",
    },
    {
      label: "nav.about",
      href: pathname === "/" ? "#about" : "/#about",
    },
    {
      label: "nav.experience",
      href: pathname === "/" ? "#experience" : "/#experience",
    },
    {
      label: "nav.technology",
      href: pathname === "/" ? "#technology" : "/#technology",
    },
    {
      label: "nav.projects",
      href: pathname === "/" ? "#projects" : "/#projects",
    },
    {
      label: "nav.contact",
      href: pathname === "/" ? "#contact" : "/#contact",
    },
  ];

  /**
   * Cerrar menú móvil al seleccionar
   * cualquier elemento de navegación.
   */
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  /**
   * Determina si estamos dentro de una
   * página de proyecto.
   */
  const isProjectDetail =
    pathname.startsWith("/projects/");

  return (
    <nav
      className={`
        fixed
        top-0
        left-0
        z-50
        flex
        h-20
        w-full
        items-center
        transition-all
        duration-300

        ${
          scrolled || isProjectDetail
            ? `
              border-b
              border-slate-200/70
              bg-white/85
              shadow-sm
              backdrop-blur-md

              dark:border-slate-800/70
              dark:bg-slate-950/85
              dark:shadow-slate-900/20
            `
            : "bg-transparent"
        }
      `}
    >
      <div
        className="
          mx-auto
          flex
          w-full
          max-w-[1400px]
          items-center
          justify-between
          px-6
        "
      >
        {/* ================================================= */}
        {/* LOGO                                             */}
        {/* ================================================= */}

        <Link
          href="/"
          onClick={handleLinkClick}
          className="
            font-display
            text-2xl
            font-extrabold
            tracking-tighter
            text-blue-600
            transition-transform
            duration-200
            hover:scale-105

            dark:text-blue-500
          "
        >
          RR
        </Link>

        {/* ================================================= */}
        {/* DESKTOP NAVIGATION                               */}
        {/* ================================================= */}

        <div
          className="
            hidden
            items-center
            gap-10
            md:flex
          "
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={handleLinkClick}
              className="
                relative
                font-display
                text-sm
                font-medium
                text-slate-600
                transition-colors

                after:absolute
                after:bottom-0
                after:left-0
                after:h-[2px]
                after:w-0
                after:bg-blue-500
                after:transition-all
                after:duration-300

                hover:text-blue-600
                hover:after:w-full

                dark:text-slate-300
                dark:hover:text-blue-400
              "
            >
              {t(link.label)}
            </Link>
          ))}
        </div>

        {/* ================================================= */}
        {/* DESKTOP CONTROLS                                */}
        {/* ================================================= */}

        <div
          className="
            hidden
            items-center
            gap-3
            md:flex
          "
        >
          {/* Theme */}

          <button
            type="button"
            onClick={toggleTheme}
            className="
              rounded-full
              p-2.5
              text-slate-600
              transition-all
              duration-200

              hover:bg-slate-100
              hover:text-blue-600

              dark:text-slate-300
              dark:hover:bg-slate-800
              dark:hover:text-blue-400
            "
            aria-label={
              theme === "light"
                ? "Enable dark mode"
                : "Enable light mode"
            }
          >
            <motion.div
              key={theme}
              initial={{
                rotate: -45,
                scale: 0.7,
                opacity: 0,
              }}
              animate={{
                rotate: 0,
                scale: 1,
                opacity: 1,
              }}
              transition={{
                duration: 0.2,
              }}
            >
              {theme === "light" ? (
                <Moon size={18} />
              ) : (
                <Sun size={18} />
              )}
            </motion.div>
          </button>

          {/* Language */}

          <button
            type="button"
            onClick={toggleLanguage}
            className="
              group
              flex
              items-center
              gap-1.5
              rounded-full
              p-2.5
              text-slate-600
              transition-colors

              hover:bg-slate-100
              hover:text-blue-600

              dark:text-slate-300
              dark:hover:bg-slate-800
              dark:hover:text-blue-400
            "
            aria-label="Toggle language"
          >
            <Globe
              size={16}
              className="
                transition-transform
                duration-300
                group-hover:rotate-12
              "
            />

            <span
              className="
                text-xs
                font-semibold
                uppercase
                tracking-wide
              "
            >
              {locale === "en" ? "ES" : "EN"}
            </span>
          </button>

          {/* CV */}

          <a
            href={t<string>(
              "personalInfo.socials.cvUrl"
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="
              ml-2
              flex
              items-center
              gap-2
              rounded-custom-sm
              bg-slate-900
              px-5
              py-2.5
              text-xs
              font-semibold
              text-white
              shadow-sm
              transition-all
              duration-200

              hover:bg-slate-800
              hover:shadow-md

              dark:bg-blue-600
              dark:hover:bg-blue-500
            "
          >
            <Download size={14} />

            {t("nav.cv")}
          </a>
        </div>

        {/* ================================================= */}
        {/* MOBILE CONTROLS                                  */}
        {/* ================================================= */}

        <div
          className="
            flex
            items-center
            gap-1
            md:hidden
          "
        >
          {/* Theme */}

          <button
            type="button"
            onClick={toggleTheme}
            className="
              rounded-full
              p-2
              text-slate-600
              transition-colors

              hover:bg-slate-100

              dark:text-slate-300
              dark:hover:bg-slate-800
            "
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon size={18} />
            ) : (
              <Sun size={18} />
            )}
          </button>

          {/* Language */}

          <button
            type="button"
            onClick={toggleLanguage}
            className="
              flex
              items-center
              gap-1.5
              rounded-full
              p-2
              text-slate-600
              transition-colors

              hover:bg-slate-100

              dark:text-slate-300
              dark:hover:bg-slate-800
            "
            aria-label="Toggle language"
          >
            <Globe size={16} />

            <span
              className="
                text-[11px]
                font-semibold
                uppercase
              "
            >
              {locale === "en" ? "ES" : "EN"}
            </span>
          </button>

          {/* Menu */}

          <button
            type="button"
            onClick={() =>
              setIsMenuOpen((current) => !current)
            }
            className="
              rounded-full
              p-2
              text-slate-600
              transition-colors

              hover:bg-slate-100

              dark:text-slate-300
              dark:hover:bg-slate-800
            "
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}
          </button>
        </div>
      </div>

      {/* =================================================== */}
      {/* MOBILE DRAWER                                      */}
      {/* =================================================== */}

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -10,
            }}
            transition={{
              duration: 0.2,
            }}
            className="
              absolute
              top-20
              left-0
              flex
              w-full
              flex-col
              gap-3
              border-b
              border-slate-200
              bg-white/95
              px-6
              py-6
              shadow-lg
              backdrop-blur-md

              dark:border-slate-800
              dark:bg-slate-950/95
            "
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={handleLinkClick}
                className="
                  border-b
                  border-slate-100
                  py-3
                  font-display
                  text-base
                  font-medium
                  text-slate-800
                  transition-colors

                  hover:text-blue-600

                  dark:border-slate-800/60
                  dark:text-slate-200
                  dark:hover:text-blue-400
                "
              >
                {t(link.label)}
              </Link>
            ))}

            {/* CV */}

            <a
              href={t<string>(
                "personalInfo.socials.cvUrl"
              )}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLinkClick}
              className="
                mt-3
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-custom-sm
                bg-slate-900
                py-3
                font-semibold
                text-white
                transition-colors

                hover:bg-slate-800

                dark:bg-blue-600
                dark:hover:bg-blue-500
              "
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
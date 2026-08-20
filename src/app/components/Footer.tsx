"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowUp,
  Mail,
} from "lucide-react";
import { motion } from "motion/react";

import { useTranslation } from "@/hooks/useTranslation";
import { portfolioData } from "@/data/portfolioData.json";
import { Icons } from "@/components/ui/Icons";

export function Footer() {
  const { t } = useTranslation();

  const currentYear = new Date().getFullYear();

  /*
   * ==========================================================
   * PERSONAL DATA
   * ==========================================================
   */

  const { personalInfo, footer: footerData } = portfolioData;

  const { name, socials } = personalInfo;

  /*
   * ==========================================================
   * TRANSLATIONS
   * ==========================================================
   */

  const footer = {
    statementStart: t<string>("footer.brand.statementStart"),
    statementHighlight: t<string>("footer.brand.statementHighlight"),
    statementEnd: t<string>("footer.brand.statementEnd"),
    description: t<string>("footer.brand.description"),

    availability: t<string>("footer.availability"),

    navigation: {
      title: t<string>("footer.navigation.title"),
      about: t<string>("footer.navigation.about"),
      experience: t<string>("footer.navigation.experience"),
      technology: t<string>("footer.navigation.technology"),
      projects: t<string>("footer.navigation.projects"),
      contact: t<string>("footer.navigation.contact"),
    },

    connect: {
      title: t<string>("footer.connect.title"),
      email: t<string>("footer.connect.email"),
      linkedin: t<string>("footer.connect.linkedin"),
      github: t<string>("footer.connect.github"),
      instagram: t<string>("footer.connect.instagram"),
    },

    stack: {
      title: t<string>("footer.stack.title"),
    },

    bottom: {
      copyright: t<string>("footer.bottom.copyright"),
      builtWith: t<string>("footer.bottom.builtWith"),
      backToTop: t<string>("footer.bottom.backToTop"),
    },
  };

  /*
   * ==========================================================
   * NAVIGATION
   * ==========================================================
   */

  const navigationLinks = [
    {
      label: footer.navigation.about,
      href: "/#about",
    },
    {
      label: footer.navigation.experience,
      href: "/#experience",
    },
    {
      label: footer.navigation.technology,
      href: "/#technology",
    },
    {
      label: footer.navigation.projects,
      href: "/#projects",
    },
    {
      label: footer.navigation.contact,
      href: "/#contact",
    },
  ];

  /*
   * ==========================================================
   * SOCIAL LINKS
   * ==========================================================
   */

  const socialLinks = [
    {
      label: footer.connect.email,
      href: socials.email.startsWith("mailto:")
        ? socials.email
        : `mailto:${socials.email}`,
      icon: Mail,
    },
    {
      label: footer.connect.linkedin,
      href: socials.linkedin,
      icon: Icons.Linkedin,
    },
    {
      label: footer.connect.github,
      href: socials.github,
      icon: Icons.Github,
    },
    {
      label: footer.connect.instagram,
      href: socials.instagram,
      icon: Icons.Instagram,
    },
  ];

  /*
   * ==========================================================
   * BACK TO TOP
   * ==========================================================
   */

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative z-10 overflow-hidden border-t border-slate-200/70 bg-white dark:border-slate-800/70 dark:bg-slate-900">
      <div className="mx-auto max-w-350 px-6">
        {/* ================================================= */}
        {/* MAIN FOOTER                                      */}
        {/* ================================================= */}

        <div className="grid grid-cols-1 gap-14 py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-10 lg:py-20">
          {/* ================================================= */}
          {/* BRAND                                            */}
          {/* ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.5,
            }}
            className="lg:col-span-5"
          >
            {/* Logo + name */}

            <Link href="/" className="group inline-flex items-center gap-3">
              <span className="text-primary group-hover:border-primary flex h-11 w-11 items-center justify-center rounded border border-slate-200 text-lg font-extrabold tracking-tighter transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-sm dark:border-slate-700 dark:text-blue-500 dark:group-hover:border-blue-500">
                RR
              </span>

              <span className="font-display text-sm font-bold tracking-tight text-slate-900 dark:text-white">
                {name}
              </span>
            </Link>

            {/* Statement */}

            <p className="mt-7 max-w-md text-2xl leading-tight font-semibold tracking-tight text-slate-900 md:text-3xl dark:text-white">
              {footer.statementStart}{" "}
              <span className="text-primary dark:text-blue-500">
                {footer.statementHighlight}
              </span>
              {footer.statementEnd}
            </p>

            {/* Professional description */}

            <p className="mt-5 max-w-md text-sm leading-7 font-light text-slate-500 dark:text-slate-400">
              {footer.description}
            </p>

            {/* Availability */}

            <div className="mt-7 inline-flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />

                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>

              <span className="text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase dark:text-slate-500">
                {footer.availability}
              </span>
            </div>
          </motion.div>

          {/* ================================================= */}
          {/* NAVIGATION                                       */}
          {/* ================================================= */}

          <FooterColumn title={footer.navigation.title}>
            {navigationLinks.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          {/* ================================================= */}
          {/* SOCIALS                                          */}
          {/* ================================================= */}

          <FooterColumn title={footer.connect.title}>
            {socialLinks.map((social) => {
              const Icon = social.icon;

              const isEmail = social.href.startsWith("mailto:");

              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={isEmail ? undefined : "_blank"}
                  rel={isEmail ? undefined : "noopener noreferrer"}
                  whileHover="hover"
                  className="group hover:text-primary flex w-fit items-center gap-2 text-xs font-medium text-slate-500 transition-colors dark:text-slate-400 dark:hover:text-blue-400"
                >
                  <Icon
                    size={14}
                    className="opacity-60 transition-all duration-300 group-hover:opacity-100"
                  />

                  <span>{social.label}</span>

                  <ArrowUpRight
                    size={12}
                    className="-translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  />
                </motion.a>
              );
            })}
          </FooterColumn>

          {/* ================================================= */}
          {/* STACK                                            */}
          {/* ================================================= */}

          <FooterColumn title={footer.stack.title}>
            {footerData.technologies.map((technology) => (
              <motion.div
                key={technology}
                whileHover={{
                  x: 4,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                }}
                className="hover:text-primary w-fit cursor-default text-xs font-medium text-slate-500 transition-colors dark:text-slate-400 dark:hover:text-blue-400"
              >
                {technology}
              </motion.div>
            ))}
          </FooterColumn>
        </div>

        {/* ================================================= */}
        {/* DIVIDER                                           */}
        {/* ================================================= */}

        <div className="border-t border-slate-200/70 dark:border-slate-800/70" />

        {/* ================================================= */}
        {/* BOTTOM BAR                                        */}
        {/* ================================================= */}

        <div className="flex flex-col items-center justify-between gap-5 py-7 md:flex-row">
          {/* Copyright */}

          <p className="text-[10px] font-medium tracking-wide text-slate-400 dark:text-slate-500">
            © {currentYear} {name}. {footer.bottom.copyright}
          </p>

          {/* Built with */}

          <p className="text-center text-[10px] font-medium tracking-wide text-slate-400 dark:text-slate-500">
            {footer.bottom.builtWith}
          </p>

          {/* Back to top */}

          <motion.button
            type="button"
            onClick={handleBackToTop}
            whileHover="hover"
            whileTap={{
              scale: 0.95,
            }}
            className="group hover:text-primary flex items-center gap-2 text-[10px] font-bold tracking-[0.12em] text-slate-500 uppercase transition-colors dark:text-slate-400 dark:hover:text-blue-400"
            aria-label={footer.bottom.backToTop}
          >
            <span>{footer.bottom.backToTop}</span>

            <motion.span
              variants={{
                hover: {
                  y: -4,
                },
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 20,
              }}
            >
              <ArrowUp size={14} />
            </motion.span>
          </motion.button>
        </div>
      </div>

      {/* ================================================= */}
      {/* DECORATIVE BACKGROUND                             */}
      {/* ================================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -bottom-32 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl dark:bg-blue-500/5"
      />
    </footer>
  );
}

/* ========================================================= */
/* FOOTER COLUMN                                             */
/* ========================================================= */

interface FooterColumnProps {
  title: string;
  children: React.ReactNode;
}

function FooterColumn({ title, children }: FooterColumnProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 16,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.45,
      }}
      className="lg:col-span-2"
    >
      <h3 className="font-display mb-5 text-[10px] font-bold tracking-[0.18em] text-slate-400 uppercase dark:text-slate-500">
        {title}
      </h3>

      <div className="flex flex-col items-start gap-3">{children}</div>
    </motion.div>
  );
}

/* ========================================================= */
/* FOOTER LINK                                               */
/* ========================================================= */

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

function FooterLink({ href, children }: FooterLinkProps) {
  return (
    <motion.div
      whileHover={{
        x: 4,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
      }}
    >
      <Link
        href={href}
        className="hover:text-primary text-xs font-medium text-slate-500 transition-colors dark:text-slate-400 dark:hover:text-blue-400"
      >
        {children}
      </Link>
    </motion.div>
  );
}

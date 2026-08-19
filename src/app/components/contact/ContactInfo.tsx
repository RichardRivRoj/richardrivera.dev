"use client";

import React from "react";
import { Download, Mail, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

import { Icons } from "@/components/ui/Icons";
import { SocialLink } from "./ContactSocialLink"

interface ContactInfoProps {
  email: string;
  github: string;
  linkedin: string;
  instagram: string;
  cvUrl: string;

  translations: {
    label: string;
    title: string;
    description: string;
    email: string;
    linkedin: string;
    github: string;
    instagram: string;
    downloadCv: string;
  };
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export function ContactInfo({
  email,
  github,
  linkedin,
  instagram,
  cvUrl,
  translations,
}: ContactInfoProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        staggerChildren: 0.1,
      }}
      className="flex h-full flex-col"
    >
      {/* Heading */}
      <motion.div variants={itemVariants} className="space-y-5">
        <span className="font-display text-[10px] font-bold tracking-[0.2em] text-blue-600 uppercase dark:text-blue-500">
          {translations.label}
        </span>

        <div className="space-y-3">
          <h3 className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {translations.title}
          </h3>

          <p className="max-w-md text-sm leading-7 font-light text-slate-500 dark:text-slate-400">
            {translations.description}
          </p>
        </div>
      </motion.div>

      {/* Email */}
      <motion.a
        variants={itemVariants}
        href={`mailto:${email}`}
        className="
          group
          mt-10
          inline-flex
          w-fit
          items-center
          gap-3
          text-sm
          font-medium
          text-slate-900
          transition-colors
          hover:text-blue-600
          dark:text-slate-100
          dark:hover:text-blue-400
        "
      >
        <span
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-blue-50
            text-blue-600
            transition-transform
            duration-300
            group-hover:scale-110
            dark:bg-blue-950/40
            dark:text-blue-400
          "
        >
          <Mail size={17} />
        </span>

        <span className="border-b border-transparent pb-0.5 transition-colors group-hover:border-blue-600 dark:group-hover:border-blue-400">
          {email}
        </span>

        <ArrowUpRight
          size={15}
          className="
            opacity-50
            transition-all
            duration-300
            group-hover:translate-x-1
            group-hover:-translate-y-1
            group-hover:opacity-100
          "
        />
      </motion.a>

      {/* Social navigation */}
      <motion.nav
        variants={itemVariants}
        aria-label="Social media"
        className="
          mt-12
          flex
          flex-wrap
          items-center
          gap-x-7
          gap-y-4
          border-t
          border-slate-200/70
          pt-6
          dark:border-slate-700/50
        "
      >
        {linkedin && (
          <SocialLink
            href={linkedin}
            label={translations.linkedin}
            icon={<Icons.Linkedin className="h-4 w-4" />}
          />
        )}

        {github && (
          <SocialLink
            href={github}
            label={translations.github}
            icon={<Icons.Github className="h-4 w-4" />}
          />
        )}

        {instagram && (
          <SocialLink
            href={instagram}
            label={translations.instagram}
            icon={<Icons.Instagram className="h-4 w-4" />}
          />
        )}
      </motion.nav>

      {/* CV */}
      <motion.div variants={itemVariants} className="mt-auto pt-12">
        <a
          href={cvUrl}
          download
          className="
            group
            inline-flex
            items-center
            gap-2
            text-xs
            font-bold
            tracking-wide
            text-slate-500
            transition-colors
            hover:text-blue-600
            dark:text-slate-400
            dark:hover:text-blue-400
          "
        >
          <Download
            size={14}
            className="
              transition-transform
              duration-300
              group-hover:translate-y-0.5
            "
          />

          <span>{translations.downloadCv}</span>
        </a>
      </motion.div>
    </motion.div>
  );
}


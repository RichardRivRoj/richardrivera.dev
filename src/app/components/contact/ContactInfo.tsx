"use client";

import React from "react";
import { Download, Mail } from "lucide-react";

import { Icons } from "@/components/ui/Icons";
import { ContactSocialLink } from "./ContactSocialLink";

interface ContactInfoProps {
  email: string;
  github: string;
  linkedin: string;
  instagram: string;
  cvUrl: string;

  translations: {
    title: string;
    description: string;
    email: string;
    linkedin: string;
    github: string;
    instagram: string;
    downloadCv: string;
  };
}

export function ContactInfo({
  email,
  github,
  linkedin,
  instagram,
  cvUrl,
  translations,
}: ContactInfoProps) {
  return (
    <div className="rounded-custom-lg flex flex-col justify-between gap-8 border border-slate-200/60 bg-white p-8 shadow-sm dark:border-slate-700/60 dark:bg-slate-800">
      <div className="space-y-6">
        <div>
          <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
            {translations.title}
          </h3>

          <p className="mt-3 text-sm leading-relaxed font-light text-slate-500 dark:text-slate-400">
            {translations.description}
          </p>
        </div>

        <div className="space-y-4 pt-2">
          {/* Email */}
          <ContactSocialLink
            href={`mailto:${email}`}
            label={translations.email}
            value={email}
            icon={<Mail size={16} />}
            external={false}
          />

          {/* LinkedIn */}
          {linkedin && (
            <ContactSocialLink
              href={linkedin}
              label={translations.linkedin}
              value="RICHARD RAFAEL RIVERA ROJAS"
              icon={<Icons.Linkedin className="h-4 w-4" />}
            />
          )}

          {/* GitHub */}
          {github && (
            <ContactSocialLink
              href={github}
              label={translations.github}
              value="RichardRivRoj"
              icon={<Icons.Github className="h-4 w-4" />}
            />
          )}

          {/* Instagram */}
          {instagram && (
            <ContactSocialLink
              href={instagram}
              label={translations.instagram}
              value="@rrrrojasr"
              icon={<Icons.Instagram className="h-4 w-4" />}
            />
          )}
        </div>
      </div>

      {/* CV */}
      <div className="border-t border-slate-100 pt-6 dark:border-slate-700/50">
        <a
          href={cvUrl}
          download
          className="rounded-custom-sm flex w-full items-center justify-center gap-2 border border-slate-200 bg-slate-100 py-4 text-xs font-bold text-slate-800 transition-colors hover:bg-slate-200 dark:border-slate-600/50 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
        >
          <Download size={14} />
          {translations.downloadCv}
        </a>
      </div>
    </div>
  );
}

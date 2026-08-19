"use client";

import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";

import { useTranslation } from "@/hooks/useTranslation";

import { ContactInfo } from "./contact/ContactInfo";
import { ContactForm } from "./contact/ContactForm";

export function Contact() {
  const { t } = useTranslation();

  /*
   * ==========================================================
   * PERSONAL INFORMATION
   * ==========================================================
   */

  const email = t<string>("personalInfo.socials.email");
  const github = t<string>("personalInfo.socials.github");
  const linkedin = t<string>("personalInfo.socials.linkedin");
  const instagram = t<string>("personalInfo.socials.instagram");
  const cvUrl = t<string>("personalInfo.socials.cvUrl");

  /*
   * ==========================================================
   * TRANSLATIONS
   * ==========================================================
   */

  const section = {
    title: t<string>("contact.title"),
    subtitle: t<string>("contact.subtitle"),
    description: t<string>("contact.description"),
  };

  const info = {
    title: t<string>("contact.info.title"),
    description: t<string>("contact.info.description"),
    email: t<string>("contact.info.email"),
    linkedin: t<string>("contact.info.linkedin"),
    github: t<string>("contact.info.github"),
    instagram: t<string>("contact.info.instagram"),
    downloadCv: t<string>("contact.info.downloadCv"),
  };

  const form = {
    title: t<string>("contact.form.title"),

    name: {
      label: t<string>("contact.form.name.label"),
      placeholder: t<string>("contact.form.name.placeholder"),
    },

    email: {
      label: t<string>("contact.form.email.label"),
      placeholder: t<string>("contact.form.email.placeholder"),
    },

    subject: {
      label: t<string>("contact.form.subject.label"),
      placeholder: t<string>("contact.form.subject.placeholder"),
    },

    message: {
      label: t<string>("contact.form.message.label"),
      placeholder: t<string>("contact.form.message.placeholder"),
    },

    submit: t<string>("contact.form.submit"),
    sending: t<string>("contact.form.sending"),

    success: {
      title: t<string>("contact.form.success.title"),
      description: t<string>("contact.form.success.description"),
      another: t<string>("contact.form.success.another"),
    },
  };

  return (
    <section
      id="contact"
      className="
        border-t
        border-slate-100
        bg-slate-50
        py-[120px]
        dark:border-slate-800/60
        dark:bg-slate-900/50
      "
    >
      <div className="mx-auto w-full max-w-[1400px] px-6">
        {/* ================================================= */}
        {/* SECTION HEADER                                    */}
        {/* ================================================= */}

        <SectionHeading
          title={section.title}
          subtitle={section.subtitle}
          description={section.description}
        />

        {/* ================================================= */}
        {/* CONTENT                                           */}
        {/* ================================================= */}

        <div
          className="
            mx-auto
            grid
            max-w-5xl
            grid-cols-1
            items-stretch
            gap-12
            lg:grid-cols-12
          "
        >
          {/* Contact information */}

          <div className="lg:col-span-5">
            <ContactInfo
              email={email}
              github={github}
              linkedin={linkedin}
              instagram={instagram}
              cvUrl={cvUrl}
              translations={info}
            />
          </div>

          {/* Contact form */}

          <div
            className="
              flex
              flex-col
              justify-center
              rounded-custom-lg
              border
              border-slate-200/60
              bg-white
              p-8
              shadow-sm
              dark:border-slate-700/60
              dark:bg-slate-800
              lg:col-span-7
            "
          >
            <ContactForm translations={form} />
          </div>
        </div>
      </div>
    </section>
  );
}
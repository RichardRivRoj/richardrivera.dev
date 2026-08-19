"use client";

import React from "react";
import { motion } from "motion/react";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { useTranslation } from "@/hooks/useTranslation";

import { ContactInfo } from "./contact/ContactInfo";
import { ContactForm } from "./contact/ContactForm";
import { label } from "motion/react-client";

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
    label: t<string>("contact.info.label"),
    title: t<string>("contact.info.title"),
    description: t<string>("contact.info.description"),
    email: t<string>("contact.info.email"),
    linkedin: t<string>("contact.info.linkedin"),
    github: t<string>("contact.info.github"),
    instagram: t<string>("contact.info.instagram"),
    downloadCv: t<string>("contact.info.downloadCv"),
  };

  const form = {
    label: t<string>("contact.form.label"),
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
      className="border-t border-slate-100 bg-slate-50 py-20 lg:py-24 dark:border-slate-800/60 dark:bg-slate-900/50"
    >
      <div className="mx-auto w-full max-w-350 px-6">
        {/* ================================================= */}
        {/* SECTION HEADER                                    */}
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
        >
          <SectionHeading
            title={section.title}
            subtitle={section.subtitle}
            description={section.description}
          />
        </motion.div>

        {/* ================================================= */}
        {/* CONTACT CONTENT                                   */}
        {/* ================================================= */}

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
          {/* ================================================= */}
          {/* CONTACT INFORMATION                               */}
          {/* ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: -20,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
            className="lg:col-span-5"
          >
            <ContactInfo
              email={email}
              github={github}
              linkedin={linkedin}
              instagram={instagram}
              cvUrl={cvUrl}
              translations={info}
            />
          </motion.div>

          {/* ================================================= */}
          {/* CONTACT FORM                                     */}
          {/* ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: 20,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.5,
              delay: 0.1,
              ease: "easeOut",
            }}
            className="lg:col-span-7"
          >
            <ContactForm translations={form} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

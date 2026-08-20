"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Download, Mail } from "lucide-react";
import { motion, type Variants } from "motion/react";
import { useTranslation } from "@/hooks/useTranslation";

export function Hero() {
  const { t } = useTranslation();

  const name = t<string>("personalInfo.name");

  const roles = t<string[]>("personalInfo.roles");

  const tagline = t<string>("personalInfo.tagline");
  const description = t<string>("personalInfo.description");

  const cvUrl = t<string>("personalInfo.socials.cvUrl");

  const firstName = name.split(" ")[0];
  const lastName = name.split(" ").slice(1).join(" ");

  const [displayedLastName, setDisplayedLastName] = useState(lastName);

  useEffect(() => {
    let index = 0;
    let deleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const typewriter = () => {
      if (!deleting) {
        // Escribiendo
        if (index < lastName.length) {
          index++;

          setDisplayedLastName(lastName.slice(0, index));

          timeoutId = setTimeout(typewriter, 110);

          return;
        }

        // Pausa cuando termina de escribir
        timeoutId = setTimeout(() => {
          deleting = true;
          typewriter();
        }, 2200);

        return;
      }

      // Borrando
      if (index > 0) {
        index--;

        setDisplayedLastName(lastName.slice(0, index));

        timeoutId = setTimeout(typewriter, 70);

        return;
      }

      // Pausa antes de volver a escribir
      timeoutId = setTimeout(() => {
        deleting = false;
        typewriter();
      }, 700);
    };

    typewriter();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [lastName]);

  const containerVariants: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 15,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white pt-20 pb-16 dark:bg-slate-900"
    >
      {/* Background soft gradients */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-40 dark:opacity-30">
        <div className="absolute top-1/4 left-1/4 h-75 w-75 rounded-full bg-blue-300 blur-[100px] dark:bg-blue-900" />

        <div className="absolute right-1/4 bottom-1/4 h-62.5 w-62.5 rounded-full bg-indigo-200 blur-[100px] dark:bg-indigo-900" />
      </div>

      <div className="z-10 mx-auto w-full max-w-350 px-6">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12">
          {/* Left Column: Portrait */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            className="col-span-1 flex justify-center md:col-span-5 md:justify-start"
          >
            <div className="rounded-custom-lg relative h-85 w-70 overflow-hidden border border-slate-200/80 shadow-md sm:h-105 sm:w-[320px] md:h-125 md:w-100 lg:h-112.5 lg:w-100 dark:border-slate-800">
              <Image
                src="/ing-RR.jpg"
                alt={name}
                fill
                priority
                className="object-cover object-center grayscale transition-all duration-500 ease-out hover:grayscale-0"
                sizes="(max-width: 768px) 320px, 420px"
              />

              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-950/20 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Right Column: Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="col-span-1 flex flex-col items-center gap-6 text-center md:col-span-7 md:items-start md:text-left"
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 dark:border-blue-900/50 dark:bg-blue-900/30"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-blue-600 dark:bg-blue-400" />

              <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">
                {t("hero.available")}
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white"
            >
              <span>{firstName} </span>
              <span className="text-primary">
                {displayedLastName}
                <span
                  className="typewriter-cursor traslate-y-[0.08em] bg-primary ml-1 inline-block h-[0.9em] w-0.75 animate-pulse align-middle"
                  aria-hidden="true"
                />
              </span>
            </motion.h1>

            {/* Roles */}
            <motion.div
              variants={itemVariants}
              className="flex max-w-xl flex-wrap justify-center gap-2 md:justify-start"
            >
              {roles.map((role) => (
                <div key={role} className="flex items-center">
                  <span className="rounded-custom-sm border border-slate-200/50 bg-slate-100 px-3.5 py-1.5 text-sm font-semibold text-slate-800 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200">
                    {role}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="max-w-xl font-sans text-lg leading-relaxed font-light text-slate-500 dark:text-slate-400"
            >
              <span className="text-[13px] font-semibold md:text-[16px]">&quot;{tagline}&quot;</span>
              <br />
              {description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="mt-2 flex w-full flex-col gap-4 sm:w-auto sm:flex-row"
            >
              {/* Projects */}
              <button
                onClick={() => scrollToSection("#projects")}
                className="rounded-custom-sm bg-primary hover:bg-primary-hover flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg"
              >
                {t("hero.view_projects")}
                <ArrowRight size={16} />
              </button>

              {/* CV */}
              <a
                href={cvUrl}
                download
                className="rounded-custom-sm flex items-center justify-center gap-2 border border-slate-200/80 bg-slate-100 px-6 py-3.5 text-sm font-semibold text-slate-800 transition-all duration-200 hover:bg-slate-200 dark:border-slate-700/80 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                {t("nav.download_cv")}
                <Download size={16} />
              </a>

              {/* Contact */}
              <button
                onClick={() => scrollToSection("#contact")}
                className="rounded-custom-sm flex items-center justify-center gap-2 border border-slate-200/80 bg-transparent px-6 py-3.5 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800/50"
              >
                {t("hero.contact")}
                <Mail size={16} />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

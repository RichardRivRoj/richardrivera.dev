"use client";

import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Terminal, Cpu, Lightbulb } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "@/hooks/useTranslation";

export function About() {
  const { t } = useTranslation();

  const about = t<string>("about.about");
  const title = t<string>("about.title");
  const description = t<string>("about.description");  
  const bio = t<string>("about.bio");
  const philosophy = t<string>("about.philosophy");
  const highlights = t<Array<{ title: string; description: string }>>("about.highlights");

  const highlightIcons = [
    <Terminal
      key="solving"
      className="text-blue-600 dark:text-blue-400"
      size={24}
    />,
    <Cpu
      key="passion"
      className="text-indigo-600 dark:text-indigo-400"
      size={24}
    />,
    <Lightbulb
      key="mindset"
      className="text-purple-600 dark:text-purple-400"
      size={24}
    />,
  ];

  return (
    <section
      id="about"
      className="border-y border-slate-100 bg-slate-50 py-20 lg:py-24 dark:border-slate-800/60 dark:bg-slate-900/50"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6">
        <SectionHeading
          title={title}
          subtitle={about}
          description={description}
        />

        {/* Bio & Philosophy Block */}
        <div className="mx-auto mb-16 flex max-w-[800px] flex-col gap-6 text-center font-sans md:text-left">
          <p className="text-lg leading-relaxed font-light text-slate-700 dark:text-slate-300">
            {bio}
          </p>
          <p className="leading-relaxed font-light text-slate-500 dark:text-slate-400">
            {philosophy}
          </p>
        </div>

        {/* 3 Highlights Grid */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="rounded-custom-md border border-slate-200/60 bg-white p-8 shadow-sm transition-all hover:shadow-md dark:border-slate-700/50 dark:bg-slate-800"
            >
              <div className="rounded-custom-sm mb-6 flex h-12 w-12 items-center justify-center border border-slate-100 bg-slate-50 dark:border-slate-600 dark:bg-slate-700">
                {highlightIcons[index]}
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
                {highlight.title}
              </h3>
              <p className="font-sans text-sm leading-relaxed font-light text-slate-500 dark:text-slate-400">
                {highlight.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

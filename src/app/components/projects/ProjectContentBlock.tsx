"use client";

import { motion } from "motion/react";

interface ProjectContentBlockProps {
  label: string;
  title: string;
  description: string;
}

export function ProjectContentBlock({
  label,
  title,
  description,
}: ProjectContentBlockProps) {
  return (
    <motion.article
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
        margin: "-80px",
      }}
      transition={{
        duration: 0.45,
      }}
    >
      <span className="text-xs font-bold tracking-[0.2em] text-blue-600 uppercase dark:text-blue-400">
        {label}
      </span>

      <h2 className="font-display mt-4 text-2xl font-bold text-slate-900 md:text-3xl dark:text-white">
        {title}
      </h2>

      <p className="mt-5 text-sm leading-8 text-slate-500 dark:text-slate-400">
        {description}
      </p>
    </motion.article>
  );
}

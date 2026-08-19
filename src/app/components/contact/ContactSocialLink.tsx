"use client";

import React from "react";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

interface SocialLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
}

export function SocialLink({ href, label, icon }: SocialLinkProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover="hover"
      className="
        group
        inline-flex
        items-center
        gap-2
        text-xs
        font-semibold
        text-slate-500
        transition-colors
        hover:text-blue-600
        dark:text-slate-400
        dark:hover:text-blue-400
      "
    >
      <motion.span
        variants={{
          hover: {
            x: 3,
            rotate: 4,
          },
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 20,
        }}
        className="opacity-70 transition-opacity group-hover:opacity-100"
      >
        {icon}
      </motion.span>

      <span>{label}</span>

      <ArrowUpRight
        size={13}
        className="
          -translate-x-1
          opacity-0
          transition-all
          duration-300
          group-hover:translate-x-0
          group-hover:opacity-100
        "
      />
    </motion.a>
  );
}
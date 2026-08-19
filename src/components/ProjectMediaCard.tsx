"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Play } from "lucide-react";

import { ProjectMedia } from "@/types/project";

interface ProjectMediaCardProps {
  media: ProjectMedia;
  index: number;
}

export function ProjectMediaCard({ media, index }: ProjectMediaCardProps) {
  return (
    <motion.figure
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
        delay: index * 0.06,
      }}
      className="group rounded-custom-md overflow-hidden border border-slate-200/70 bg-white dark:border-slate-700/60 dark:bg-slate-900"
    >
      <div className="relative aspect-video overflow-hidden bg-slate-950">
        {media.type === "video" && (
          <video
            src={media.src}
            poster={media.poster}
            controls
            muted
            playsInline
            preload="metadata"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
          />
        )}

        {media.type === "gif" && (
          <Image
            src={media.src}
            alt={media.alt}
            fill
            unoptimized
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        )}

        {media.type === "image" && (
          <Image
            src={media.src}
            alt={media.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        )}

        {media.type !== "image" && (
          <div className="pointer-events-none absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] font-semibold tracking-wider text-white uppercase backdrop-blur-md">
            <Play size={12} fill="currentColor" />
            Demo
          </div>
        )}
      </div>

      <figcaption className="border-t border-slate-100 px-5 py-4 text-xs leading-relaxed font-medium text-slate-500 dark:border-slate-800 dark:text-slate-400">
        {media.caption}
      </figcaption>
    </motion.figure>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";

export interface ProjectMedia {
  type: "image" | "gif" | "video";
  src: string;
  poster?: string;
  title?: string;
  alt: string;
  caption?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
}

interface ProjectGalleryProps {
  items: ProjectMedia[];
}

export function ProjectGallery({
  items,
}: ProjectGalleryProps) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {items.map((item, index) => (
        <motion.figure
          key={`${item.src}-${index}`}
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
            duration: 0.4,
            delay: index * 0.08,
          }}
          className="
            group
            overflow-hidden
            rounded-custom-md
            border
            border-slate-200/70
            bg-white
            dark:border-slate-700/60
            dark:bg-slate-900
          "
        >
          {/* Media */}
          <div
            className="
              relative
              aspect-video
              w-full
              overflow-hidden
              bg-slate-100
              dark:bg-slate-950
            "
          >
            {item.type === "video" && (
              <video
                src={item.src}
                poster={item.poster}
                autoPlay={item.autoplay ?? true}
                loop={item.loop ?? true}
                muted={item.muted ?? true}
                playsInline
                controls
                preload="metadata"
                className="
                  h-full
                  w-full
                  object-cover
                  transition-transform
                  duration-500
                  group-hover:scale-[1.02]
                "
              />
            )}

            {item.type === "gif" && (
              <Image
                src={item.src}
                alt={item.alt}
                fill
                unoptimized
                className="
                  object-cover
                  transition-transform
                  duration-500
                  group-hover:scale-[1.02]
                "
              />
            )}

            {item.type === "image" && (
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="
                  object-cover
                  transition-transform
                  duration-500
                  group-hover:scale-[1.02]
                "
              />
            )}
          </div>

          {/* Information */}
          <figcaption className="p-5">
            {item.title && (
              <h3
                className="
                  mb-2
                  text-base
                  font-bold
                  text-slate-900
                  dark:text-white
                "
              >
                {item.title}
              </h3>
            )}

            {item.caption && (
              <p
                className="
                  text-sm
                  leading-relaxed
                  text-slate-500
                  dark:text-slate-400
                "
              >
                {item.caption}
              </p>
            )}
          </figcaption>
        </motion.figure>
      ))}
    </div>
  );
}
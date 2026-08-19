"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { useTranslation } from "@/hooks/useTranslation";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  thumbnail: string;
  links: {
    github?: string;
    live?: string;
  };
}

export function FeaturedProjects() {
  const { t } = useTranslation();

  const section = t<{
    subtitle: string;
    title: string;
    description: string;
  }>("projectsSection");

  const projects = t<Project[]>("projects");

  return (
    <section
      id="projects"
      className="relative border-y border-slate-100 bg-white py-20 lg:py-24 dark:border-slate-800/60 dark:bg-slate-900/50"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6">
        {/* ================================================= */}
        {/* SECTION HEADING                                   */}
        {/* ================================================= */}

        <SectionHeading
          title={section.title}
          subtitle={section.subtitle}
          description={section.description}
        />

        {/* ================================================= */}
        {/* PROJECTS GRID                                     */}
        {/* ================================================= */}

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                margin: "-100px",
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              whileHover={{
                y: -6,
              }}
              className="group rounded-custom-lg flex h-full flex-col overflow-hidden border border-slate-200/70 bg-slate-50 transition-all duration-300 hover:border-blue-300/70 hover:shadow-xl hover:shadow-blue-500/5 dark:border-slate-700/60 dark:bg-slate-800/70 dark:hover:border-blue-500/40 dark:hover:shadow-blue-500/10"
            >
              {/* ========================================= */}
              {/* PROJECT IMAGE                              */}
              {/* ========================================= */}

              <div className="relative aspect-video w-full overflow-hidden border-b border-slate-200/70 bg-slate-100 dark:border-slate-700/60 dark:bg-slate-900">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  sizes="
                    (max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw
                  "
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* Image overlay */}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

                {/* Project number */}

                <div className="absolute top-4 left-4 flex h-8 min-w-8 items-center justify-center rounded-full border border-white/20 bg-slate-950/60 px-2 text-[10px] font-bold tracking-wider text-white backdrop-blur-sm">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </div>

              {/* ========================================= */}
              {/* PROJECT CONTENT                            */}
              {/* ========================================= */}

              <div className="flex flex-1 flex-col p-6">
                {/* Title */}

                <h3 className="mb-3 text-xl font-bold tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                  {project.title}
                </h3>

                {/* Description */}

                <p className="mb-5 flex-1 text-sm leading-relaxed font-light text-slate-500 dark:text-slate-400">
                  {project.description}
                </p>

                {/* Technologies */}

                <div className="mb-6 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold tracking-wide text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
                    >
                      {technology}
                    </span>
                  ))}
                </div>

                {/* ======================================= */}
                {/* VIEW PROJECT                             */}
                {/* ======================================= */}

                <div className="border-t border-slate-200/70 pt-4 dark:border-slate-700/60">
                  <Link
                    href={`/projects/${project.id}`}
                    className="group/link inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition-colors duration-300 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                  >
                    <span>{t<string>("general.viewProject")}</span>

                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                    />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

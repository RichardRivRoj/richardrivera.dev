"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, FolderGit2 } from "lucide-react";
import { motion } from "motion/react";

import { useTranslation } from "@/hooks/useTranslation";
import { ProjectDetail } from "@/types/project";

interface ProjectHeroProps {
  project: ProjectDetail;
}

export function ProjectHero({ project }: ProjectHeroProps) {
  const { t } = useTranslation();

  const { overview, technologies, links } = project;

  const allTechnologies = [
    ...technologies.frontend,
    ...technologies.backend,
    ...technologies.database,
    ...technologies.tools,
  ].filter((technology, index, array) => array.indexOf(technology) === index);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white pt-8 pb-16 dark:bg-slate-900">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 h-125 w-225 -translate-x-1/2 rounded-full bg-blue-500/10 blur-[140px] dark:bg-blue-600/10" />

        <div className="absolute right-[-10%] bottom-[-30%] h-112.5 w-112.5 rounded-full bg-indigo-500/10 blur-[130px] dark:bg-purple-600/10" />
      </div>

      <div className="mx-auto w-full max-w-350 px-6">
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/#projects"
            className="mb-12 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
          >
            <ArrowLeft size={16} />
            {t<string>("general.back")}
          </Link>
        </motion.div>

        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
          >
            <span className="mb-5 inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-blue-600 uppercase dark:text-blue-400">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />

              {t<string>("projectsSection.sectionOne")}
            </span>

            <h1 className="font-display max-w-4xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
              {overview.title}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-500 md:text-lg dark:text-slate-400">
              {overview.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {allTechnologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                >
                  {technology}
                </span>
              ))}
            </div>

            {(links.github || links.live) && (
              <div className="mt-8 flex flex-wrap gap-3">
                {links.github && links.github !== "#" && (
                  <a
                    href={links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-custom-sm inline-flex items-center gap-2 bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                  >
                    <FolderGit2 size={16} />
                    GitHub
                  </a>
                )}

                {links.live && links.live !== "#" && (
                  <a
                    href={links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-custom-sm inline-flex items-center gap-2 border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-500/50 dark:hover:text-blue-400"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                )}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.7,
              delay: 0.1,
            }}
            className="rounded-custom-lg relative overflow-hidden border border-slate-200/70 bg-white shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20"
          >
            <div className="relative aspect-video">
              <Image
                src={overview.heroImage}
                alt={overview.title}
                fill
                priority
                className="object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

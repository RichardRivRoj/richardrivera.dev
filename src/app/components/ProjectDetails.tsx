"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Database,
  ExternalLink,
  Layers3,
  Play,
  Server,
  Target,
  FolderGit2
} from "lucide-react";
import { motion } from "motion/react";

import { useTranslation } from "@/hooks/useTranslation";
import { ProjectDetail } from "@/types/project";

interface ProjectDetailsProps {
  projectId: string;
}

export function ProjectDetails({
  projectId,
}: ProjectDetailsProps) {
  const { t } = useTranslation();

  const project = t<ProjectDetail>(
    `projectDetails.${projectId}`
  );

  /**
   * Si el proyecto no existe dentro de las traducciones,
   * evitamos romper toda la página.
   */
  if (
    typeof project !== "object" ||
    project === null ||
    !("overview" in project)
  ) {
    return (
      <section
        className="
          flex
          min-h-[60vh]
          items-center
          justify-center
          bg-slate-50
          px-6
          py-32
          dark:bg-slate-950
        "
      >
        <div className="text-center">
          <h1
            className="
              mb-4
              font-display
              text-3xl
              font-bold
              text-slate-900
              dark:text-white
            "
          >
            Project not found
          </h1>

          <Link
            href="/#projects"
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-semibold
              text-blue-600
              transition-colors
              hover:text-blue-700
              dark:text-blue-400
              dark:hover:text-blue-300
            "
          >
            <ArrowLeft size={16} />
            Back to projects
          </Link>
        </div>
      </section>
    );
  }

  const {
    overview,
    problem,
    solution,
    objectives,
    architecture,
    features,
    technologies,
    gallery,
    videos,
    results,
    links,
  } = project;

  return (
    <main
      className="
        min-h-screen
        overflow-hidden
        bg-white
        text-slate-900
        dark:bg-slate-950
        dark:text-white
      "
    >
      {/* ===================================================== */}
      {/* HERO                                                  */}
      {/* ===================================================== */}

      <section
        className="
          relative
          isolate
          overflow-hidden
          border-b
          border-slate-200/70
          bg-slate-50
          py-24
          dark:border-slate-800/70
          dark:bg-slate-950
          md:py-32
        "
      >
        {/* Background atmosphere */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            -z-10
            overflow-hidden
          "
        >
          <div
            className="
              absolute
              left-1/2
              top-0
              h-[500px]
              w-[900px]
              -translate-x-1/2
              rounded-full
              bg-blue-500/10
              blur-[140px]
              dark:bg-blue-600/10
            "
          />

          <div
            className="
              absolute
              right-[-10%]
              bottom-[-30%]
              h-[450px]
              w-[450px]
              rounded-full
              bg-indigo-500/10
              blur-[130px]
              dark:bg-purple-600/10
            "
          />
        </div>

        <div className="mx-auto w-full max-w-[1400px] px-6">
          {/* Back */}

          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/#projects"
              className="
                mb-12
                inline-flex
                items-center
                gap-2
                text-sm
                font-semibold
                text-slate-500
                transition-colors
                hover:text-blue-600
                dark:text-slate-400
                dark:hover:text-blue-400
              "
            >
              <ArrowLeft size={16} />
              Back to projects
            </Link>
          </motion.div>

          {/* Hero content */}

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
              <span
                className="
                  mb-5
                  inline-flex
                  items-center
                  gap-2
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-blue-600
                  dark:text-blue-400
                "
              >
                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-blue-500
                  "
                />

                {overview.label}
              </span>

              <h1
                className="
                  max-w-4xl
                  font-display
                  text-4xl
                  font-bold
                  tracking-tight
                  text-slate-950
                  sm:text-5xl
                  lg:text-6xl
                  dark:text-white
                "
              >
                {overview.title}
              </h1>

              <p
                className="
                  mt-6
                  max-w-2xl
                  text-base
                  leading-8
                  text-slate-500
                  dark:text-slate-400
                  md:text-lg
                "
              >
                {overview.description}
              </p>

              {/* Technologies */}

              <div className="mt-8 flex flex-wrap gap-2">
                {technologies.frontend
                  .concat(technologies.backend)
                  .concat(technologies.database)
                  .filter(
                    (tech, index, array) =>
                      array.indexOf(tech) === index
                  )
                  .map((technology) => (
                    <span
                      key={technology}
                      className="
                        rounded-full
                        border
                        border-slate-200
                        bg-white
                        px-3
                        py-1.5
                        text-xs
                        font-semibold
                        text-slate-600
                        dark:border-slate-700
                        dark:bg-slate-900
                        dark:text-slate-300
                      "
                    >
                      {technology}
                    </span>
                  ))}
              </div>

              {/* Links */}

              {(links.github || links.live) && (
                <div className="mt-8 flex flex-wrap gap-3">
                  {links.github && links.github !== "#" && (
                    <a
                      href={links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-custom-sm
                        bg-slate-900
                        px-5
                        py-3
                        text-sm
                        font-semibold
                        text-white
                        transition-all
                        hover:-translate-y-0.5
                        hover:bg-slate-800
                        dark:bg-white
                        dark:text-slate-900
                        dark:hover:bg-slate-200
                      "
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
                      className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-custom-sm
                        border
                        border-slate-200
                        bg-white
                        px-5
                        py-3
                        text-sm
                        font-semibold
                        text-slate-700
                        transition-all
                        hover:-translate-y-0.5
                        hover:border-blue-300
                        hover:text-blue-600
                        dark:border-slate-700
                        dark:bg-slate-900
                        dark:text-slate-300
                        dark:hover:border-blue-500/50
                        dark:hover:text-blue-400
                      "
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  )}
                </div>
              )}
            </motion.div>

            {/* Hero image */}

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
              className="
                relative
                overflow-hidden
                rounded-custom-lg
                border
                border-slate-200/70
                bg-white
                shadow-xl
                shadow-slate-900/5
                dark:border-slate-800
                dark:bg-slate-900
                dark:shadow-black/20
              "
            >
              <div className="relative aspect-video">
                <Image
                  src={projectId === "hcm-system"
                    ? "/projects/hcm_system.png"
                    : "/projects/default.png"}
                  alt={overview.title}
                  fill
                  priority
                  className="
                    object-cover
                    transition-transform
                    duration-700
                    hover:scale-[1.03]
                  "
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* PROBLEM / SOLUTION                                    */}
      {/* ===================================================== */}

      <section
        className="
          border-b
          border-slate-100
          bg-white
          py-24
          dark:border-slate-800/60
          dark:bg-slate-950
          md:py-28
        "
      >
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <div className="grid gap-12 md:grid-cols-2">
            <ContentBlock
              label={problem.label}
              title={problem.title}
              description={problem.description}
            />

            <ContentBlock
              label={solution.label}
              title={solution.title}
              description={solution.description}
            />
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* OBJECTIVES                                            */}
      {/* ===================================================== */}

      <section
        className="
          bg-slate-50
          py-24
          dark:bg-slate-900/50
          md:py-28
        "
      >
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <SectionIntro
            icon={<Target size={20} />}
            label="Objectives"
            title="Engineering goals"
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {objectives.map((objective, index) => (
              <motion.article
                key={objective.title}
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
                  rounded-custom-md
                  border
                  border-slate-200/70
                  bg-white
                  p-7
                  transition-all
                  hover:-translate-y-1
                  hover:shadow-md
                  dark:border-slate-700/60
                  dark:bg-slate-900
                "
              >
                <div
                  className="
                    mb-5
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-blue-50
                    text-blue-600
                    dark:bg-blue-500/10
                    dark:text-blue-400
                  "
                >
                  <CheckCircle2 size={19} />
                </div>

                <h3
                  className="
                    mb-3
                    font-display
                    text-lg
                    font-bold
                    text-slate-900
                    dark:text-white
                  "
                >
                  {objective.title}
                </h3>

                <p
                  className="
                    text-sm
                    leading-7
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  {objective.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* ARCHITECTURE                                          */}
      {/* ===================================================== */}

      <section
        className="
          border-y
          border-slate-100
          bg-white
          py-24
          dark:border-slate-800/60
          dark:bg-slate-950
          md:py-28
        "
      >
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <SectionIntro
            icon={<Layers3 size={20} />}
            label={architecture.label}
            title={architecture.title}
          />

          <p
            className="
              mx-auto
              mt-6
              max-w-3xl
              text-center
              leading-7
              text-slate-500
              dark:text-slate-400
            "
          >
            {architecture.description}
          </p>

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
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
            }}
            className="
              relative
              mt-12
              overflow-hidden
              rounded-custom-lg
              border
              border-slate-200/70
              bg-slate-50
              p-4
              dark:border-slate-800
              dark:bg-slate-900
            "
          >
            <div className="relative aspect-video w-full">
              <Image
                src={architecture.diagram}
                alt={architecture.title}
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* FEATURES                                              */}
      {/* ===================================================== */}

      <section
        className="
          bg-slate-50
          py-24
          dark:bg-slate-900/50
          md:py-28
        "
      >
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <SectionIntro
            icon={<Code2 size={20} />}
            label="Features"
            title="Core system capabilities"
          />

          <div className="mt-12 grid gap-x-12 gap-y-8 md:grid-cols-2">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  margin: "-60px",
                }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                }}
                className="
                  flex
                  gap-4
                  border-b
                  border-slate-200
                  pb-6
                  dark:border-slate-800
                "
              >
                <CheckCircle2
                  size={19}
                  className="
                    mt-1
                    shrink-0
                    text-blue-600
                    dark:text-blue-400
                  "
                />

                <div>
                  <h3
                    className="
                      mb-2
                      font-display
                      font-bold
                      text-slate-900
                      dark:text-white
                    "
                  >
                    {feature.title}
                  </h3>

                  <p
                    className="
                      text-sm
                      leading-7
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* TECHNOLOGIES                                          */}
      {/* ===================================================== */}

      <section
        className="
          border-y
          border-slate-100
          bg-white
          py-24
          dark:border-slate-800/60
          dark:bg-slate-950
          md:py-28
        "
      >
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <SectionIntro
            icon={<Server size={20} />}
            label={technologies.label}
            title="Technology architecture"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <TechnologyGroup
              icon={<Code2 size={18} />}
              title="Frontend"
              technologies={technologies.frontend}
            />

            <TechnologyGroup
              icon={<Server size={18} />}
              title="Backend"
              technologies={technologies.backend}
            />

            <TechnologyGroup
              icon={<Database size={18} />}
              title="Database"
              technologies={technologies.database}
            />

            <TechnologyGroup
              icon={<Layers3 size={18} />}
              title="Tools"
              technologies={technologies.tools}
            />
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* GALLERY                                               */}
      {/* ===================================================== */}

      {gallery.length > 0 && (
        <section
          className="
            bg-slate-50
            py-24
            dark:bg-slate-900/50
            md:py-28
          "
        >
          <div className="mx-auto w-full max-w-[1400px] px-6">
            <SectionIntro
              icon={<ArrowUpRight size={20} />}
              label="Visual Documentation"
              title="System interface"
            />

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {gallery.map((image, index) => (
                <motion.figure
                  key={image.src}
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
                  className="
                    overflow-hidden
                    rounded-custom-md
                    border
                    border-slate-200/70
                    bg-white
                    dark:border-slate-700/60
                    dark:bg-slate-900
                  "
                >
                  <div className="relative aspect-video">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="
                        object-cover
                        transition-transform
                        duration-500
                        hover:scale-[1.02]
                      "
                    />
                  </div>

                  <figcaption
                    className="
                      px-5
                      py-4
                      text-xs
                      font-medium
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    {image.caption}
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===================================================== */}
      {/* VIDEO                                                 */}
      {/* ===================================================== */}

      {videos.length > 0 && videos[0].url && (
        <section
          className="
            border-y
            border-slate-100
            bg-white
            py-24
            dark:border-slate-800/60
            dark:bg-slate-950
            md:py-28
          "
        >
          <div className="mx-auto w-full max-w-[1000px] px-6">
            <SectionIntro
              icon={<Play size={20} />}
              label="Demonstration"
              title={videos[0].title}
            />

            <p
              className="
                mt-6
                text-center
                text-sm
                leading-7
                text-slate-500
                dark:text-slate-400
              "
            >
              {videos[0].description}
            </p>

            <div
              className="
                mt-10
                aspect-video
                overflow-hidden
                rounded-custom-lg
                border
                border-slate-200
                bg-slate-900
                dark:border-slate-800
              "
            >
              <iframe
                src={videos[0].url}
                title={videos[0].title}
                className="h-full w-full"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      )}

      {/* ===================================================== */}
      {/* RESULTS                                               */}
      {/* ===================================================== */}

      <section
        className="
          bg-slate-50
          py-24
          dark:bg-slate-900/50
          md:py-28
        "
      >
        <div className="mx-auto w-full max-w-[900px] px-6 text-center">
          <span
            className="
              text-xs
              font-bold
              uppercase
              tracking-[0.2em]
              text-blue-600
              dark:text-blue-400
            "
          >
            {results.label}
          </span>

          <h2
            className="
              mt-4
              font-display
              text-3xl
              font-bold
              tracking-tight
              text-slate-900
              dark:text-white
              md:text-4xl
            "
          >
            {results.title}
          </h2>

          <p
            className="
              mx-auto
              mt-6
              max-w-3xl
              text-base
              leading-8
              text-slate-500
              dark:text-slate-400
            "
          >
            {results.description}
          </p>
        </div>
      </section>

      {/* ===================================================== */}
      {/* FOOTER CTA                                            */}
      {/* ===================================================== */}

      <section
        className="
          border-t
          border-slate-200
          bg-white
          py-16
          dark:border-slate-800
          dark:bg-slate-950
        "
      >
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-6 px-6 sm:flex-row">
          <Link
            href="/#projects"
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-semibold
              text-slate-600
              transition-colors
              hover:text-blue-600
              dark:text-slate-300
              dark:hover:text-blue-400
            "
          >
            <ArrowLeft size={16} />
            Back to projects
          </Link>

          <div className="flex gap-3">
            {links.github && links.github !== "#" && (
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-custom-sm
                  border
                  border-slate-200
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-slate-700
                  transition-colors
                  hover:border-blue-300
                  hover:text-blue-600
                  dark:border-slate-700
                  dark:text-slate-300
                  dark:hover:border-blue-500
                  dark:hover:text-blue-400
                "
              >
                <FolderGit2 size={16} />
                GitHub
              </a>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

/* ========================================================= */
/* AUXILIARY COMPONENTS                                      */
/* ========================================================= */

function ContentBlock({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
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
      <span
        className="
          text-xs
          font-bold
          uppercase
          tracking-[0.2em]
          text-blue-600
          dark:text-blue-400
        "
      >
        {label}
      </span>

      <h2
        className="
          mt-4
          font-display
          text-2xl
          font-bold
          text-slate-900
          dark:text-white
          md:text-3xl
        "
      >
        {title}
      </h2>

      <p
        className="
          mt-5
          text-sm
          leading-8
          text-slate-500
          dark:text-slate-400
        "
      >
        {description}
      </p>
    </motion.article>
  );
}

function SectionIntro({
  icon,
  label,
  title,
}: {
  icon: React.ReactNode;
  label: string;
  title: string;
}) {
  return (
    <div className="text-center">
      <div
        className="
          mx-auto
          flex
          w-fit
          items-center
          gap-2
          text-xs
          font-bold
          uppercase
          tracking-[0.2em]
          text-blue-600
          dark:text-blue-400
        "
      >
        {icon}
        {label}
      </div>

      <h2
        className="
          mt-4
          font-display
          text-3xl
          font-bold
          tracking-tight
          text-slate-900
          dark:text-white
          md:text-4xl
        "
      >
        {title}
      </h2>
    </div>
  );
}

function TechnologyGroup({
  icon,
  title,
  technologies,
}: {
  icon: React.ReactNode;
  title: string;
  technologies: string[];
}) {
  return (
    <div
      className="
        rounded-custom-md
        border
        border-slate-200/70
        bg-slate-50
        p-6
        dark:border-slate-700/60
        dark:bg-slate-900
      "
    >
      <div
        className="
          mb-5
          flex
          items-center
          gap-2
          text-sm
          font-bold
          text-slate-900
          dark:text-white
        "
      >
        <span className="text-blue-600 dark:text-blue-400">
          {icon}
        </span>

        {title}
      </div>

      <div className="flex flex-wrap gap-2">
        {technologies.map((technology) => (
          <span
            key={technology}
            className="
              rounded
              border
              border-slate-200
              bg-white
              px-2.5
              py-1
              text-[11px]
              font-semibold
              text-slate-600
              dark:border-slate-700
              dark:bg-slate-950
              dark:text-slate-400
            "
          >
            {technology}
          </span>
        ))}
      </div>
    </div>
  );
}
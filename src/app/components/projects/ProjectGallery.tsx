"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

import { useTranslation } from "@/hooks/useTranslation";
import { ProjectDetail } from "@/types/project";
import { ProjectMediaCard } from "@/components/ProjectMediaCard";
import { ProjectSectionIntro } from "./ProjectSectionIntro";

interface ProjectGalleryProps {
  project: ProjectDetail;
}

export function ProjectGallery({ project }: ProjectGalleryProps) {
  const { t } = useTranslation();

  const { gallery } = project;

  if (!gallery?.visual?.length) {
    return null;
  }

  return (
    <section className="bg-slate-50 pt-20 pb-16 dark:bg-slate-900/50">
      <div className="mx-auto w-full max-w-[1400px] px-6">
        <ProjectSectionIntro
          icon={<ArrowUpRight size={20} />}
          label={t<string>("projectsSection.documentation")}
          title={t<string>("projectsSection.interface")}
        />

        <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-7 text-slate-500 dark:text-slate-400">
          {gallery.description}
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {gallery.visual.map((media, index) => (
            <motion.div
              key={`${media.src}-${index}`}
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
            >
              <ProjectMediaCard media={media} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

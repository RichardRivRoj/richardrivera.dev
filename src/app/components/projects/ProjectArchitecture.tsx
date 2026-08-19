"use client";

import Image from "next/image";
import { Layers3 } from "lucide-react";
import { motion } from "motion/react";

import { useTranslation } from "@/hooks/useTranslation";
import { ProjectDetail } from "@/types/project";
import { ProjectSectionIntro } from "./ProjectSectionIntro";

interface ProjectArchitectureProps {
  project: ProjectDetail;
}

export function ProjectArchitecture({ project }: ProjectArchitectureProps) {
  const { t } = useTranslation();

  const { architecture } = project;

  return (
    <section className="border-y border-slate-100 bg-white py-24 md:py-28 dark:border-slate-800/60 dark:bg-slate-950">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <ProjectSectionIntro
          icon={<Layers3 size={20} />}
          label={t<string>("projectsSection.architecture")}
          title={architecture.title}
        />

        <p className="mx-auto mt-6 max-w-3xl text-center leading-7 text-slate-500 dark:text-slate-400">
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
          className="rounded-custom-lg relative mt-12 overflow-hidden border border-slate-200/70 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="relative aspect-video w-full">
            <Image
              src={architecture.diagram}
              alt={architecture.title}
              fill
              className="rounded-2xl object-contain"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

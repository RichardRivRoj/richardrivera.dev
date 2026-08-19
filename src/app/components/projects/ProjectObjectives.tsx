"use client";

import { CheckCircle2, Target } from "lucide-react";
import { motion } from "motion/react";

import { useTranslation } from "@/hooks/useTranslation";
import { ProjectDetail } from "@/types/project";
import { ProjectSectionIntro } from "./ProjectSectionIntro";

interface ProjectObjectivesProps {
  project: ProjectDetail;
}

export function ProjectObjectives({ project }: ProjectObjectivesProps) {
  const { t } = useTranslation();

  return (
    <section className="bg-slate-50 pt-20 pb-16 md:py-28 dark:bg-slate-900/50">
      <div className="mx-auto w-full max-w-300 px-6">
        <ProjectSectionIntro
          icon={<Target size={20} />}
          label={t<string>("projectsSection.objectives")}
          title={t<string>("projectsSection.goals")}
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {project.objectives.map((objective, index) => (
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
              className="rounded-custom-md border border-slate-200/70 bg-white p-7 transition-all hover:-translate-y-1 hover:shadow-md dark:border-slate-700/60 dark:bg-slate-900"
            >
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                <CheckCircle2 size={19} />
              </div>

              <h3 className="font-display mb-3 text-lg font-bold text-slate-900 dark:text-white">
                {objective.title}
              </h3>

              <p className="text-sm leading-7 text-slate-500 dark:text-slate-400">
                {objective.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

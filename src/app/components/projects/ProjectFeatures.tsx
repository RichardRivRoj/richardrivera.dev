"use client";

import { CheckCircle2, Code2 } from "lucide-react";
import { motion } from "motion/react";

import { useTranslation } from "@/hooks/useTranslation";
import { ProjectDetail } from "@/types/project";
import { ProjectSectionIntro } from "./ProjectSectionIntro";

interface ProjectFeaturesProps {
  project: ProjectDetail;
}

export function ProjectFeatures({ project }: ProjectFeaturesProps) {
  const { t } = useTranslation();

  return (
    <section className="bg-slate-50 py-20 lg:py-24 md:py-28 dark:bg-slate-900/50">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <ProjectSectionIntro
          icon={<Code2 size={20} />}
          label={t<string>("projectsSection.features")}
          title={t<string>("projectsSection.capabilities")}
        />

        <div className="mt-12 grid gap-x-12 gap-y-8 md:grid-cols-2">
          {project.features.map((feature, index) => (
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
              className="flex gap-4 border-b border-slate-200 pb-6 dark:border-slate-800"
            >
              <CheckCircle2
                size={19}
                className="mt-1 shrink-0 text-blue-600 dark:text-blue-400"
              />

              <div>
                <h3 className="font-display mb-2 font-bold text-slate-900 dark:text-white">
                  {feature.title}
                </h3>

                <p className="text-sm leading-7 text-slate-500 dark:text-slate-400">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

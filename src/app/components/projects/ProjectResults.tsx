"use client";

import { ProjectDetail } from "@/types/project";
import { useTranslation } from "@/hooks/useTranslation";

interface ProjectResultsProps {
  project: ProjectDetail;
}

export function ProjectResults({ project }: ProjectResultsProps) {
  const { t } = useTranslation();

  return (
    <section className="bg-slate-50 pt-10 pb-20 md:pt-14 md:pb-22 dark:bg-slate-900/50">
      <div className="mx-auto w-full max-w-[900px] px-6 text-center">
        <span className="text-xs font-bold tracking-[0.2em] text-blue-600 uppercase dark:text-blue-400">
          {t<string>("projectsSection.result")}
        </span>

        <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl dark:text-white">
          {project.results.title}
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-500 dark:text-slate-400">
          {project.results.description}
        </p>
      </div>
    </section>
  );
}
